<div align="center">

  <h2 align="center">PokéStudio v2.0</h2>
  <p><i>Collect · Train · Battle — a modern Pokémon companion app powered by PokéAPI.</i></p>
  <div>
    <img src="https://img.shields.io/badge/-React_18-black?style=for-the-badge&logoColor=white&logo=react&color=072485" alt="react" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Vite-black?style=for-the-badge&logoColor=white&logo=vite&color=646CFF" alt="vite" />
    <img src="https://img.shields.io/badge/-Firebase-black?style=for-the-badge&logoColor=white&logo=firebase&color=de8a0b" alt="firebase" />
    <img src="https://img.shields.io/badge/-Framer_Motion-black?style=for-the-badge&logoColor=white&logo=framer&color=ff0080" alt="framer-motion" />
  </div>
  <br/>
  <p>🌐 Live: <a href="https://szemil.github.io/PokeStudio/">szemil.github.io/PokeStudio/</a></p>

</div>

## 📋 Table of Contents

1. ✨ [What's new in v2.0](#whats-new)
2. 🎮 [Features](#features)
3. ⚙️ [Tech stack](#tech-stack)
4. 🚀 [Getting started](#getting-started)
5. 📂 [Project structure](#project-structure)
6. 👋 [About me](#about-me)

## <a name="whats-new">✨ What's new in v2.0</a>

PokéStudio has been completely rebuilt from the ground up:

- **Modern design system** — fully redesigned UI with a custom dark theme, glassmorphism, gradients, type-coloured accents and smooth Framer Motion micro-interactions everywhere.
- **Hero homepage** with featured Pokémon of the day, generation/sort filters, and quick navigation.
- **Beautiful Pokémon detail pages** with tabs for About, Stats, Evolution Chain, Moves, and Gallery + a 3D-tilt collectible trading card.
- **Battle Arena rewrite** — clean turn-based combat with type-effectiveness, critical hits, special-attack charging, AI strategy, animated HP bars, floating damage numbers and a battle log.
- **Booster pack opening animation** with shockwaves and 3D card reveal.
- **New Pokédex Hub tabs**:
  - Daily Quest with persistent streaks
  - Type Matchup Calculator with full coverage chart
  - Team Builder for 6-Pokémon squads with offensive/defensive coverage analytics
  - Pokémon Comparator for stat-by-stat showdowns
  - Achievements with auto-unlocks based on play
  - Profile page with rank progression and lifetime stats
- **Better state management** — added Redux slices for stats, team and a richer filter slice.
- **Performance** — proper code-splitting (vendor chunks for React, Redux, Firebase, Framer Motion, icons).

## <a name="features">🎮 Features</a>

| Module | What it does |
|---|---|
| 🏠 **Home** | Hero, featured Pokémon, search, generation & sort filters, paginated grid of all 1,025+ Pokémon |
| 📖 **Pokémon detail** | Stats with animated bars, type matchups, evolution chains, moves with descriptions, sprite gallery |
| 🛒 **Booster packs** | Silver / Gold / Legendary tiers with rarity odds and animated reveal |
| 📚 **Shelf** | Filter by type, sort by name/BST/value, send to battle squad, quick-sell |
| ⚔️ **Battle Arena** | 3v3 turn-based combat — Easy / Medium / Hard / Master difficulties, type bonuses, crits, AI |
| 🧩 **Team Builder** | Compose 6-Pokémon squads, offensive coverage scoring, defensive vulnerability |
| ⚖️ **Compare** | Side-by-side stat showdown and head-to-head type matchup |
| 🎯 **Type Calculator** | Pick attacker + up to 2 defender types, with full coverage chart |
| 📅 **Daily Quest** | Deterministic daily reward + tip, growing streak meter |
| 🏆 **Achievements** | 12 unlockable badges across collecting, battling, dailies and more |
| 👤 **Profile** | Trainer card with rank, lifetime KPIs and achievements list |
| 📰 **Trainer Feed** | Community posts with bad-words filter |

## <a name="tech-stack">⚙️ Tech Stack</a>

- **React 18** + **TypeScript** + **Vite**
- **Redux Toolkit** + **redux-persist** for state
- **Firebase** (auth + realtime database)
- **Framer Motion** for animations & gesture micro-interactions
- **CSS Modules** with a hand-rolled design-token system (no Tailwind)
- **PokéAPI** for all Pokémon data
- **react-icons** v5 for the icon set (Heroicons + Lucide)

## <a name="getting-started">🚀 Getting started</a>

```bash
git clone https://github.com/SzEmil/PokeStudio
cd PokeStudio
npm install
npm run dev      # local dev server on http://localhost:5173/PokeStudio/
npm run build    # production build into ./dist
npm run deploy   # deploy ./dist to gh-pages branch
```

Test credentials for the live demo: `user@wp.pl` / `123456`

## <a name="project-structure">📂 Project structure</a>

```
src/
  Components/         feature components (Battle, Shop, Shelf, TeamBuilder, ...)
  Pages/              top-level pages (Home, PokeDex hub, Pokemon detail, Profile, ...)
  Redux/              slices, operations, selectors per domain
  data/               static catalogues (types, achievements, gen ranges)
  utils/              shared helpers (sprite URLs, damage calc, sorting)
  Components/UI/      design-system primitives (Button, Card, StatBar, TypeBadge, Pokeball)
  index.css           design tokens & global styles
```

## <a name="about-me">😎 About me</a>

Hi! I'm Emil — this app was originally built three years ago as one of my first
React apps and has now been rewritten end-to-end as PokéStudio v2.0.
If you have any feedback or questions, feel free to open an issue or reach out:

- 💼 <a href="https://www.linkedin.com/in/emil-szymczyk-209613209/">LinkedIn</a>
- 📧 emil-szymczyk2@wp.pl

Enjoy PokéStudio! 🔴⚪
