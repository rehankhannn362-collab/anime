# 🌸 AnimeVerse — Anime & Manga Discovery Website Template

A responsive, front-end website template for anime and manga discovery, built with HTML, CSS, and vanilla JavaScript. AnimeVerse combines a neon cyberpunk aesthetic, glassmorphism panels, animated sakura petals, interactive discovery cards, character profiles, and a locally saved watchlist.

> **Important:** AnimeVerse is a front-end demo/template, not a streaming platform. It does not provide anime episodes, manga chapters, user accounts, server-side storage, payments, or a configured contact/newsletter backend.

## ✨ Features

- **Responsive layout:** desktop and mobile styling, including a mobile-friendly saved-watchlist layout.
- **Cyberpunk visual design:** dark navy/black surfaces, neon pink/cyan/violet accents, glowing borders, and glassmorphism effects.
- **Animated hero section:** gradient title, floating visual elements, ambient effects, and call-to-action links.
- **Sakura particle effect:** animated petals with a toggle control.
- **Anime discovery:** curated anime cards, search, category filters, sorting, and detail modals.
- **Manga discovery:** manga cards and title-specific links to search for legitimate reading options; no chapters are hosted by this template.
- **Character Vault:** interactive character selector with stat bars, signature techniques, and character quotes.
- **Saved watchlist:** add/remove items and save the list in the browser using `localStorage`.
- **Ambient audio and UI sounds:** optional procedural audio generated with the Web Audio API. Browsers may require a user gesture before audio can play.
- **Trailer links:** anime detail views include trailer embeds or search fallbacks, depending on availability.
- **Graceful image fallbacks:** some remote artwork failures display a styled fallback instead of a broken-image icon.
- **No build step:** uses standard HTML, CSS, and JavaScript.

## 🧰 Tech stack

- HTML5
- CSS3 (responsive media queries, animations, grid/flexbox, glassmorphism)
- Vanilla JavaScript (ES6+)
- Browser APIs: Web Audio API and `localStorage`
- External image and video resources where configured in the demo

## 🚀 Run locally

1. Download or clone this repository.
2. Keep the folder structure intact.
3. Open `index.html` in a modern browser, or serve the folder using a local static web server.
4. For the best experience, allow network access for remote artwork and embedded video resources, and interact with the page before enabling audio.

No package installation or compilation is required.

## 📁 Project structure

```
animeverse/
├── index.html
├── README.md
├── css/
│   ├── style.css        # Base styles, theme variables, layout and typography
│   ├── animations.css   # Animation keyframes and motion effects
│   └── components.css   # Navigation, cards, modals, watchlist and responsive styles
└── js/
    ├── anime-data.js    # Demo anime, manga, character and schedule data
    ├── sakura.js        # Canvas sakura particle effect
    ├── tilt.js          # Card tilt and parallax effects
    ├── audio.js         # Web Audio ambience and UI sounds
    └── app.js           # Search, filters, modals, watchlist and application behavior
```

## 🎨 Customization

- **Change content:** edit the anime, manga, character, and schedule data in `js/anime-data.js`.
- **Change colors and appearance:** start with the theme variables and base styles in `css/style.css`, then adjust component styles in `css/components.css`.
- **Adjust animations:** edit `css/animations.css` and the relevant JavaScript modules.
- **Update links:** replace demo social links and external trailer/reading links with destinations you own or are authorized to use.
- **Replace artwork:** use original artwork or assets you have permission to use. Keep image paths valid when changing local assets.

## ⚠️ Important limitations

- The watchlist is stored in the current browser's `localStorage`; it does not sync across devices or accounts.
- Search, filters, character details, and schedule are front-end demo features based on the data bundled with the project; there is no live catalog API configured.
- The project does not stream, host, or unlock anime episodes or manga chapters.
- Contact/newsletter interactions do not send messages or store submissions on a server.
- There is no login, user management, admin dashboard, database, payment system, or backend.
- External artwork, fonts, embeds, and image providers can change, block hotlinking, or become unavailable. Their display depends on the provider and network.
- The site has been manually refined for responsive behavior, but rendering can differ across browsers and devices. Test it in your intended deployment environment before publishing.

## 📜 Artwork, trademarks and commercial use

This template references third-party anime/manga titles, character names, artwork, and video resources. Those franchises, trademarks, and third-party assets are **not automatically licensed to you** by downloading or purchasing this template.

Before redistributing, reselling, or using the site commercially:
1. Review the rights and license terms for every included image, font, icon, video, and other third-party asset.
2. Replace assets that you do not have permission to redistribute with original or properly licensed alternatives.
3. Do not imply that the template is officially affiliated with any anime studio, publisher, streaming service, or rights holder.
4. Add your own license and terms for the code you are entitled to distribute, and clearly describe any third-party components or exclusions.

**No legal advice or guarantee of commercial clearance is provided.** The safest resale package is a version containing only your own code and original or clearly licensed assets, with the included demo content and external artwork appropriately removed or replaced.

## ♿ Accessibility and motion

The template includes keyboard focus styling and a reduced-motion preference override for selected animations. This is not a certification of full accessibility compliance; review keyboard navigation, contrast, labels, and screen-reader behavior before production use.

---

Built as a customizable front-end concept for anime and manga discovery.