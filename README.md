# Café Boréal · site de recette de démonstration

Un faux site client, en Next.js, pour **montrer Kora en démo** et **tester la barre Kora** sur un vrai site. Le Café Boréal est fictif : son contenu, ses adresses et ses avis sont inventés.

Le site ressemble à ce qu'une agence web livre réellement : pages statiques et dynamiques, navigation sans rechargement, onglets, carrousel, bandeau de cookies, menu mobile, formulaire, polices web. La barre Kora y est posée comme une agence le ferait : dans le gabarit racine, avec `next/script`.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:4000
```

Sans réglage, le site tourne sans la barre Kora.

## Déployer sur Vercel

1. Pousser ce dossier dans un dépôt GitHub (privé ou public).
2. Sur Vercel : **Add New… → Project**, choisir le dépôt. Vercel reconnaît Next.js tout seul.
3. Déployer une première fois **sans variables** pour obtenir l'adresse, par exemple `https://cafe-boreal-recette.vercel.app`.
4. Dans Kora :
   - créer un espace « Café Boréal », un projet, puis un livrable de type **Lien** avec cette adresse ;
   - ouvrir **Partager la revue**, inviter l'adresse du « client » ;
   - recopier, depuis « Script de recette », l'adresse de Kora et la valeur de `data-site`.
5. Sur Vercel, **Settings → Environment Variables** :
   - `NEXT_PUBLIC_KORA_URL` : l'adresse de Kora, sans `/kora-toolbar.js` ;
   - `NEXT_PUBLIC_KORA_SITE` : la valeur de `data-site`.
6. **Redéployer** (les variables `NEXT_PUBLIC_*` sont lues à la build).
7. Ouvrir le site avec `?kora` à la fin de l'adresse : la pastille « Kora » apparaît en bas à droite.

Ces deux valeurs ne sont pas secrètes : la ligne de script est visible dans la page par tout visiteur. Le site n'est pas indexé par les moteurs de recherche.

## Le scénario de démo

**Côté client** (l'adresse invitée, sur le site avec `?kora`) :
1. Ouvrir Kora, recevoir le code, se présenter.
2. « Commenter » : cliquer sur le titre de l'accueil, « Titre trop long ».
3. Cliquer sur le bouton pâle « Réservé une table » : « Faute, et le bouton se lit mal ».
4. Aller sur « Contact » : « Peut-on réserver en ligne ? ». C'est la demande **hors scope** à chiffrer.
5. Sur « La carte », onglet « Pâtisseries » : « Ajouter une photo du banana bread ».

**Côté agence** (« Je suis de l'agence » dans le panneau, ou dans Kora) :
1. Qualifier : la faute et le bouton en **Inclus**, la réservation en ligne en **Hors scope**.
2. Dans Kora, chiffrer la réservation (par exemple 1 200 €, 5 jours) et l'envoyer.
3. Côté client, « Ouvrir dans Kora » : accepter le devis, puis valider la version.
4. Montrer le tableau de recette du livrable, la preuve et « Pilotage ».

## Les défauts glissés exprès

| Où | Défaut | Qualification attendue |
| --- | --- | --- |
| Accueil | « Réservé une table » (faute) | Inclus |
| Accueil | bouton pâle, texte blanc illisible | Inclus |
| Accueil / La carte | cappuccino à 4,50 € sur l'accueil, 4,20 € sur la carte | Inclus |
| Le lieu / pied de page | samedi : 19 h d'un côté, 18 h de l'autre | Inclus |
| Contact | pas de réservation en ligne | **Hors scope** |

## Ce que le site met à l'épreuve dans la barre Kora

| Élément du site | Ce qu'il vérifie |
| --- | --- |
| Liens Next.js (`next/link`) | la barre suit le changement de page sans rechargement |
| Onglets de « La carte » | une épingle sur un plat caché passe en « élément introuvable », puis revient |
| Carrousel d'avis (accueil) | la capture d'un contenu qui change toutes les 5 secondes |
| Bandeau de cookies | la pastille Kora et un élément fixe en bas d'écran |
| Menu mobile | la barre et le panneau sur petit écran |
| Pages `/journal/[article]` | des pages dynamiques, chacune avec ses épingles |
| `next/script` dans le gabarit | la barre chargée après le rendu, comme sur la plupart des sites Next.js |
| Polices `next/font` | la fidélité de la capture |

## Versions

Next.js 16.3.8 et React 19.2.8, les mêmes que Kora.
