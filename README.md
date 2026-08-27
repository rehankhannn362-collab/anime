# 🌸 AnimeVerse — Premium Anime & Manga Cyber Hub

Welcome to **AnimeVerse**, a visually stunning, competition-grade anime and manga web platform designed with futuristic Japanese cyberpunk aesthetics, glassmorphism UI, a real-time Sakura petal physics particle engine, 3D interactive card tilt effects, dynamic anime details modal with trailer simulation, character vault, and Web Audio API ambient synthesis.

---

## ✨ Features & Visual Highlights

1. **Futuristic Japanese & Cyberpunk Aesthetic**:
   - Deep cosmic obsidian/navy palette (`#060713`, `#090a1a`) with electric neon pink (`#ff2a85`), cyan (`#00f0ff`), violet (`#9d4edd`), and gold (`#ffd166`) accents.
   - Authentic Japanese calligraphy badges (`「アニメの世界へようこそ」`, `人気作`, `漫画文庫`, `英雄録`).
   - Frosted glassmorphism cards with `backdrop-filter: blur(16px)` and subtle glowing neon borders.

2. **Fixed Glassmorphism Navigation Bar**:
   - Frosted blur header that dynamically darkens and adds neon glow on scroll.
   - Scrollspy highlighting active section.
   - Quick Search modal trigger (`Ctrl + K`).
   - Sakura Petal physics toggle switch (🌸).
   - Cyberpunk Ambient Audio Synthesizer toggle (🎵).
   - Persistent Watchlist drawer with live counter.
   - Mobile-responsive hamburger menu with smooth slide-down animation.

3. **Cinematic Full-Screen Hero Section**:
   - Large animated moving gradient title: `"WELCOME TO ANIMEVERSE"`.
   - Subtitle: `"Where anime worlds come alive."`
   - High-impact CTA buttons (`EXPLORE ANIME`, `DISCOVER MANGA`) with neon glow, ripple shine, and hover scale.
   - Floating Anime Mascot with multi-layer glowing aura, idle levitation, and 3D cursor parallax tracking.
   - Live metrics ticker (2,500+ Series, 10,000+ Manga Chapters, 99.8% Community Score).
   - Animated `"SCROLL TO EXPLORE ↓"` indicator.

4. **HTML5 Canvas Sakura Petal Particle Engine**:
   - Natural wind drift, oscillation, and 3D z-axis fluttering rotation.
   - Varied petal shapes, translucent pink gradients, and mouse wind-trail reaction.
   - Lightweight, zero-lag 60 FPS performance.

5. **Popular Anime Showcase & 3D Tilt Cards**:
   - Filter chips (All, Shonen Legends, Dark Fantasy, Action, Supernatural).
   - Instant live search and sorting by Rating, Episode Count, and Alphabetical order.
   - Feature cards for *One Piece, Jujutsu Kaisen, Demon Slayer, Attack on Titan, Naruto Shippuden, Dragon Ball Super, Solo Leveling, Bleach TYBW, Chainsaw Man*.
   - 3D perspective mouse tilt with dynamic specular sheen and poster zoom.
   - Interactive "VIEW DETAILS" button opening the full anime modal.
   - "Add to Watchlist" bookmarking persisted in `localStorage`.

6. **Interactive Anime Details Modal**:
   - Hero backdrop banner, studio tags, score breakdown, full synopsis, character cast list, and embedded official trailer video player simulator.

7. **Manga Discovery Showcase ("DISCOVER MANGA")**:
   - 3D perspective manga volume covers (*Berserk, Vagabond, Tokyo Ghoul, Blue Lock*) with realistic spine and chapter reading triggers.

8. **Legendary Character Vault**:
   - Interactive avatar selector (*Gojo, Luffy, Levi, Tanjiro, Zoro*).
   - Dynamic animated combat & aura metrics stat bars, signature techniques, and quotes.

9. **Tokyo Synchronous Airing Schedule**:
   - Weekday tabs (Mon–Sun) with Japanese kanji days and alert notification triggers.

10. **Cyberpunk Web Audio Synth**:
    - Procedural audio engine generating soothing ambient chord pads and futuristic UI sound effects on button hovers and clicks.

---

## 🚀 How to Run

1. Open `index.html` directly in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, Brave).
2. No installation, backend, or build step required — pure standard HTML5, CSS3, and ES6 JavaScript!

---

## 📁 File Structure

```
animeverse/
├── index.html              # Main HTML document
├── README.md               # Documentation & overview
├── css/
│   ├── style.css           # Core theme variables, typography, reset, buttons
│   ├── animations.css      # Keyframes for text gradients, glows, levitation, radar
│   └── components.css      # Navbar, Hero, Cards, 3D tilt, Modals, Vault, Schedule
└── js/
    ├── anime-data.js       # Complete anime, manga, character, and schedule database
    ├── sakura.js           # High-performance HTML5 Canvas Sakura particle engine
    ├── tilt.js             # 3D interactive card tilt & hero mouse parallax
    ├── audio.js            # Web Audio API synthesizer for ambient synth & SFX
    └── app.js              # Application logic, filters, search, modals, watchlist
```
