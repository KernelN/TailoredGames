# EDITOR.md — Gametelier Studio Visual Local Editor

> **Document Purpose**: Technical specification and implementation guide for `editor.html`, the zero-token visual catalog editor for Gametelier Studio.
> Referenced directly by [`AGENTS.md`](file:///d:/Github/Misc/Gametelier-Portfolio/AGENTS.md).

---

## 1. Executive Summary & Design Goals

The **Visual Local Editor** (`editor.html`) is a self-contained, standalone web application located in the repository root. It runs locally in the browser and provides a modern CMS interface to modify all games, prices, promotional rules, descriptions (ES/EN), and image assets **without touching code, configuration files, or managing GitHub Personal Access Tokens (PAT)**.

### Key Capabilities
1. **Zero External Credentials**: No tokens, no OAuth apps, no cloud servers, and no token expiration headaches.
2. **Direct Disk Read & Write**:
   - Uses the modern **File System Access API** (`window.showDirectoryPicker()` / `window.showOpenFilePicker()`).
   - Clicking **"Guardar Cambios"** writes directly to `assets/js/data/catalog.js` on disk.
   - If the user selects the project root folder, dropping a new image automatically copies it into `assets/images/games/` or `assets/images/addons/` and links the relative path automatically.
3. **Graceful Fallbacks**:
   - For browsers without folder access, provides a visual path input with live image preview and a one-click **"Descargar catalog.js"** button.
4. **Live Discount Simulator**:
   - An interactive quoting preview inside the editor where you can test different days and game counts to verify how promotions (50% off 3+ days, 20% off 4+ games) calculate in real time.
5. **1-Click GitHub Deploy Companion**:
   - Includes a lightweight `publicar.bat` script in the repository root for Windows to push saved changes to GitHub Pages in seconds.

---

## 2. File System Access & Data Flow Architecture

```mermaid
flowchart TD
    subgraph Browser ["Local Browser (editor.html)"]
        UI["Visual Editor Dashboard\n(Dark Tech-Studio Theme)"]
        SIM["Live Promo & Quote Simulator"]
        STATE["Editor In-Memory State\n(Cloned from catalog.js)"]
    end

    subgraph Storage ["Local Repository on Disk"]
        ROOT["Gametelier-Portfolio/"]
        CATALOG["assets/js/data/catalog.js"]
        IMG_GAMES["assets/images/games/"]
        IMG_ADDONS["assets/images/addons/"]
        BAT["publicar.bat"]
    end

    subgraph Remote ["GitHub Pages"]
        GH["GitHub Repository\n(main branch)"]
        PAGES["Live Website\n(Showcase & Cotizador)"]
    end

    ROOT -->|window.showDirectoryPicker()| UI
    CATALOG -->|Load Catalog| STATE
    UI -->|Interactive Edits| STATE
    STATE --> SIM
    UI -->|Guardar Cambios| CATALOG
    UI -->|Drag & Drop Images| IMG_GAMES
    UI -->|Drag & Drop Images| IMG_ADDONS
    BAT -->|git commit & push| GH
    GH --> PAGES
```

---

## 3. UI Structure & Tab Breakdown

The editor adheres to the **Dark Tech-Studio** visual design system (`#0B0F19` background, `#111827` cards, `#6366F1` indigo highlights):

### Top Bar
- **Project Folder Indicator**: Shows whether the project directory is linked (`🟢 Conectado: Gametelier-Portfolio` or `🟡 Modo Archivo Individual`).
- **Quick Actions**:
  - `Abrir Carpeta del Proyecto`: Triggers directory picker.
  - `Guardar Cambios`: Writes the current state back to disk with confirmation toast.
  - `Descargar catalog.js`: Manual download fallback.
  - `Ver Sitio Web`: Opens `index.html` or `cotizador.html` in a new tab.

---

### Tab 1: Estudio y Contacto
- **Nombre del Estudio**: Text input (e.g. `Gametelier Studio`).
- **Tagline**: Dual inputs `{ es: "...", en: "..." }`.
- **WhatsApp**: International phone format (e.g. `5491100000000`) with test chat button.
- **Email**: Contact email address (e.g. `contacto@gametelier.com`).

---

### Tab 2: Promociones y Reglas de Descuento
- **Promo Días (3+ días)**:
  - Input: Días mínimos (`3`).
  - Input: Porcentaje de descuento (`50%`).
  - Toggle: Activada / Desactivada.
- **Promo Cantidad de Juegos (4+ juegos)**:
  - Input: Cantidad mínima de juegos (`4`).
  - Input: Porcentaje de descuento (`20%`).
  - Toggle: Activada / Desactivada.
- **Aclaración / Disclaimer**: Dual inputs `{ es: "...", en: "..." }` (*"Precio por día de cada juego. No incluye LCD..."*).
- **Simulador en Vivo**:
  - Lets you select test games and days slider (1 to 10 days).
  - Displays instant calculated Gross, Days Discount (-50%), Games Discount (-20%), and Net Total.

---

### Tab 3: Catálogo de Juegos (Clásicos y A Medida)
- Filter by category (`Todos`, `Clásicos`, `A Medida`).
- **Game Card Editor**:
  - **Identificador (ID)**: Unique slug (e.g., `memotest`).
  - **Título**: `{ es: "Memotest", en: "Memory Match" }`.
  - **Categoría**: Dropdown (`clasicos` / `aMedida`).
  - **Precio Base por Día (USD / ARS)**: Number input (e.g., `180`).
  - **Visibilidad (Showcase)**: Switch toggle (`Visible en Home` / `Oculto`).
  - **Imagen Principal**:
    - Live thumbnail preview.
    - Drag-and-drop zone or file picker to copy image into `assets/images/games/`.
    - Relative path text input (`assets/images/games/memotest.jpg`).
  - **Galería de Screenshots**: Add / remove screenshot paths with thumbnail previews.
  - **Descripción**: Textarea `{ es: "...", en: "..." }`.
  - **Etiquetas (Tags)**: Tag pills editor `{ es: [...], en: [...] }`.
  - **Botones de Acción**: Duplicar juego, Eliminar juego, Subir/Bajar orden.
- **Botón `+ Agregar Nuevo Juego`**: Modal to initialize a new game entry.

---

### Tab 4: Agregados para Juegos (Add-Ons)
- Manages items that attach to games (*Tabla de puntuación*, *Registro de usuario*, *Sorteo de premio*):
  - **Título**: `{ es: "...", en: "..." }`.
  - **Precio Diario del Agregado**: Number input (e.g., `40`).
  - **Descripción**: `{ es: "...", en: "..." }`.
  - **Imagen de Muestra**: Thumbnail and relative path.
  - **Acciones**: Agregar, editar, eliminar.

---

### Tab 5: Herramientas y Campañas
- **Herramientas de Evento**:
  - Ruleta digital, Sorteador de pantalla (título, precio por día, descripción, imagen).
- **Juegos como Campaña**:
  - Mi Gran Paseo:
    - Nota de precio: `{ es: "Precio a convenir", en: "Custom quote on request" }`.
    - Descripción educativa y publicitaria.
    - Lista de características / features `{ es: [...], en: [...] }`.

---

## 4. One-Click Windows Deploy Companion (`publicar.bat`)

To make deploying saved changes effortless without opening terminals or typing git commands, a Windows batch script is provided in the repository root:

```batch
@echo off
title Gametelier Studio - Publicar Cambios a GitHub Pages
color 0B
echo ===================================================
echo     Gametelier Studio - Publicador GitHub Pages
echo ===================================================
echo.

git status --short
echo.
set /p commit_msg="Mensaje del cambio (Enter para 'Actualizar catalogo'): "
if "%commit_msg%"=="" set commit_msg=Actualizar catalogo

echo.
echo [1/3] Preparando archivos...
git add .

echo [2/3] Guardando cambios locales...
git commit -m "%commit_msg%"

echo [3/3] Subiendo a GitHub Pages...
git push origin main

echo.
echo ===================================================
echo   Publicacion completada con exito!
echo   Tu sitio se actualizara en GitHub Pages en breve.
echo ===================================================
echo.
pause
```

---

## 5. Post-Save Git Reminder Modal

Inside `editor.html`, whenever the user clicks **"Guardar Cambios"**:
1. A smooth notification appears: *"Cambios guardados exitosamente en `catalog.js`"*.
2. A subtle action modal or banner offers:
   - **Opción A**: *"Haz doble clic en `publicar.bat` en tu carpeta para subir los cambios a GitHub Pages."*
   - **Opción B**: One-click copy of the Git command: `git commit -am "Actualizar catalogo" && git push`.

---

## 6. Implementation Checklist for Editor

- [ ] Implement `editor.html` standalone interface with Dark Tech-Studio theme
- [ ] Implement File System Access API integration (`showDirectoryPicker` & `showOpenFilePicker`)
- [ ] Implement drag-and-drop image copy handler into `assets/images/`
- [ ] Implement form binders for all catalog sections (Studio, Promos, Games, Addons, Tools, Campaigns)
- [ ] Implement Live Quoting & Promo Simulator widget
- [ ] Implement fallback `Descargar catalog.js` generator
- [ ] Implement `publicar.bat` in the repository root
- [ ] Verify complete roundtrip: Edit in `editor.html` -> Save to disk -> Verify in `index.html` and `cotizador.html`
