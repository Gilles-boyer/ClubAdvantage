# ClubAdvantage

**ClubAdvantage** is a web platform to manage exclusive offers and benefits for employee committees (CSEs) in partnership with Circuit Félix Guichard.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Branch Strategy](#branch-strategy)
- [Back-end Setup (Laravel)](#back-end-setup-laravel)
- [Front-end Setup (React)](#front-end-setup-react)
- [Contribution Guidelines](#contribution-guidelines)

---

## Project Overview

ClubAdvantage enables CSE staff and their members to access exclusive offers, manage memberships, scan QR codes for validation, and navigate dashboards tailored to their role (staff, CSE representative, or member).

---

## Tech Stack

**Back-end**: Laravel 12  
**Front-end**: React.js + Tailwind CSS  
**Database**: MySQL / MariaDB  
**Deployment**: O2Switch  
**Methodology**: Agile / SCRUM

---

## Branch Strategy

- `main`: stable production-ready version
- `develop`: main development branch
- `back_end`: back-end development (Laravel)
- `front_end`: front-end development (React)


## Configuring and using TailwindCSS (v4.1)

ClubAdvantage uses **Tailwind CSS**, with a recent version **(v4.1)** via the `@theme` directive integrated directly into the CSS file. This method lets you define colors, fonts and other theme elements without having to go through `tailwind.config.js` for visual customization.

### Installation and integration

- Installation via npm :


```
    npm install tailwindcss @tailwindcss/vite
```


- Configuring Vite plugin:

Vite plugin has been added to the `vite.config.js` file by integrating the following lines of code:

```
import tailwindcss from '@tailwindcss/vite

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
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


- The file is imported into the entry point `main.jsx`:

```
import './style/tailwind.css'
```

- Then the elements are used in code:

```
<h1 className=“text-dark font-inter”>Welcome to CardAdvantage!</h1>
```
