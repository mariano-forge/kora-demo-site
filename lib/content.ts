// Café Boréal's content: a made-up client. Some flaws are left on purpose, for review demos:
// - a typo on the home page (« Réservé une table ») and a pale button hard to read;
// - the cappuccino at 4,50 € on the home page, 4,20 € on the menu;
// - the Saturday hours differ between « Le lieu » and the footer;
// - no online booking: the client will ask for it (an out-of-scope request to quote).

export type MenuItem = { name: string; detail?: string; price: string };
export type MenuSection = { id: string; label: string; items: MenuItem[] };

export const menu: MenuSection[] = [
  {
    id: "cafes",
    label: "Cafés",
    items: [
      { name: "Espresso", detail: "Notre assemblage maison, torréfié le mardi", price: "2,20 €" },
      { name: "Allongé", price: "2,60 €" },
      { name: "Cappuccino", detail: "Lait entier ou avoine", price: "4,20 €" },
      { name: "Flat white", price: "4,40 €" },
      { name: "Filtre du moment", detail: "Éthiopie, Guji · notes d’abricot", price: "4,80 €" },
    ],
  },
  {
    id: "thes",
    label: "Thés & autres",
    items: [
      { name: "Thé vert sencha", price: "3,80 €" },
      { name: "Chaï maison", detail: "Épices infusées, lait chaud", price: "4,90 €" },
      { name: "Chocolat chaud", detail: "Chocolat noir 70 %", price: "4,50 €" },
    ],
  },
  {
    id: "patisseries",
    label: "Pâtisseries",
    items: [
      { name: "Cookie noisette", price: "3,20 €" },
      { name: "Banana bread", detail: "Sans gluten le jeudi", price: "3,90 €" },
      { name: "Cannelé", price: "2,40 €" },
      { name: "Tarte du jour", price: "5,50 €" },
    ],
  },
  {
    id: "brunch",
    label: "Brunch du dimanche",
    items: [
      { name: "Formule Boréal", detail: "Boisson chaude, jus pressé, tartine, œuf mollet", price: "21 €" },
      { name: "Granola maison", detail: "Yaourt grec, fruits de saison", price: "8,50 €" },
      { name: "Pancakes", detail: "Sirop d’érable, beurre salé", price: "9,50 €" },
    ],
  },
];

export type Testimonial = { quote: string; author: string };

export const testimonials: Testimonial[] = [
  { quote: "Le meilleur flat white de la ville, et une équipe qui se souvient de votre prénom.", author: "Inès, cliente depuis 2022" },
  { quote: "On vient pour le café, on reste pour le banana bread. Et la lumière du matin.", author: "Thomas, voisin" },
  { quote: "Un endroit calme pour travailler, avec du vrai réseau et des prises partout.", author: "Mélanie, graphiste indépendante" },
];

export type Post = { slug: string; title: string; date: string; excerpt: string; body: string[] };

export const posts: Post[] = [
  {
    slug: "notre-torrefaction",
    title: "Pourquoi nous torréfions le mardi",
    date: "3 octobre 2026",
    excerpt: "Un café a besoin de quelques jours de repos après la torréfaction. Voici notre rythme.",
    body: [
      "Après la torréfaction, le grain relâche du gaz carbonique pendant plusieurs jours. Trop frais, l’espresso est instable ; trop vieux, il perd ses arômes.",
      "En torréfiant le mardi, nos cafés sont à leur meilleur du vendredi au mardi suivant : exactement quand vous êtes le plus nombreux.",
    ],
  },
  {
    slug: "brunch-du-dimanche",
    title: "Le brunch du dimanche revient",
    date: "18 septembre 2026",
    excerpt: "Après l’été, la formule Boréal fait son retour, avec un nouveau granola.",
    body: [
      "Chaque dimanche de 10 h à 14 h, la formule Boréal vous attend : boisson chaude, jus pressé, tartine de pain au levain et œuf mollet.",
      "Nouveauté de la rentrée : un granola maison aux noisettes torréfiées, servi avec un yaourt grec.",
    ],
  },
  {
    slug: "origine-ethiopie",
    title: "Éthiopie, Guji : notre nouveau filtre",
    date: "2 septembre 2026",
    excerpt: "Des notes d’abricot et de bergamote, une acidité douce : rencontre avec notre nouvelle origine.",
    body: [
      "Ce café pousse à plus de 2 000 mètres, dans la zone de Guji. Il est lavé, puis séché lentement sur des lits surélevés.",
      "En filtre, il révèle des notes d’abricot et de bergamote. Demandez-le en V60 au comptoir.",
    ],
  },
];

export const address = { street: "12 rue des Tanneurs", city: "69002 Lyon", phone: "04 78 00 00 00", email: "bonjour@cafe-boreal.example" };
