# AGENTS.md — Gametelier Studio Portfolio & Quote Builder

> **Document Purpose**: This master guide and implementation roadmap specifies the architecture, data models, business rules, visual design system, and phased execution checklist for the Gametelier Studio web portfolio.
> Future agents and developers should refer to this document, follow its conventions, and update the checklist as milestones are completed.

---

## 1. Project Overview & Core Philosophy

**Gametelier Studio** is an interactive experiential game studio providing games, installations, and digital mechanics for corporate events, brand activations, and promotional campaigns.

The website is hosted on **GitHub Pages** and caters directly to **Event Producers** and **HR Managers**. It must convey tech sophistication, prestige, visual excitement, and rock-solid corporate trust.

### Key Architectural Constraints
1. **Zero-Build Vanilla Architecture**: Standard modern HTML5, CSS3, and ES6+ JavaScript. No npm build steps, Webpack, or Bundlers required. Works seamlessly when served statically or cloned locally.
2. **Two Isolated Entry Points**:
   - **Showcase Mode (`index.html`)**: Pure portfolio showcase. Displays game carousels, screenshots, mechanics, campaign case studies, and studio contact. **Zero price mentions, zero cart functionality, and zero links to `cotizador.html`**.
   - **Quote Builder Mode (`cotizador.html`)**: Interactive quotation tool. Displays daily game rates, add-on feature selection assigned per game, duration multiplier, compound promotional discounts, and a checkout modal generating formatted WhatsApp and Email quotation requests. **Zero links pointing back to `index.html`**.
3. **Shared Vertical Category View (`seccion.html`)**:
   - Dynamically loads category content (`?tipo=clasicos|a-medida|agregados|herramientas|campanas`).
   - Adapts to mode (`?mode=showcase|cotizador`). In showcase mode, displays full descriptions and media. In cotizador mode, displays pricing, days counters, add-on attachments, and "+ Agregar a Cotización" buttons.
4. **Smart Internationalization (ES / EN)**:
   - Auto-detects browser locale (`navigator.language`): defaults to Spanish for `es-*`, English for all other languages.
   - Provides a discreet `ES | EN` pill in the header. Persists selection in `localStorage` (`gametelier_lang`).
   - Catalog data and UI strings provide dual keys `{ es: "...", en: "..." }`.

---

## 2. Visual Design System: Dark Tech-Studio

The platform uses the **Dark Tech-Studio** design palette:
- **Canvas / Background**: Deep Midnight Slate (`#0B0F19`)
- **Card Surface**: Charcoal Slate (`#111827`) with soft gradient cards (`#161E31`)
- **Card Borders**: Subtle glassmorphism borders (`rgba(255, 255, 255, 0.08)` / `#1F2937`)
- **Primary Accent**: Electric Indigo (`#6366F1`)
- **Secondary Accent**: Vibrant Emerald / Cyan (`#10B981` / `#06B6D4`) for success badges and discounts
- **Highlight Accent**: Warm Amber Gold (`#F59E0B`) for callouts and promo badges
- **Typography**: Clean, executive B2B typography (`Plus Jakarta Sans`, `Inter`, system sans-serif)

---

## 3. Mathematical Quoting & Promotion Engine

The calculation logic is executed in `assets/js/modules/cart.js`:

### 3.1 Per-Game Rate with Add-Ons
Add-ons (*Tabla de puntuación*, *Registro de usuario*, *Sorteo de premio*) are charged per day and attach to a specific game:
$$\text{Game Daily Rate} = \text{Game Base Daily Price} + \sum (\text{Assigned AddOns Daily Price})$$
$$\text{Game Subtotal} = \text{Game Daily Rate} \times \text{Days}$$

### 3.2 Gross Total
$$\text{Gross Total} = \sum_{\text{all games}} \text{Game Subtotal}$$

### 3.3 Compound Sequential Promotions
1. **Promo 1 (3+ Days)**: If booking duration $\ge 3$ days:
   $$\text{Days Discount} = \text{Gross Total} \times 0.50$$
   $$\text{Subtotal After Days} = \text{Gross Total} - \text{Days Discount}$$
2. **Promo 2 (4+ Games)**: If unique games in cart $\ge 4$:
   $$\text{Games Discount} = \text{Subtotal After Days} \times 0.20$$
   $$\text{Final Total} = \text{Subtotal After Days} - \text{Games Discount}$$
3. **Compound Effect**: If both conditions are satisfied:
   $$\text{Final Total} = (\text{Gross Total} \times 0.50) \times 0.80 = \text{Gross Total} \times 0.40 \quad (\mathbf{60\%\text{ Total Discount}})$$

### 3.4 Checkout Output Channels
When the producer/HR clicks "Solicitar Presupuesto" from the cart drawer:
1. A modal prompts for:
   - **Company / Producer Name** (Nombre de Productora / Empresa)
   - **Event Date** (Fecha tentativa del evento)
   - **Contact Name & Phone/Email**
2. Action buttons:
   - **Enviar por WhatsApp**: Opens `https://wa.me/{phone}?text={encodedSummary}` with an itemized message.
   - **Enviar por Email**: Opens `mailto:{email}?subject={subject}&body={encodedSummary}`.
   - **Copiar Resumen**: Copies the itemized text directly to clipboard.

---

## 4. Repository & File Hierarchy

```
Gametelier-Portfolio/
├── .gitignore
├── README.md
├── AGENTS.md                  <-- This master roadmap document
├── EDITOR.md                  <-- Visual local editor specifications & guide
├── editor.html                <-- Visual Local Catalog Editor (Zero-token in-browser CMS)
├── publicar.bat               <-- 1-Click Windows script to commit & push to GitHub Pages
├── index.html                 <-- Showcase landing page (NO prices, NO cart)
├── cotizador.html             <-- Quote builder landing page (With prices, cart, checkout)
├── seccion.html               <-- Reusable vertical detail list (?tipo=...&mode=showcase|cotizador)
├── assets/
│   ├── css/
│   │   ├── main.css           <-- Design tokens, Dark Tech-Studio palette, typography, layout
│   │   ├── components.css     <-- Carousels, cards, drawer, badges, checkout modal, switcher
│   │   └── responsive.css     <-- Mobile, tablet, and high-DPI responsive adjustments
│   ├── js/
│   │   ├── data/
│   │   │   └── catalog.js     <-- Single source of truth for games, prices, texts & translations
│   │   ├── modules/
│   │   │   ├── i18n.js        <-- Language detector (ES/EN) and translation dispatcher
│   │   │   ├── cart.js        <-- Cart state, per-game add-on addition, days multiplier & promos
│   │   │   ├── carousel.js    <-- Auto-carousel with swipe and pause-on-hover
│   │   │   └── renderer.js    <-- HTML component generators (cards, carousels, grids)
│   │   ├── app.js             <-- Landing page controller (handles index and cotizador modes)
│   │   └── seccion.js         <-- Vertical section controller
│   └── images/
│       ├── logo/              <-- Gametelier Studio logo
│       ├── games/             <-- Game previews & screenshots
│       ├── addons/            <-- Ranking, Registro, Sorteo previews
│       └── tools/             <-- Herramientas previews
```

---

## 5. Data Schema Specification (`catalog.js`)

All data is exported to `window.GAMETELIER_CATALOG`:

```javascript
window.GAMETELIER_CATALOG = {
  studioInfo: {
    name: "Gametelier Studio",
    tagline: {
      es: "Experiencias lúdicas e interactivas para eventos corporativos y activaciones.",
      en: "Interactive play experiences for corporate events and brand activations."
    },
    whatsapp: "5491100000000", // International format without +
    email: "contacto@gametelier.com"
  },
  promotions: {
    daysRule: { minDays: 3, discountPercent: 50 },
    gamesRule: { minGames: 4, discountPercent: 20 },
    disclaimer: {
      es: "Precio por día de cada juego. No incluye pantalla LCD ni guardia técnica.",
      en: "Daily rate per game. Does not include LCD display or technical standby."
    }
  },
  categories: {
    clasicos: {
      title: { es: "Juegos Clásicos", en: "Classic Games" },
      description: {
        es: "Dinámicas familiares y adictivas adaptadas con tecnología táctil moderna.",
        en: "Addictive, familiar mechanics reimagined with modern touchscreen technology."
      },
      items: [
        {
          id: "memotest",
          title: { es: "Memotest", en: "Memory Match" },
          dailyPrice: 180,
          showcase: true,
          carouselImage: "assets/images/games/memotest.jpg",
          screenshots: ["assets/images/games/memotest-1.jpg"],
          description: {
            es: "Encuentra las parejas de cartas en pantallas táctiles interactivas con branding personalizado.",
            en: "Find matching card pairs on interactive touchscreens with custom company branding."
          },
          tags: {
            es: ["Táctil", "Brandeable", "Rápido"],
            en: ["Touch", "Brandable", "Fast-paced"]
          }
        },
        {
          id: "simon-dice",
          title: { es: "Simón Dice", en: "Simon Says" },
          dailyPrice: 180,
          showcase: true,
          carouselImage: "assets/images/games/simon.jpg",
          screenshots: ["assets/images/games/simon-1.jpg"],
          description: {
            es: "Secuencia de luces y sonidos táctiles donde los participantes ponen a prueba su memoria auditiva y visual.",
            en: "Light and sound sequence challenge testing participants' visual and auditory memory."
          },
          tags: {
            es: ["Luces", "Reflejos", "Sonido"],
            en: ["Lights", "Reflexes", "Sound"]
          }
        },
        {
          id: "trivia",
          title: { es: "Trivia Corporativa", en: "Corporate Trivia" },
          dailyPrice: 200,
          showcase: true,
          carouselImage: "assets/images/games/trivia.jpg",
          screenshots: ["assets/images/games/trivia-1.jpg"],
          description: {
            es: "Preguntas y respuestas personalizables sobre la empresa, cultura o temática del evento.",
            en: "Customizable trivia questions tailored to corporate culture or event themes."
          },
          tags: {
            es: ["Preguntas", "Personalizable", "Educativo"],
            en: ["Trivia", "Customizable", "Educational"]
          }
        }
      ]
    },
    aMedida: {
      title: { es: "Juegos A Medida", en: "Custom Games" },
      description: {
        es: "Desarrollos exclusivos diseñados para activaciones de alto impacto de marcas líderes.",
        en: "Bespoke high-impact developments tailored for leading brand activations."
      },
      items: [
        {
          id: "abb-drones",
          title: { es: "ABB Drones", en: "ABB Drones" },
          dailyPrice: 280,
          showcase: true,
          carouselImage: "assets/images/games/abb-drones.jpg",
          screenshots: ["assets/images/games/abb-drones-1.jpg"],
          description: {
            es: "Simulador interactivo de pilotaje y control tecnológico para stands de innovación.",
            en: "Interactive flight simulation and tech control designed for innovation booths."
          },
          tags: {
            es: ["Simulador", "Tecnología", "ABB"],
            en: ["Simulator", "Tech", "ABB"]
          }
        },
        {
          id: "abb-brazos",
          title: { es: "ABB Brazos Recicladores", en: "ABB Recycling Arms" },
          dailyPrice: 280,
          showcase: true,
          carouselImage: "assets/images/games/abb-brazos.jpg",
          screenshots: ["assets/images/games/abb-brazos-1.jpg"],
          description: {
            es: "Juego de clasificación y robótica sobre sustentabilidad y automatización industrial.",
            en: "Sorting and robotics game centered around sustainability and industrial automation."
          },
          tags: {
            es: ["Robótica", "Sustentabilidad", "Touch"],
            en: ["Robotics", "Sustainability", "Touch"]
          }
        },
        {
          id: "snake-airlines",
          title: { es: "Snake Airlines", en: "Snake Airlines" },
          dailyPrice: 240,
          showcase: true,
          carouselImage: "assets/images/games/snake.jpg",
          screenshots: ["assets/images/games/snake-1.jpg"],
          description: {
            es: "El clásico juego de la serpiente reinventado con aviones, escalas y branding aerocomercial.",
            en: "The classic snake game reinvented with aircraft, flight connections, and airline branding."
          },
          tags: {
            es: ["Arcade", "Dinámico", "Casual"],
            en: ["Arcade", "Dynamic", "Casual"]
          }
        },
        {
          id: "tap-gallery",
          title: { es: "Tap Gallery", en: "Tap Gallery" },
          dailyPrice: 240,
          showcase: true,
          carouselImage: "assets/images/games/tap-gallery.jpg",
          screenshots: ["assets/images/games/tap-gallery-1.jpg"],
          description: {
            es: "Galería de tiro interactiva táctil con ritmo y precisión para activaciones de velocidad.",
            en: "Interactive touchscreen shooting gallery rewarding rhythm, speed, and precision."
          },
          tags: {
            es: ["Velocidad", "Competitivo", "Reflejos"],
            en: ["Speed", "Competitive", "Reflexes"]
          }
        }
      ]
    },
    agregados: {
      title: { es: "Agregados para Juegos", en: "Game Add-Ons" },
      description: {
        es: "Módulos adicionales que potencian la captación de leads, engagement y competencia.",
        en: "Additional modules that boost lead capture, engagement, and competitive excitement."
      },
      items: [
        {
          id: "ranking-live",
          title: { es: "Tabla de Puntuación (Leaderboard)", en: "Live Leaderboard" },
          dailyPrice: 40,
          showcase: true,
          previewImage: "assets/images/addons/ranking.jpg",
          description: {
            es: "Pantalla de ranking en tiempo real proyectable para premiar a los mejores del evento.",
            en: "Real-time leaderboard display ready for projection to reward top performers."
          }
        },
        {
          id: "registro-usuario",
          title: { es: "Registro de Usuario / Captura de Leads", en: "User Registration / Lead Capture" },
          dailyPrice: 50,
          showcase: true,
          previewImage: "assets/images/addons/registro.jpg",
          description: {
            es: "Formulario previo de ingreso (nombre, mail, teléfono) con exportación de base de datos.",
            en: "Pre-game registration form (name, email, phone) with structured database export."
          }
        },
        {
          id: "sorteo-premio",
          title: { es: "Sorteo Automático de Premios", en: "Automated Prize Giveaway" },
          dailyPrice: 40,
          showcase: true,
          previewImage: "assets/images/addons/sorteo.jpg",
          description: {
            es: "Sistema que premia aleatoriamente a jugadores que superen cierta marca de puntos.",
            en: "Automated prize raffle triggered when players reach target score thresholds."
          }
        }
      ]
    },
    herramientas: {
      title: { es: "Herramientas de Evento", en: "Event Tools" },
      description: {
        es: "Módulos independientes para dinamizar escenarios, stands y sorteos corporativos.",
        en: "Standalone digital tools to energize stages, brand booths, and corporate giveaways."
      },
      items: [
        {
          id: "ruleta-digital",
          title: { es: "Ruleta Digital Brandeable", en: "Brandable Digital Roulette" },
          dailyPrice: 150,
          showcase: true,
          previewImage: "assets/images/tools/ruleta.jpg",
          description: {
            es: "Ruleta de la fortuna con probabilidades y gajos 100% configurables para premios directos.",
            en: "Custom prize wheel with configurable slices and odds for direct prize giveaways."
          }
        },
        {
          id: "sorteador-pantalla",
          title: { es: "Sorteador en Pantalla Gigante", en: "Stage Screen Raffle System" },
          dailyPrice: 130,
          showcase: true,
          previewImage: "assets/images/tools/sorteador.jpg",
          description: {
            es: "Animación de sorteo con conteo regresivo y efectos de sonido para escenarios de eventos.",
            en: "Exciting countdown and sound-effect raffle animation tailored for main event stages."
          }
        }
      ]
    },
    campanas: {
      title: { es: "Juegos como Campaña", en: "Games as Campaigns" },
      description: {
        es: "Soluciones lúdicas de mediano y largo plazo orientadas a educación, concientización o publicidad masiva.",
        en: "Medium-to-long term playful solutions for education, awareness, or mass marketing campaigns."
      },
      items: [
        {
          id: "mi-gran-paseo",
          title: { es: "Mi Gran Paseo", en: "Mi Gran Paseo" },
          priceNote: { es: "Precio a convenir", en: "Custom quote on request" },
          showcase: true,
          previewImage: "assets/images/campaigns/mi-gran-paseo.jpg",
          description: {
            es: "Campaña interactiva con enfoque educativo y de concientización, adaptable a programas escolares, sustentabilidad o marketing de impacto social.",
            en: "Interactive campaign combining educational engagement with social awareness, suited for schools, sustainability, and high-impact marketing."
          },
          features: {
            es: ["Multiplataforma (Web & Tablet)", "Métricas de aprendizaje", "Personalización total"],
            en: ["Cross-platform (Web & Tablet)", "Learning metrics", "Total customization"]
          }
        }
      ]
    }
  }
};
```

---

## 6. Implementation Checklist

Future agents should consult this checklist and update the status boxes as features are built and tested.

### Phase 1: Foundation & Data Architecture
- [x] Create comprehensive implementation plan artifact (`gametelier_portfolio_plan.md`)
- [x] Complete alignment on tech stack, quoting math, and Dark Tech-Studio palette
- [x] Create master `AGENTS.md` guide document
- [x] Implement `assets/js/data/catalog.js` with full bilingual data, games, add-ons, and promo rules
- [x] Implement `assets/js/modules/i18n.js` with auto-detection, `localStorage` persistence, and translation helper

### Phase 2: Design System & Styling
- [x] Implement `assets/css/main.css` (Dark Tech-Studio tokens, typography, surfaces, buttons)
- [x] Implement `assets/css/components.css` (Carousels, 4-screenshot grid, cart drawer, badges, modal)
- [x] Implement `assets/css/responsive.css` (Mobile breakpoint `< 768px`, touch carousels, responsive modals)

### Phase 3: Interactive Modules
- [x] Implement `assets/js/modules/carousel.js` (Auto-advance 3.5s, pause on hover, touch swipe support)
- [x] Implement `assets/js/modules/cart.js` (Store, days selector, add-on assignment to game, compound discounts)
- [x] Implement `assets/js/modules/renderer.js` (HTML card builders, carousels, modals, cart item templates)

### Phase 4: Landing Pages Execution
- [x] Implement `index.html` (Showcase Mode: carousels, features, no prices, no cart, no cotizador links)
- [x] Implement `cotizador.html` (Quote Builder Mode: prices, days selector, cart drawer, checkout modal)
- [x] Implement `seccion.html` (Vertical category view with `?tipo=` and `?mode=showcase|cotizador`)
- [x] Implement landing page controller `assets/js/app.js` and vertical view controller `assets/js/seccion.js`

### Phase 5: Checkout & Communication
- [x] Implement checkout modal (Company/Producer name, event date, contact info)
- [x] Implement WhatsApp pre-formatted URL generator
- [x] Implement Mailto URL generator
- [x] Implement Copy to Clipboard summary action

### Phase 6: Verification & QA
- [x] Test price and compound discount calculations in automated Node assertions
- [x] Verify zero cross-linking between `index.html` and `cotizador.html`
- [x] Test bilingual switcher (ES/EN) across all views and dynamic strings
- [x] Test mobile responsiveness, touch swipe on carousels, and GitHub Pages compatibility

### Phase 7: Visual Local Editor & Deploy Companion (EDITOR.md)
- [x] Implement `editor.html` standalone visual interface with Dark Tech-Studio styling
- [x] Implement File System Access API integration (`showDirectoryPicker` & `showOpenFilePicker`)
- [x] Implement form binders for games, add-ons, tools, campaigns, and promo rules
- [x] Implement live quoting & promo calculation simulator inside the editor
- [x] Implement image file picker & drag-and-drop auto-copy into `assets/images/`
- [x] Implement 1-Click `publicar.bat` script in repository root for GitHub Pages

### Phase 8: Editorial Upgrades & Catalog Polish
- [x] Split game catalog editor into two distinct subsections (*Juegos Clásicos* & *Juegos A Medida*) with instant category switcher
- [x] Fix contact button spacing and localization (`contactUs` -> "Contactanos" / "Contact Us")
- [x] Add smart promo tag interpolation (`[days]`, `[games]`, `[discount]`) with bilingual label fields in editor
- [x] Add Studio Logo field and upload support in editor with dynamic renderer integration
- [x] Support multiple games in the Campaigns category across showcase, cotizador, seccion, and editor
- [x] Implement dark holographic blueprint fallback (`assets/images/concept-blueprint.svg`) and `💡 Concepto / En Desarrollo` badge for unimaged prototype games


