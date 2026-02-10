# 🎨 Portfolio Personnel - Ibrahim Aboubacar Antoine KY

Portfolio moderne et performant avec effet parallaxe subtil, conçu selon les bonnes pratiques web 2026.

![Version](https://img.shields.io/badge/version-1.0.0-81FF39)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Caractéristiques

- **Design moderne** : Thème sombre avec accents néon (#81FF39)
- **Effet parallaxe** : Subtil et performant (60 FPS)
- **Responsive** : Mobile-first, optimisé pour tous les écrans
- **Animations fluides** : Intersection Observer API
- **Performance** : Vanilla JS, pas de frameworks lourds
- **Accessible** : Support de `prefers-reduced-motion`
- **SEO optimisé** : Meta tags complets

## 🎯 Sections

1. **Hero** - Présentation avec effet parallaxe
2. **À propos** - Introduction personnelle
3. **Compétences** - Frontend, Backend, Outils
4. **Projets** - Portfolio de réalisations
5. **Contact** - Email, GitHub, LinkedIn

## 🛠️ Stack Technique

### Frontend
- HTML5 sémantique
- CSS3 avec variables (Design System)
- JavaScript ES6+ (Vanilla)

### APIs utilisées
- **Intersection Observer** : Animations au scroll
- **requestAnimationFrame** : Parallaxe fluide

### Typographie
- [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

## 🚀 Installation & Lancement

### Méthode 1 : Ouvrir directement
```bash
# Naviguez vers le dossier
cd portfolio

# Ouvrez index.html dans votre navigateur
# Double-clic sur le fichier OU
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

### Méthode 2 : Serveur local (recommandé)
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (npx)
npx http-server -p 8000

# Ouvrez http://localhost:8000
```

## 📁 Structure du Projet

```
portfolio/
├── index.html          # Structure HTML complète
├── css/
│   └── style.css      # Styles avec Design System
├── js/
│   └── main.js        # JavaScript (parallaxe, animations, navigation)
├── assets/
│   └── cv.pdf         # CV téléchargeable
└── README.md          # Documentation
```

## 🎨 Design System

### Palette de Couleurs
```css
--primary: #81FF39      /* Néon - Accents, CTA */
--secondary: #4B4D4C    /* Bordures, cartes */
--tertiary: #B3B3B3     /* Texte secondaire */
--background: #141414   /* Fond principal */
--text: #FAFAFA         /* Texte principal */
```

### Spacing
Basé sur des multiples de **8px** pour cohérence :
- XS: 8px
- SM: 16px
- MD: 24px
- LG: 32px
- XL: 48px
- 2XL: 64px
- 3XL: 96px

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 768px)

/* Tablet */
@media (min-width: 768px)

/* Desktop */
@media (min-width: 1024px)

/* Large Desktop */
@media (min-width: 1440px)
```

### Comportements responsives :
- **Mobile** : Parallaxe désactivé, menu hamburger
- **Tablet** : Animations simplifiées
- **Desktop** : Expérience complète avec parallaxe

## ⚡ Performance

### Optimisations
- Pas de frameworks lourds (Vanilla JS)
- `will-change` pour animations GPU-accélérées
- Intersection Observer (pas de scroll events)
- `requestAnimationFrame` pour parallaxe 60fps
- Debounce sur resize events

### Cible
- **60 FPS** constant
- **Lighthouse score** : 90+

## ♿ Accessibilité

- Structure HTML sémantique
- Navigation au clavier
- Contraste élevé (WCAG AA)
- Support `prefers-reduced-motion`
- ARIA labels sur boutons

## 🔧 Personnalisation

### Modifier les couleurs
Éditez les variables CSS dans `css/style.css` :
```css
:root {
    --primary: #VOTRE_COULEUR;
    /* ... */
}
```

### Modifier le contenu
Tout le contenu est dans `index.html`, sections clairement commentées.

### Ajouter un projet
Dupliquez une `project-card` dans la section `#projects`.

## 📝 TODO / Évolutions futures (V2)

- [ ] Refonte avec React
- [ ] Animations GSAP
- [ ] Blog intégré
- [ ] Backend pour formulaire de contact
- [ ] Dark/Light mode toggle
- [ ] i18n (FR/EN)

## 📄 Licence

© 2026 Ibrahim Aboubacar Antoine KY. Tous droits réservés.

Ce projet est personnel et à usage de portfolio uniquement.

## 📧 Contact

- **Email** : ibrahim.antoine@example.com
- **GitHub** : [@ibrahimantoine](https://github.com/ibrahimantoine)
- **LinkedIn** : [Ibrahim Antoine KY](https://linkedin.com/in/ibrahim-antoine)

---

**Fait avec 💚 et beaucoup de café**
