# Café Boréal · site de recette de démonstration

Un faux site client, en Next.js, pour **montrer Kora en démo** et **tester la barre Kora** sur un vrai site. Le Café Boréal est fictif : son contenu, ses adresses et ses avis sont inventés.

Le site ressemble à ce qu'une agence web livre réellement : pages statiques et dynamiques, navigation sans rechargement, onglets, carrousel, bandeau de cookies, menu mobile, formulaire, polices web. Aucun outil de revue n'y est installé.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:4000
```

## Déployer sur Vercel

1. Pousser ce dossier dans un dépôt GitHub (privé ou public).
2. Sur Vercel : **Add New… → Project**, choisir le dépôt. Vercel reconnaît Next.js tout seul.
3. Déployer : Vercel donne l'adresse du site, par exemple `https://cafe-boreal-recette.vercel.app`.

Le site n'est pas indexé par les moteurs de recherche. **L'outil de revue n'y est pas installé** : c'est à faire comme une agence le ferait.

## Le scénario de démo

**Côté client**, une fois Kora installé sur le site (l'adresse invitée, sur le site avec `?kora`) :
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
| Gabarit racine (`app/layout.tsx`) | l'endroit où une agence colle une ligne de script commune à toutes les pages |
| Polices `next/font` | la fidélité de la capture |

## Versions

Next.js 16.3.8 et React 19.2.8, les mêmes que Kora.
