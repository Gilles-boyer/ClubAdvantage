# ClubAdvantage

**ClubAdvantage** est une plateforme web permettant de gérer les offres et avantages exclusifs proposés aux Comités Sociaux et Économiques (CSE) partenaires du Circuit Félix Guichard.

---

## Table des matières

- [Présentation du projet](#présentation-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Stratégie de branches Git](#stratégie-de-branches-git)
- [Installation back-end (Laravel)](#installation-back-end-laravel)
- [Installation front-end (React)](#installation-front-end-react)
- [Règles de contribution](#règles-de-contribution)

---

## Présentation du projet

La plateforme ClubAdvantage permet aux représentants CSE, aux membres adhérents et au staff du Circuit de gérer les accès, consulter les offres, utiliser une e-carte avec QR code, et accéder à des tableaux de bord personnalisés selon leur rôle.

---

## Technologies utilisées

**Back-end** : Laravel 12  
**Front-end** : React.js + Tailwind CSS  
**Base de données** : MySQL / MariaDB  
**Déploiement** : O2Switch  
**Méthodologie** : Agile / SCRUM

---

## Stratégie de branches Git

- `main` : version stable destinée à la mise en production
- `develop` : branche principale de développement
- `back_end` : développement du back-end Laravel
- `front_end` : développement du front-end React.js


## Configuration et Utilisation de TailwindCSS (v4.1)

ClubAdvantage utilise **Tailwind CSS en version 4.1**, avec une version récente via la directive `@theme` intégrée directement dans le fichier CSS. Cette méthode permet de définir les couleurs, polices et autres éléments du thème sans passer par `tailwind.config.js` pour la personnalisation visuelle.

### Installation et intégration

- Installation via npm :


```
    npm install tailwindcss @tailwindcss/vite
```


- Configuration du module Vite :

Le module vite a été ajouté dans le fichier `vite.config.js` en intégrant les lignes de code suivantes :

```
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

- Configuration des éléments du thème :

Le fichier `style/tailwind.css` contient les imports nécessaires et la déclaration du thème personnalisé

```
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Delicious+Handrawn&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import 'tailwindcss';

@theme {
    --color-dark: oklch(0.31 0.026 54.24);
    --color-primary: oklch(0.79 0.0681 74.74);
    --color-secondary: oklch(0.64 0.0611 70.7);
    --color-gray: oklch(0.91 0.0109 76.59);

    --font-inter: "Inter", "sans-serif";
    --font-poppins: "Poppins", "sans-serif";
}
```


- Le fichier est importé dans le point d'entrée `main.jsx` :

```
import './style/tailwind.css'
```

- Puis les éléments sont utilisés dans le code :

```
<h1 className="text-dark font-inter">Bienvenue sur CardAdvantage !</h1>
```
- Configuring theme elements :


The `style/tailwind.css` file contains the necessary imports and the custom theme declaration

```
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Delicious+Handrawn&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import 'tailwindcss';

@theme {
--color-dark: oklch(0.31 0.026 54.24);
    --color-primary: oklch(0.79 0.0681 74.74);
    --color-secondary: oklch(0.64 0.0611 70.7);
    --color-gray: oklch(0.91 0.0109 76.59);
    --font-inter: “Inter”, “sans-serif”;
    --font-poppins: “Poppins”, “sans-serif”;
}
```


- The file is imported into the `main.jsx` entry point:

```
import './style/tailwind.css'
```

- Then the elements are used in the code:

```
<h1 className=“text-dark font-inter”>Welcome to CardAdvantage!</h1>
```
