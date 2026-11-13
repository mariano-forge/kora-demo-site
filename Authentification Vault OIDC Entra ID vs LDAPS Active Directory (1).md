# Authentification Vault : OIDC Entra ID vs LDAPS Active Directory

Nov 12, 2026 · @Mariano

## Résumé et recommandation

Nous recommandons l'authentification OIDC pour l'accès des humains à l'UI Vault, à la place de l'authentification LDAPS vers l'Active Directory, avec **le Keycloak déjà en place, fédéré à l'AD**, sous deux conditions : la MFA imposée sur le client Vault et la haute disponibilité de Keycloak confirmée. Si ces conditions ne peuvent pas être remplies, Entra ID est l'alternative.

Trois raisons principales :

- **Vault ne voit plus aucun mot de passe** : l'authentification a lieu chez le fournisseur d'identité, Vault reçoit seulement un jeton signé.
- **Les droits restent dans l'AD** : Keycloak transmet directement les groupes AD à Vault, sans synchronisation ni création de groupes ailleurs.
- **Moins de dépendances** : plus de compte de service AD stocké dans Vault, et aucun flux de Vault vers Internet.

Périmètre : accès humain via l'UI uniquement. Les applications restent sur l'auth Kubernetes, les pipelines sur l'auth JWT. Le coût de licence est identique dans les deux cas (une entity par utilisateur).

## Les deux flux comparés

&#91;embedded content: flux d'authentification · LDAPS vs OIDC\]

En LDAPS, Vault reçoit le mot de passe et le vérifie auprès de l'AD. En OIDC, l'utilisateur s'authentifie chez Entra ID, et Vault échange un code contre un jeton signé contenant les groupes. Dans les deux cas, Vault mappe ensuite les groupes vers des policies et émet son propre token.

## Arguments sécurité

OIDC retire à Vault la manipulation des mots de passe et ajoute les contrôles d'Entra ID à chaque connexion.

| # | Sujet | LDAPS (AD) | OIDC (Entra ID) |
| --- | --- | --- | --- |
| 1 | Mots de passe | Chaque mot de passe AD transite par Vault. Un Vault compromis collecte des identifiants AD. | Vault ne reçoit qu'un code à usage unique, puis un jeton signé. |
| 2 | MFA et Conditional Access | Aucun nativement. Nécessite la MFA de Vault Enterprise, un second système à maintenir. | Hérités d'Entra ID : MFA, poste conforme, localisation, risque de connexion. |
| 3 | Résistance au phishing | Impossible. | Passkeys, FIDO2, Windows Hello. |
| 4 | Compte de service | Un compte AD (`binddn`) dont le mot de passe est stocké dans Vault, rotation à gérer. | Aucun compte AD. Une App registration Entra ID. |
| 5 | Verrouillage de comptes | Chaque échec sur l'UI Vault incrémente le compteur AD. Un script peut verrouiller des comptes en masse. | Smart lockout d'Entra ID. |
| 6 | Journalisation | Logs AD et audit Vault, à corréler. | Sign-in logs Entra ID, déjà suivis par le SOC, et audit Vault. |

## Arguments exploitation

OIDC supprime des dépendances on-prem et simplifie la gestion des droits.

| # | Sujet | LDAPS (AD) | OIDC (Entra ID) |
| --- | --- | --- | --- |
| 7 | Flux réseau | Vault doit joindre les contrôleurs de domaine en LDAPS (636) et faire confiance à la CA de l'AD. | Un seul flux sortant HTTPS vers `login.microsoftonline.com`. |
| 8 | Gestion des groupes | Groupes AD uniquement. Un groupe créé dans Entra ID nécessite un writeback vers l'AD (Cloud Sync, délai de 20 min). | Groupes cloud utilisés directement, sans OU ni writeback. Groupes dynamiques et access reviews possibles. |
| 9 | Groupes imbriqués | Invisibles par défaut. Filtre LDAP spécifique à configurer. | Résolus par Entra ID. |
| 10 | Identifiant utilisateur | Nom de compte. Un renommage crée une nouvelle entity : historique d'audit perdu et licence supplémentaire. | `oid` immuable : une entity stable par utilisateur. |
| 11 | Expérience utilisateur | Nouvelle saisie du mot de passe AD. | SSO, aucune saisie si la session Entra ID est active. |

## Contre-arguments et réponses

Les points faibles d'OIDC sont réels, mais chacun a une parade simple.

| Point faible OIDC | Réponse |
| --- | --- |
| Dépendance à Entra ID et à Internet : si Entra ID est indisponible, plus de connexion à l'UI | Accès break-glass local (`userpass` ou procédure `generate-root`), réservé aux admins, documenté et audité |
| Flux sortant de Vault vers `login.microsoftonline.com` | Une règle de proxy ou de pare-feu. Aucun flux entrant depuis Internet : Entra ID ne contacte jamais Vault |
| Expiration du client secret de l'App registration (6 à 24 mois) | Alerte avant expiration et rotation planifiée |
| Groupes identifiés par GUID et non par nom | Mapping géré en Terraform avec le provider `azuread`, qui résout le nom en GUID |
| Overage : au-delà de 200 groupes, Entra ID retire le claim `groups` | N'émettre que les groupes assignés à l'application |

**Points neutres :**

- **Licence** : identique, une entity par utilisateur actif sur la période.
- **Révocation** : dans les deux cas, désactiver un compte ou retirer un groupe ne révoque pas un token Vault déjà émis. Il reste valide jusqu'à son TTL, d'où un TTL court (1 h à 8 h) pour les humains.

## Prérequis et points de vigilance

La mise en œuvre tient en une App registration, une règle réseau sortante et un mapping de groupes en Terraform.

**Côté Entra ID**

1. App registration avec une seule redirect URI : `https://<vault>/ui/vault/auth/oidc/oidc/callback`. Pas d'URI `localhost`, l'usage CLI n'est pas prévu.
2. Claim `groups` activé (groupes de sécurité), limité aux groupes assignés à l'application.
3. « Assignment required » activé sur l'Enterprise App, avec le seul groupe d'accès à Vault assigné.

**Côté Vault**

1. Mount OIDC avec `listing_visibility = "unauth"`, pour qu'il apparaisse sur la page de login.
2. Un rôle OIDC unique avec `user_claim = "oid"`, `groups_claim = "groups"` et un TTL court.
3. Les policies portées par des groupes d'identité externes, chacun avec un alias égal à l'Object ID du groupe Entra ID. Mapping géré en Terraform.
4. Les groupes d'administration de Vault en type `internal`, pour qu'aucun alias ne puisse s'y rattacher.

**Réseau et exploitation**

- Flux sortant HTTPS de Vault vers `login.microsoftonline.com`, via le proxy si nécessaire.
- Accès break-glass hors Entra ID, testé régulièrement.
- Alerte sur l'expiration du client secret.
- Pendant la transition, rattacher les alias LDAP et OIDC d'un même utilisateur à une seule entity, pour ne pas le compter deux fois.

## Gestion des droits

Les droits d'un humain sur un coffre passent par une chaîne de cinq maillons, tenue par trois acteurs distincts : le pipeline crée les groupes et les lie aux policies, l'outil d'habilitation choisit les membres, les admins écrivent les policies.

&#91;embedded content: chaîne des droits · 5 maillons, 3 acteurs\]

Aucun acteur ne peut à la fois créer un groupe, lui donner des droits et s'y ajouter : c'est ce qui empêche l'auto-attribution d'un accès.

### Rôle sur un coffre : lister et ajouter, sans lire

Les utilisateurs peuvent lister les secrets d'un coffre et en ajouter, mais jamais en lire la valeur. Seule l'application lit ses secrets, via l'auth Kubernetes.

| Action | Chemin KV v2 | Capability | Accordée |
| --- | --- | --- | --- |
| Lister les noms des secrets | `<coffre>/metadata/*` | `list` | Oui |
| Voir versions et métadonnées | `<coffre>/metadata/*` | `read` | Oui |
| Ajouter un nouveau secret | `<coffre>/data/*` | `create` | Oui |
| Modifier un secret existant | `<coffre>/data/*` | `update` | À décider |
| Lire la valeur d'un secret | `<coffre>/data/*` | `read` | Non |
| Supprimer ou détruire | `data`, `metadata`, `destroy` | `delete`, `update` | Non |

```hcl
# Policy kv-app-<app>-contributeur
path "kv-app-<app>/data/*" {
  capabilities = ["create"]
}

path "kv-app-<app>/metadata/*" {
  capabilities = ["list", "read"]
}
```

**Points de vigilance**

- **Pas de `deny` pour bloquer la lecture** : dans Vault, un `deny` bloque toutes les capabilities du chemin, création comprise. On s'assure simplement qu'aucune policy attachée n'accorde `read` sur `data/`.
- **`update` contourne l'interdiction de lecture** : il permet d'écraser un secret par une valeur connue, par exemple un mot de passe de base de données. À n'accorder que si la rotation manuelle par un humain est nécessaire.
- **`read` sur `metadata/` expose les `custom_metadata`** : aucune information sensible ne doit y être stockée.
- **Tester le parcours dans l'UI** avant diffusion : création d'un secret, listing, puis refus attendu à l'ouverture d'un secret.

### Principes de sécurité

- **Séparation des tâches** : trois acteurs distincts créent le groupe (pipeline, stage 1), lui attribuent des droits (pipeline, stage 2 avec approbation) et choisissent ses membres (outil d'habilitation). Aucun ne peut s'auto-attribuer un accès.
- **Groupes d'administration Vault en type `internal`** : aucun alias externe ne peut s'y rattacher.
- **Révocation** : retirer quelqu'un d'un groupe Entra ID prend effet à son prochain login, d'où un TTL court pour les humains.
- **Traçabilité** : chaque action est rattachée à une entity unique dans l'audit Vault, envoyé au SIEM.
- **Applications** : hors de cette chaîne. Elles lisent leurs secrets via l'auth Kubernetes et une policy templatée par namespace.

### Questions ouvertes

- Quel outil d'habilitation gère les membres des groupes Entra ID, et avec quels droits ? La réponse décide si les groupes ont besoin d'un owner.
- Accorde-t-on `update` pour la rotation manuelle, ou la rotation est-elle réservée à l'application ?
- Faut-il un rôle d'administration par coffre, en plus du contributeur ?
- Qui approuve la liaison groupe → policy au stage 2 ?

## OIDC : Entra ID ou Keycloak

Keycloak est déjà en place : ce n'est pas un composant supplémentaire. Pour Vault, les deux options passent par la même méthode OIDC. La configuration, le diagramme de séquence et les gains face à LDAPS sont identiques, seul le fournisseur d'identité change.

| Critère | Keycloak | Entra ID |
| --- | --- | --- |
| Source des groupes | Groupes AD, transmis directement | Groupes Entra ID, à créer par un pipeline |
| Hébergement | On-prem : aucun flux de Vault vers Internet | Cloud : flux sortant de Vault vers Microsoft |
| Souveraineté | Maîtrisée en interne | Dépendance à Microsoft |
| Noms des groupes dans les jetons | Lisibles | GUID |
| Limite de groupes par utilisateur | Aucune | 200 par défaut, contournée en n'émettant que les groupes assignés à l'application (licence Entra ID P1) |
| MFA | Non imposée aujourd'hui, activable sur le seul client Vault | Déjà déployée, avec Conditional Access |
| Détection des risques et logs SOC | Admin events à envoyer au SIEM | Natifs (Identity Protection, sign-in logs) |
| Exploitation | Déjà en production pour GitLab, administré par notre équipe | Administration Entra ID hors de ce périmètre |
| Mot de passe | Saisi chez Keycloak, jamais chez Vault | Saisi chez Microsoft, jamais chez Vault |

### Critères de décision et état actuel

| Question | Réponse actuelle | Effet sur le choix |
| --- | --- | --- |
| Keycloak est-il déjà utilisé en interne ? | Oui, pour GitLab, administré par notre équipe | En faveur de Keycloak |
| D'où Keycloak tire-t-il utilisateurs et groupes ? | De l'AD (fédération LDAP) | En faveur de Keycloak : pas d'intermédiaire inutile |
| Où l'outil d'habilitation écrit-il les droits ? | Dans des groupes AD | En faveur de Keycloak : la création de groupes dans Entra ID devient inutile |
| La MFA est-elle imposée ? | Non, pas aujourd'hui | Condition à remplir avant de retenir Keycloak |
| Keycloak est-il en haute disponibilité ? | À vérifier | Condition à remplir avant de retenir Keycloak |

### Recommandation : Keycloak, sous conditions

Keycloak, parce que nos droits sont déjà dans l'AD et qu'il est déjà en production chez nous, **à condition** de :

1. **Imposer la MFA sur le client Vault** (OTP ou WebAuthn), via un flow d'authentification propre à ce client. GitLab et les autres clients du realm ne sont pas impactés.
2. **Confirmer la haute disponibilité** de Keycloak (plusieurs nœuds, base de données redondée). Il devient critique pour l'accès à Vault.

**Risque à traiter : l'admin de Keycloak est de fait admin de Vault.** Un administrateur Keycloak peut ajouter au client un mapper qui injecte un groupe dans le jeton, et Vault fait confiance à ce que Keycloak signe. Parades :

- les groupes d'administration Vault ne passent pas par OIDC : groupes `internal`, avec des entities ajoutées nommément ;
- toute modification de Keycloak passe par Terraform et une merge request relue ;
- les admin events Keycloak sont envoyés au SIEM, avec une alerte sur toute modification de mapper du client `vault`.

### Mise en œuvre avec Keycloak

**Client Keycloak (Terraform)** : client confidentiel avec secret, standard flow uniquement (direct access grants désactivé), une seule redirect URI, et un mapper « Group Membership » qui émet le claim `groups` sans le chemin complet.

```hcl
resource "keycloak_openid_client" "vault" {
  realm_id                     = data.keycloak_realm.corp.id
  client_id                    = "vault"
  access_type                  = "CONFIDENTIAL"
  standard_flow_enabled        = true
  direct_access_grants_enabled = false
  valid_redirect_uris          = ["https://<vault>/ui/vault/auth/oidc/oidc/callback"]
}

resource "keycloak_openid_group_membership_protocol_mapper" "groups" {
  realm_id        = data.keycloak_realm.corp.id
  client_id       = keycloak_openid_client.vault.id
  name            = "groups"
  claim_name      = "groups"
  full_path       = false
  add_to_id_token = true
}
```

**Côté Vault** :

- `oidc_discovery_url = "https://<keycloak>/realms/<realm>"`, avec `oidc_discovery_ca_pem` pour faire confiance à la CA interne de Keycloak ;
- `user_claim = "sub"` (identifiant stable tant que la fédération LDAP n'est pas recréée) et `groups_claim = "groups"` ;
- `bound_claims` sur un groupe AD d'accès à Vault : Keycloak n'a pas d'équivalent à « Assignment required », le filtrage se fait donc côté Vault ;
- les group aliases portent directement le **nom** du groupe AD.

**Effet sur la chaîne des droits** : les groupes sont des groupes AD, créés par le processus AD existant. Le stage 1 du pipeline (création de groupes dans Entra ID) disparaît. Le stage 2 (liaison groupe → policy dans Vault, avec approbation) reste inchangé. Les prérequis Entra ID décrits plus haut ne s'appliquent que si Entra ID est retenu.

## Alternatives écartées

| Alternative | Pourquoi écartée | Quand elle redeviendrait pertinente |
| --- | --- | --- |
| Okta, Ping Identity | IdP supplémentaires, à acheter et à synchroniser avec l'AD, pour un service déjà rendu par Entra ID ou Keycloak | Si l'entreprise les adopte comme IdP de référence |
| Comptes locaux Vault (`userpass`) | Mots de passe gérés dans Vault, sans MFA native, sans lien avec le cycle de vie des comptes AD | Uniquement pour l'accès break-glass, en cas d'indisponibilité du fournisseur d'identité |

### Méthodes proposées par l'UI Vault

Ni Entra ID ni Keycloak n'apparaissent dans la liste de l'UI : tous deux passent par la méthode OIDC. C'est la seule option qui combine l'identité d'entreprise existante, la MFA, un mot de passe qui ne passe jamais par Vault et des droits gérés par groupes.

| Méthode | Pourquoi OIDC est préférable pour l'UI |
| --- | --- |
| LDAP | Le mot de passe transite par Vault, pas de MFA, compte de service AD stocké dans Vault |
| JWT | Même moteur qu'OIDC, mais sans redirection navigateur : l'utilisateur devrait coller lui-même un jeton. Conçu pour les machines (CI/CD) |
| Okta | Suppose Okta comme fournisseur d'identité : un produit de plus à acheter et à synchroniser |
| RADIUS | Protocole ancien, mot de passe transitant par Vault, serveur RADIUS à maintenir |
| GitHub | Repose sur des comptes GitHub, souvent personnels, sans lien avec le cycle de vie des comptes de l'entreprise |
| Token | Aucune identité, donc pas de traçabilité. Un token se copie et se partage |
| TLS Certificates | Sécurité forte, mais un certificat client à émettre, distribuer et révoquer par poste ou par carte à puce. Aucun lien direct avec les groupes de l'annuaire |
| Userpass | Comptes locaux à Vault, sans MFA, déconnectés des arrivées et départs. Réservé au break-glass |

Seule la méthode TLS Certificates rivalise sur la sécurité, si une infrastructure de cartes à puce existe déjà.

## Quand LDAP reste justifié

LDAP ne garde l'avantage que dans un environnement isolé, sans accès à Entra ID. Ce n'est pas le cas pour un accès UI depuis les postes de l'entreprise.

La recommandation est donc de passer l'accès humain à l'UI Vault en OIDC, via Keycloak fédéré à l'AD si la MFA et la haute disponibilité sont confirmées, sinon via Entra ID, avec dans les deux cas un accès break-glass local et des TTL courts.

**Points ouverts** : la haute disponibilité de Keycloak, et l'activation de la MFA sur le client Vault.
