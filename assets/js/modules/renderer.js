/**
 * Tailored Games — Renderer Module
 * Generates responsive HTML components for Showcase and Cotizador modes.
 */

window.CorpfolioRenderer = (function () {
  const i18n = () => window.CorpfolioI18n;
  const cart = () => window.CorpfolioCart;
  const catalog = () => window.CORPFOLIO_CATALOG;

  function fmt(val) {
    if (i18n() && typeof i18n().formatPrice === 'function') {
      return i18n().formatPrice(val);
    }
    return Math.round(Number(val) || 0).toLocaleString();
  }

  function t(obj) {
    return i18n() ? i18n().t(obj) : (obj?.es || obj || "");
  }

  function ui(key) {
    return i18n() ? i18n().ui(key) : key;
  }

  function resolveImg(src) {
    if (!src) return "";
    return i18n() && typeof i18n().resolveImage === "function" ? i18n().resolveImage(src) : src;
  }

  /**
   * Checks if an item has at least one valid image (either directly or on one of its implementations)
   */
  function hasValidShowcaseImage(item) {
    if (item.image && String(item.image).trim() !== "") return true;
    if (Array.isArray(item.implementations)) {
      return item.implementations.some(impl => impl && impl.image && String(impl.image).trim() !== "");
    }
    return false;
  }

  /**
   * Filters items eligible for Home Page Showcase
   */
  function filterShowcaseItems(items) {
    if (!Array.isArray(items)) return [];
    return items.filter(item => item.visible !== false && item.showcase !== false && hasValidShowcaseImage(item));
  }

  return {
    hasValidShowcaseImage,

    /**
     * Synchronizes browser tab icon (<link rel="icon">) with studioInfo.favicon
     */
    syncFavicon() {
      if (typeof document === "undefined") return;
      const favSrc = catalog()?.studioInfo?.favicon || "assets/images/logo/logo.svg";
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = favSrc;
      if (favSrc.endsWith(".svg")) {
        link.type = "image/svg+xml";
      } else if (favSrc.endsWith(".png")) {
        link.type = "image/png";
      } else if (favSrc.endsWith(".ico")) {
        link.type = "image/x-icon";
      }
    },

    /**
     * Renders Hero Section with Full-Scale Logo, Mission Title, and Tagline
     */
    renderHero(containerId, activeMode = "showcase") {
      const el = document.getElementById(containerId);
      if (!el) return;

      const studio = catalog()?.studioInfo || {};
      const logoSrc = studio.logo || "assets/images/logo/logo-full-cleanish.png";

      const title = t(studio.heroTitle) || "Juegos a Medida";
      const subtitle = t(studio.heroSubtitle) || "Videojuegos y dinámicas táctiles diseñadas desde cero a tu medida, pensadas para captar la atención de tu público y potenciar tus eventos.";

      if (activeMode === "cotizador") {
        el.innerHTML = `
          <section class="hero-section">
            <div class="hero-logo-wrapper">
              <img src="${logoSrc}" alt="${studio.name || 'Tailored Games'}" class="hero-brand-logo" onerror="this.onerror=null; this.src='assets/images/logo/logo.svg';" />
            </div>
            <div class="hero-badge">${ui("heroBadgeShowcase")}</div>
            <h1 class="hero-title">${title}</h1>
            <p class="hero-subtitle">${subtitle}</p>
            <div style="display: flex; justify-content: center; margin-top: 20px;">
              <div class="hero-quote-pill" style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: var(--radius-full); background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); color: #34D399; font-size: 14px; font-weight: 600; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                ${ui("heroQuotePill")}
              </div>
            </div>
          </section>
        `;
      } else {
        el.innerHTML = `
          <section class="hero-section">
            <div class="hero-logo-wrapper">
              <img src="${logoSrc}" alt="${studio.name || 'Tailored Games'}" class="hero-brand-logo" onerror="this.onerror=null; this.src='assets/images/logo/logo.svg';" />
            </div>
            <div class="hero-badge">${ui("heroBadgeShowcase")}</div>
            <h1 class="hero-title">${title}</h1>
            <p class="hero-subtitle">${subtitle}</p>
          </section>
        `;
      }
    },

    /**
     * Renders Top Navigation Bar with Logo, Optional Sticky Back-to-Catalog Link, and Language Switcher
     */
    renderHeader(containerId, activeMode = "showcase", showBackToCatalog = false) {
      this.syncFavicon();
      const el = document.getElementById(containerId);
      if (!el) return;

      const currentLang = i18n() ? i18n().getLang() : "es";
      const logoSrc = catalog()?.studioInfo?.logo || "assets/images/logo/logo.svg";
      const homeHref = activeMode === 'cotizador' ? 'cotizador.html' : 'index.html';

      el.innerHTML = `
        <header class="site-header">
          <div class="container header-inner">
            <div style="display: flex; align-items: center; gap: 16px;">
              <a href="${homeHref}" class="brand-link" title="${catalog()?.studioInfo?.name || 'Tailored Games'}">
                <img src="${logoSrc}" alt="${catalog()?.studioInfo?.name || 'Tailored Games'}" class="brand-logo" onerror="this.onerror=null; this.src='assets/images/logo/logo.svg';" />
              </a>
              ${showBackToCatalog ? `
                <a href="${homeHref}" class="header-back-link">
                  ${ui("backToHome")}
                </a>
              ` : ''}
            </div>

            <div class="header-actions">
              <!-- Discreet Language Switcher -->
              <div class="lang-switcher">
                <button type="button" class="lang-btn ${currentLang === 'es' ? 'active' : ''}" data-lang="es">ES</button>
                <button type="button" class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
              </div>

              <!-- Quick Contact -->
              <a href="#contacto" class="btn btn-outline btn-sm">${ui("contactUs")}</a>
            </div>
          </div>
        </header>
      `;

      // Bind language switch buttons
      el.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const lang = btn.getAttribute("data-lang");
          if (i18n()) {
            i18n().setLang(lang);
          }
        });
      });
    },

    /**
     * Renders Promotional Banner
     */
    renderPromoBanner(containerId) {
      const el = document.getElementById(containerId);
      if (!el) return;

      const cat = catalog();
      const p = cat?.promotions;
      if (!p) return;

      function formatPromo(rawText, rule) {
        if (!rawText) return "";
        return rawText
          .replace(/\[days\]/g, rule?.minDays != null ? rule.minDays : "")
          .replace(/\[games\]/g, rule?.minGames != null ? rule.minGames : "")
          .replace(/\[discount\]/g, rule?.discountPercent != null ? rule.discountPercent : "");
      }

      const daysLabel = formatPromo(t(p.daysRule?.label), p.daysRule);
      const gamesLabel = formatPromo(t(p.gamesRule?.label), p.gamesRule);

      el.innerHTML = `
        <div class="promo-banner">
          <div class="promo-pills">
            <span class="promo-pill">⚡ ${daysLabel}</span>
            <span class="promo-pill">🎯 ${gamesLabel}</span>
          </div>
          <div class="promo-disclaimer">
            <span>ℹ️ ${t(p.disclaimer)}</span>
          </div>
        </div>
      `;
    },

    /**
     * Renders Split Columns: Clásicos (Left) & A Medida (Right) — Ultra-Clean Carousels
     */
    renderSplitShowcase(containerId, mode = "showcase") {
      const el = document.getElementById(containerId);
      if (!el) return;

      const cat = catalog();
      const clasicos = cat.categories.clasicos;
      const aMedida = cat.categories.aMedida;

      function renderCarousel(category, cardClass) {
        const linkHref = `seccion.html?tipo=${category.id}&mode=${mode}`;
        const isCustomCat = category.id === "aMedida";
        let items = filterShowcaseItems(category.items);
        if (isCustomCat) {
          items = items.filter(game => Array.isArray(game.implementations) && game.implementations.length > 0);
        }

        const slidesHtml = items.map((game) => {
          const impls = Array.isArray(game.implementations) ? game.implementations : [];
          const activeImpl = impls.find(im => im.image && im.image.trim() !== "") || impls[0] || null;
          const rawImg = (activeImpl && activeImpl.image && activeImpl.image.trim() !== "")
            ? activeImpl.image
            : (game.image || "");
          const isConcept = !isCustomCat && (game.isConcept || !rawImg || !rawImg.trim());
          const imgSrc = resolveImg((!rawImg || !rawImg.trim()) ? 'assets/images/concept-blueprint.svg' : rawImg);
          const fallbackSrc = resolveImg('assets/images/concept-blueprint.svg');

          const clientLabel = activeImpl && activeImpl.client ? t(activeImpl.client) : "";
          const slideTitle = (isCustomCat && activeImpl && activeImpl.title) ? t(activeImpl.title) : t(game.title);
          const slideDesc = (isCustomCat && activeImpl && activeImpl.summary) ? t(activeImpl.summary) : t(game.description);
          const customRefUrl = activeImpl
            ? `seccion.html?tipo=a-medida-custom&mode=${mode}&ref=${encodeURIComponent(activeImpl.id)}`
            : `seccion.html?tipo=a-medida-custom&mode=${mode}`;

          const pricePillHtml = mode === 'cotizador'
            ? (isCustomCat
              ? `<span class="price-pill note">${ui("estPerDay")} $${fmt(game.dailyPrice)} ${ui('perDay')}</span>`
              : `<span class="price-pill">$${fmt(game.dailyPrice)} ${ui('perDay')}</span>`)
            : '';

          const actionBtnHtml = isCustomCat
            ? `<a href="${customRefUrl}" class="btn ${mode === 'cotizador' ? 'btn-primary' : 'btn-outline'} btn-sm">${ui("requestSimilar")}</a>`
            : (mode === 'cotizador'
              ? `<button type="button" class="btn ${cart()?.hasGame(game.id) ? 'btn-success' : 'btn-primary'} btn-sm btn-add-game" data-game-id="${game.id}">
                   ${cart()?.hasGame(game.id) ? ui("addedToQuote") : ui("addToQuote")}
                 </button>`
              : '');

          return `
          <div class="carousel-slide" data-game-id="${game.id}">
            <div class="slide-media" style="position: relative;">
              ${clientLabel ? `<span class="slide-client-badge">🏷️ ${clientLabel}</span>` : ''}
              ${isConcept ? `<span class="badge" style="position: absolute; top: 12px; ${clientLabel ? 'right: 12px;' : 'left: 12px;'} z-index: 5; background: rgba(6,182,212,0.3); color: #38BDF8; border: 1px solid rgba(6,182,212,0.6); backdrop-filter: blur(8px);">${ui("conceptBadge")}</span>` : ''}
              <img src="${imgSrc}" alt="${slideTitle}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackSrc}';" />
            </div>
            <div class="slide-info">
              <div class="slide-title-row">
                <h4 class="slide-title">${slideTitle}</h4>
                ${pricePillHtml}
              </div>
              <p class="slide-desc">${slideDesc}</p>

              <div class="slide-actions">
                <a href="${linkHref}#${game.id}" class="section-link">${ui("viewAll")}</a>
                ${actionBtnHtml}
              </div>
            </div>
          </div>
        `;
        }).join('');

        const dotsHtml = items.map((_, idx) => `
          <button type="button" class="carousel-dot ${idx === 0 ? 'active' : ''}" data-slide-index="${idx}" aria-label="Slide ${idx + 1}"></button>
        `).join('');

        const badgeCountText = isCustomCat
          ? `${items.length} ${ui("customCasesCount")}`
          : `${items.length} ${t(category.title)}`;

        const columnFooterHtml = isCustomCat
          ? `
            <div class="showcase-column-footer">
              <a href="seccion.html?tipo=a-medida-custom&mode=${mode}" class="btn btn-outline btn-sm" style="border-color: rgba(6,182,212,0.45); color: #38BDF8;">
                ${ui("requestYours")}
              </a>
              <a href="${linkHref}" class="section-link" style="font-size: 15px;">${ui("viewAll")}</a>
            </div>
          `
          : `
            <div style="margin-top: 16px; text-align: right;">
              <a href="${linkHref}" class="section-link" style="font-size: 15px;">${ui("viewAll")}</a>
            </div>
          `;

        return `
          <div class="showcase-column-card ${cardClass}">
            <div class="column-header">
              <h3>${t(category.title)}</h3>
              <span class="badge">${badgeCountText}</span>
            </div>
            <p class="column-desc">${t(category.subtitle)}</p>

            <div class="carousel-wrapper">
              <div class="carousel-slides">
                ${slidesHtml}
              </div>
            </div>

            <div class="carousel-nav-dots">
              ${dotsHtml}
            </div>

            ${columnFooterHtml}
          </div>
        `;
      }

      el.innerHTML = `
        <div class="split-showcase-grid">
          ${renderCarousel(clasicos, "clasicos")}
          ${renderCarousel(aMedida, "a-medida")}
        </div>
      `;

      // Bind Cotizador add-game buttons
      if (mode === 'cotizador') {
        el.querySelectorAll('.btn-add-game').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            const gameId = btn.getAttribute('data-game-id');
            if (cart()) {
              cart().addGame(gameId, 1);
              btn.textContent = ui("addedToQuote");
              btn.classList.replace('btn-primary', 'btn-success');
            }
          });
        });
      }
    },

    /**
     * Builds the options HTML for inline Add-On Game Selectors (Cotizador Mode)
     * Only shows games currently in the cart + an option to open the Game Picker Popup Modal.
     */
    buildAddonGameSelectorOptions(preferredGameId = "") {
      const cartInst = cart();
      const inCartItems = cartInst?.items || [];

      let html = "";

      if (inCartItems.length > 0) {
        html += `<optgroup label="${ui("gamesInCartGroup")}">`;
        inCartItems.forEach((ci, idx) => {
          const gameObj = cartInst.findGame(ci.gameId);
          if (gameObj) {
            const isSelected = preferredGameId ? (ci.gameId === preferredGameId) : (idx === 0);
            html += `<option value="${ci.gameId}" ${isSelected ? 'selected' : ''}>✓ ${t(gameObj.title)} (${ci.days}d)</option>`;
          }
        });
        html += `</optgroup>`;
        html += `<option value="__open_modal__">${ui("openGamePickerOption")}</option>`;
      } else {
        html += `<option value="__open_modal__" selected>${ui("openGamePickerOption")}</option>`;
      }

      return html;
    },

    /**
     * Opens a searchable Popup Modal to pick a game from the catalog and assign the Add-On
     */
    openAddonGamePickerModal(addonId, triggerBtn = null) {
      const cat = catalog();
      const cartInst = cart();
      const addonObj = cartInst?.findAddon(addonId);
      if (!cat || !addonObj) return;

      let modal = document.getElementById("addon-game-picker-modal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "addon-game-picker-modal";
        modal.className = "modal-overlay";
        document.body.appendChild(modal);
      }

      const renderModalContent = (filterQuery = "") => {
        const q = filterQuery.trim().toLowerCase();
        const clasicos = (cat.categories.clasicos?.items || []).filter(g => g.visible !== false && (!q || t(g.title).toLowerCase().includes(q)));
        const aMedida = (cat.categories.aMedida?.items || []).filter(g => g.visible !== false && (!q || t(g.title).toLowerCase().includes(q)));

        const renderGameRow = (game) => {
          const impls = Array.isArray(game.implementations) ? game.implementations : [];
          const activeImpl = impls.find(im => im.image && im.image.trim() !== "") || impls[0] || null;
          const rawImg = (activeImpl && activeImpl.image && activeImpl.image.trim() !== "") ? activeImpl.image : (game.image || "");
          const fallbackSrc = resolveImg("assets/images/concept-blueprint.svg");
          const imgSrc = resolveImg((!rawImg || !rawImg.trim()) ? "assets/images/concept-blueprint.svg" : rawImg);
          const inCart = cartInst?.hasGame(game.id);

          return `
            <div class="game-picker-item">
              <div class="game-picker-item-left">
                <img src="${imgSrc}" class="game-picker-thumb" alt="${t(game.title)}" onerror="this.onerror=null; this.src='${fallbackSrc}';" />
                <div style="min-width: 0;">
                  <div style="font-size: 14px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${t(game.title)}
                  </div>
                  <div style="font-size: 12px; color: #34D399; font-weight: 600;">
                    $${fmt(game.dailyPrice)} ${ui("perDay")} ${inCart ? `<span style="color: var(--text-accent); margin-left: 6px;">${ui("inYourQuoteTag")}</span>` : ''}
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-primary btn-sm btn-pick-game-assign" data-pick-game-id="${game.id}">
                ${ui("selectAndAssignBtn")}
              </button>
            </div>
          `;
        };

        let listHtml = "";
        if (clasicos.length > 0) {
          listHtml += `<div class="game-picker-cat-header">🕹️ ${t(cat.categories.clasicos.title)}</div>`;
          listHtml += clasicos.map(renderGameRow).join("");
        }
        if (aMedida.length > 0) {
          listHtml += `<div class="game-picker-cat-header">✨ ${t(cat.categories.aMedida.title)}</div>`;
          listHtml += aMedida.map(renderGameRow).join("");
        }
        if (!listHtml) {
          listHtml = `<div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 13px;">${ui("noGamesFound")}</div>`;
        }

        const listContainer = modal.querySelector("#game-picker-list-container");
        if (listContainer) {
          listContainer.innerHTML = listHtml;
          listContainer.querySelectorAll(".btn-pick-game-assign").forEach(btn => {
            btn.addEventListener("click", () => {
              const pickedGameId = btn.getAttribute("data-pick-game-id");
              if (!cartInst.hasGame(pickedGameId)) {
                cartInst.addGame(pickedGameId, 1);
              }
              cartInst.assignAddon(addonId, pickedGameId);

              // Refresh all addon dropdowns and select the newly picked game
              document.querySelectorAll("[data-addon-select]").forEach(sel => {
                sel.innerHTML = this.buildAddonGameSelectorOptions(pickedGameId);
                sel.value = pickedGameId;
              });

              if (triggerBtn) {
                const origText = triggerBtn.textContent;
                triggerBtn.textContent = ui("addedToQuote");
                triggerBtn.classList.replace("btn-primary", "btn-success");
                setTimeout(() => {
                  triggerBtn.textContent = origText;
                  triggerBtn.classList.replace("btn-success", "btn-primary");
                }, 1800);
              }

              modal.classList.remove("active");
            });
          });
        }
      };

      modal.innerHTML = `
        <div class="modal-dialog" style="max-width: 580px;">
          <div class="modal-header">
            <div>
              <h3 style="font-size: 18px; font-weight: 800;">${ui("gamePickerModalTitle")}</h3>
              <p style="font-size: 12px; color: var(--text-accent); margin-top: 2px;">⚡ ${t(addonObj.title)}</p>
            </div>
            <button type="button" class="btn btn-outline btn-sm" id="btn-close-game-picker">✕</button>
          </div>
          <div class="modal-body" style="gap: 12px;">
            <input type="text" id="game-picker-search" class="form-input" placeholder="${ui("gamePickerSearchPlaceholder")}" />
            <div class="game-picker-list" id="game-picker-list-container"></div>
          </div>
        </div>
      `;

      modal.querySelector("#btn-close-game-picker").addEventListener("click", () => {
        modal.classList.remove("active");
      });
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
      });

      const searchInput = modal.querySelector("#game-picker-search");
      searchInput.addEventListener("input", (e) => {
        renderModalContent(e.target.value);
      });

      renderModalContent("");
      modal.classList.add("active");
      setTimeout(() => searchInput.focus(), 80);
    },

    /**
     * Binds Add-On select & button events inside a container (used by both Home Page and seccion.html)
     */
    bindAddonAssignControls(containerEl) {
      if (!containerEl) return;

      // When user chooses "➕ Agregar nuevo juego del catálogo..." in the dropdown, open the modal immediately
      containerEl.querySelectorAll("[data-addon-select]").forEach(select => {
        select.addEventListener("change", () => {
          const addonId = select.getAttribute("data-addon-select");
          if (select.value === "__open_modal__") {
            const btn = containerEl.querySelector(`[data-addon-id="${addonId}"]`);
            this.openAddonGamePickerModal(addonId, btn);
            // Reset select to first cart game if one exists
            const firstCartGame = cart()?.items?.[0]?.gameId;
            if (firstCartGame) select.value = firstCartGame;
          }
        });
      });

      // When user clicks "+ Asignar" button
      containerEl.querySelectorAll(".btn-inline-assign-addon, .btn-assign-addon").forEach(btn => {
        btn.addEventListener("click", () => {
          const addonId = btn.getAttribute("data-addon-id");
          const select = containerEl.querySelector(`[data-addon-select="${addonId}"]`);
          const selectedVal = select?.value;

          if (!selectedVal || selectedVal === "__open_modal__") {
            this.openAddonGamePickerModal(addonId, btn);
            return;
          }

          if (cart()?.assignAddon(addonId, selectedVal)) {
            const origText = btn.textContent;
            btn.textContent = ui("addedToQuote");
            btn.classList.replace("btn-primary", "btn-success");
            setTimeout(() => {
              btn.textContent = origText;
              btn.classList.replace("btn-success", "btn-primary");
            }, 1800);
          }
        });
      });

      // Keep game dropdowns in sync when cart changes
      if (!this._boundAddonCartSync) {
        this._boundAddonCartSync = true;
        window.addEventListener("corpfolio:cartchange", () => {
          document.querySelectorAll("[data-addon-select]").forEach(sel => {
            const prev = sel.value;
            sel.innerHTML = this.buildAddonGameSelectorOptions(prev !== "__open_modal__" ? prev : "");
          });
        });
      }
    },

    /**
     * Renders Agregados (Showcase Grid + Direct Add-to-Game in Cotizador Mode)
     */
    renderAddonsShowcase(containerId, mode = "showcase") {
      const el = document.getElementById(containerId);
      if (!el) return;

      const cat = catalog();
      const agregados = cat.categories.agregados;
      const linkHref = `seccion.html?tipo=agregados&mode=${mode}`;
      const visibleAddons = filterShowcaseItems(agregados.items);

      const gameOptionsHtml = mode === 'cotizador' ? this.buildAddonGameSelectorOptions() : '';

      const itemsHtml = visibleAddons.map(addon => {
        const priceLabel = Number(addon.dailyPrice) === 0
          ? ui("includedZeroCost")
          : `+$${fmt(addon.dailyPrice)} ${ui('perDay')}`;

        const fallbackSrc = resolveImg("assets/images/concept-blueprint.svg");
        const addonImg = resolveImg(addon.image || "assets/images/concept-blueprint.svg");

        return `
        <div class="addon-card" data-addon-id="${addon.id}">
          <div class="addon-thumb">
            <img src="${addonImg}" alt="${t(addon.title)}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackSrc}';" />
          </div>
          <div class="addon-body">
            <div class="addon-title-row">
              <h4 class="addon-title">${t(addon.title)}</h4>
              ${mode === 'cotizador' ? `<span class="price-pill">${priceLabel}</span>` : ''}
            </div>
            <p class="addon-desc">${t(addon.description)}</p>
            <a href="${linkHref}#${addon.id}" class="section-link">${ui("viewAll")}</a>

            ${mode === 'cotizador' ? `
              <div class="addon-inline-assign">
                <label style="font-size: 11px; font-weight: 700; color: var(--text-muted);">${ui("assignAddonTo")}</label>
                <div class="addon-inline-controls">
                  <select class="form-input addon-game-select" data-addon-select="${addon.id}">
                    ${gameOptionsHtml}
                  </select>
                  <button type="button" class="btn btn-primary btn-sm btn-inline-assign-addon" data-addon-id="${addon.id}">
                    ${ui("assignAddonBtn")}
                  </button>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
      }).join('');

      el.innerHTML = `
        <div class="addons-section">
          <div class="addons-showcase-box">
            <div class="section-header-row">
              <div>
                <h3 class="section-title">${t(agregados.title)}</h3>
                <p class="section-desc">${t(agregados.subtitle)}</p>
              </div>
              <a href="${linkHref}" class="section-link">${ui("viewAll")}</a>
            </div>

            <div class="addons-grid-4">
              ${itemsHtml}
            </div>
          </div>
        </div>
      `;

      if (mode === 'cotizador') {
        this.bindAddonAssignControls(el);
      }
    },

    /**
     * Renders Herramientas (Ruleta, Sorteador)
     */
    renderToolsShowcase(containerId, mode = "showcase") {
      const el = document.getElementById(containerId);
      if (!el) return;

      const cat = catalog();
      const herramientas = cat.categories.herramientas;
      const linkHref = `seccion.html?tipo=herramientas&mode=${mode}`;
      const visibleTools = filterShowcaseItems(herramientas.items);

      const fallbackSrc = resolveImg("assets/images/concept-blueprint.svg");
      const cardsHtml = visibleTools.map(tool => `
        <div class="tool-card">
          <div class="tool-media">
            <img src="${resolveImg(tool.image || 'assets/images/concept-blueprint.svg')}" alt="${t(tool.title)}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackSrc}';" />
          </div>
          <div class="tool-body">
            <div class="slide-title-row">
              <h4 class="slide-title">${t(tool.title)}</h4>
              ${mode === 'cotizador' ? `<span class="price-pill">$${fmt(tool.dailyPrice)} ${ui('perDay')}</span>` : ''}
            </div>
            <p class="slide-desc">${t(tool.description)}</p>
            <div class="slide-actions">
              <a href="${linkHref}#${tool.id}" class="section-link">${ui("viewAll")}</a>
              ${mode === 'cotizador' ? `
                <button type="button" class="btn btn-outline btn-sm btn-add-tool" data-tool-id="${tool.id}">
                  ${ui("addToQuote")}
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `).join('');

      el.innerHTML = `
        <div style="margin-bottom: 56px;">
          <div class="section-header-row">
            <div>
              <h3 class="section-title">${t(herramientas.title)}</h3>
              <p class="section-desc">${t(herramientas.subtitle)}</p>
            </div>
            <a href="${linkHref}" class="section-link">${ui("viewAll")}</a>
          </div>

          <div class="tools-grid">
            ${cardsHtml}
          </div>
        </div>
      `;

      if (mode === 'cotizador') {
        el.querySelectorAll('.btn-add-tool').forEach(btn => {
          btn.addEventListener('click', () => {
            const toolId = btn.getAttribute('data-tool-id');
            cart()?.addTool(toolId, 1);
            btn.textContent = ui("addedToQuote");
          });
        });
      }
    },

    /**
     * Renders Juegos de Largo Alcance / Campañas (Multiple Games Supported)
     */
    renderCampaignShowcase(containerId, mode = "showcase") {
      const el = document.getElementById(containerId);
      if (!el) return;

      const cat = catalog();
      const campanas = cat.categories.campanas;
      const items = filterShowcaseItems(campanas?.items || []);
      if (items.length === 0) return;

      const linkHref = `seccion.html?tipo=campanas&mode=${mode}`;
      const briefHref = `seccion.html?tipo=campanas-custom&mode=${mode}`;

      const fallbackSrc = resolveImg("assets/images/concept-blueprint.svg");
      const cardsHtml = items.map(campaign => {
        const isConcept = campaign.isConcept || !campaign.image || !campaign.image.trim();
        const imgSrc = resolveImg(isConcept ? 'assets/images/concept-blueprint.svg' : campaign.image);
        const features = (t(campaign.features) || []).map(f => `<li>✓ ${f}</li>`).join('');
        const refBriefHref = `${briefHref}&ref=${encodeURIComponent(campaign.id)}`;

        return `
          <div class="campaign-card" style="margin-bottom: 24px;">
            <div class="campaign-info">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
                <span class="campaign-badge">🌟 ${t(campanas.title)}</span>
                ${isConcept ? `<span class="badge" style="background: rgba(6,182,212,0.25); color: #38BDF8; border: 1px solid rgba(6,182,212,0.5);">${ui("conceptBadge")}</span>` : ''}
              </div>
              <h3 class="section-title" style="font-size: 24px;">${t(campaign.title)}</h3>
              <p class="slide-desc" style="-webkit-line-clamp: 3; margin-bottom: 14px;">${t(campaign.description)}</p>
              
              ${features ? `<ul style="list-style: none; font-size: 13px; color: var(--text-secondary); margin-bottom: 16px; display: flex; flex-direction: column; gap: 4px;">${features}</ul>` : ''}

              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-top: auto;">
                ${mode === "cotizador" ? `<span class="price-pill note">${t(campaign.priceNote)}</span>` : `<span></span>`}
                <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                  <a href="${linkHref}#${campaign.id}" class="btn btn-outline btn-sm">${ui("viewAll")}</a>
                  <a href="${refBriefHref}" class="btn btn-primary btn-sm">✨ ${ui("requestSimilar")}</a>
                </div>
              </div>
            </div>

            <div class="campaign-media" style="position: relative;">
              <img src="${imgSrc}" alt="${t(campaign.title)}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackSrc}';" />
            </div>
          </div>
        `;
      }).join('');

      el.innerHTML = `
        <div style="margin-bottom: 56px;">
          <div class="section-header-row">
            <div>
              <h3 class="section-title">${t(campanas.title)}</h3>
              <p class="section-desc">${t(campanas.subtitle)}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
              <a href="${briefHref}" class="btn btn-outline btn-sm" style="border-color: rgba(6,182,212,0.45); color: #38BDF8;">
                ${ui("requestCampaignYours")}
              </a>
              <a href="${linkHref}" class="section-link">${ui("viewAll")}</a>
            </div>
          </div>

          <div class="campaigns-showcase-list">
            ${cardsHtml}
          </div>
        </div>
      `;
    },

    /**
     * Renders Studio Contact Footer
     */
    renderFooter(containerId) {
      const el = document.getElementById(containerId);
      if (!el) return;

      const cat = catalog();
      const studio = cat?.studioInfo;
      const logoSrc = studio?.logo || "assets/images/logo/logo.svg";

      el.innerHTML = `
        <footer class="site-footer" id="contacto">
          <div class="container">
            <div class="footer-content">
              <div class="footer-brand">
                <img src="${logoSrc}" alt="${studio?.name || 'Tailored Games'}" style="height: 36px;" onerror="this.onerror=null; this.src='assets/images/logo/logo.svg';" />
                <p>${t(studio?.tagline)}</p>
              </div>

              <div class="footer-actions">
                <a href="https://wa.me/${studio?.whatsapp}" target="_blank" rel="noopener" class="btn btn-success">
                  💬 ${ui("directWhatsApp")}
                </a>
                <a href="mailto:${studio?.email}" class="btn btn-outline">
                  ✉️ ${studio?.email}
                </a>
              </div>
            </div>

            <div class="footer-bottom">
              <span>© ${new Date().getFullYear()} ${studio?.name}. ${ui("allRightsReserved")}</span>
              <span>${ui("footerTaglineRight")}</span>
            </div>
          </div>
        </footer>
      `;
    },

    /**
     * Renders Floating Cart Bar & Slide-out Drawer (Cotizador Mode Only)
     */
    renderCartDrawer(containerId) {
      const el = document.getElementById(containerId);
      if (!el) return;

      el.innerHTML = `
        <!-- Floating Bottom Bar -->
        <div class="cart-floating-bar" id="cart-floating-bar" style="display: none;">
          <div class="cart-bar-left">
            <span class="cart-count-badge" id="cart-bar-count">0</span>
            <span style="font-weight: 700; font-size: 14px;">${ui("cartTitle")}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <span class="cart-bar-total" id="cart-bar-total">$0</span>
            <button type="button" class="btn btn-primary btn-sm" id="btn-open-cart">${ui("checkoutBtn")}</button>
          </div>
        </div>

        <!-- Drawer Overlay -->
        <div class="cart-drawer-overlay" id="cart-drawer-overlay"></div>

        <!-- Right Side Drawer -->
        <aside class="cart-drawer" id="cart-drawer">
          <div class="cart-drawer-header">
            <h3 style="font-size: 20px; font-weight: 800;">${ui("cartTitle")}</h3>
            <button type="button" class="btn btn-outline btn-sm" id="btn-close-cart">${ui("close")} ✕</button>
          </div>

          <div class="cart-drawer-items" id="cart-drawer-items">
            <!-- Rendered dynamically -->
          </div>

          <div class="cart-drawer-footer" id="cart-drawer-footer">
            <!-- Rendered dynamically -->
          </div>
        </aside>
      `;

      // Bind drawer toggle events
      const bar = document.getElementById("cart-floating-bar");
      const overlay = document.getElementById("cart-drawer-overlay");
      const drawer = document.getElementById("cart-drawer");
      const btnOpen = document.getElementById("btn-open-cart");
      const btnClose = document.getElementById("btn-close-cart");

      function openDrawer() {
        overlay.classList.add("active");
        drawer.classList.add("active");
      }

      function closeDrawer() {
        overlay.classList.remove("active");
        drawer.classList.remove("active");
      }

      bar.addEventListener("click", (e) => {
        if (!e.target.closest("#btn-open-cart")) openDrawer();
      });
      btnOpen.addEventListener("click", openDrawer);
      btnClose.addEventListener("click", closeDrawer);
      overlay.addEventListener("click", closeDrawer);

      // Listen to cart changes
      window.addEventListener("corpfolio:cartchange", () => {
        this.updateCartUI();
      });

      this.updateCartUI();
    },

    /**
     * Updates Cart Drawer Content & Floating Bar
     */
    updateCartUI() {
      const bar = document.getElementById("cart-floating-bar");
      const barCount = document.getElementById("cart-bar-count");
      const barTotal = document.getElementById("cart-bar-total");
      const itemsContainer = document.getElementById("cart-drawer-items");
      const footerContainer = document.getElementById("cart-drawer-footer");

      if (!bar || !cart()) return;

      const summary = cart().getSummary();

      if (summary.totalItemsCount === 0 && !summary.campaignInquiry) {
        bar.style.display = "none";
        if (itemsContainer) {
          itemsContainer.innerHTML = `
            <div style="text-align: center; padding: 48px 16px; color: var(--text-muted);">
              <span style="font-size: 40px; display: block; margin-bottom: 12px;">🎮</span>
              <h4 style="color: var(--text-primary); margin-bottom: 8px;">${ui("emptyCartTitle")}</h4>
              <p style="font-size: 13px; line-height: 1.5;">${ui("emptyCartSubtitle")}</p>
            </div>
          `;
        }
        if (footerContainer) footerContainer.innerHTML = "";
        return;
      }

      // Show floating bar
      bar.style.display = "flex";
      barCount.textContent = summary.totalItemsCount;
      barTotal.textContent = `$${fmt(summary.finalTotal)}`;

      // Render Items in Drawer
      if (itemsContainer) {
        let itemsHtml = "";

        summary.gameLines.forEach(game => {
          itemsHtml += `
            <div class="cart-item-card">
              <div class="cart-item-row">
                <span style="font-weight: 700; font-size: 15px;">${t(game.title)}</span>
                <span style="font-weight: 800; color: #34D399;">$${fmt(game.subtotal)}</span>
              </div>
              <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">
                $${fmt(game.dailyRate)} ${ui("perDay")}
              </div>

              ${game.addons.length > 0 ? `
                <div class="cart-item-addons-list">
                  ${game.addons.map(a => `
                    <div style="display: flex; justify-content: space-between;">
                      <span>+ ${t(a.title)}</span>
                      <span>+$${fmt(a.dailyPrice)}/d</span>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                <div class="days-control">
                  <button type="button" class="days-btn" onclick="window.CorpfolioCart.updateDays('${game.gameId}', ${game.days - 1})">-</button>
                  <span class="days-display">${game.days}d</span>
                  <button type="button" class="days-btn" onclick="window.CorpfolioCart.updateDays('${game.gameId}', ${game.days + 1})">+</button>
                </div>
                <button type="button" class="btn btn-outline btn-sm" style="color: var(--accent-rose); border-color: rgba(244,63,94,0.3);" onclick="window.CorpfolioCart.removeGame('${game.gameId}')">
                  ${ui("remove")}
                </button>
              </div>
            </div>
          `;
        });

        summary.toolLines.forEach(tool => {
          itemsHtml += `
            <div class="cart-item-card">
              <div class="cart-item-row">
                <span style="font-weight: 700; font-size: 15px;">${t(tool.title)}</span>
                <span style="font-weight: 800; color: #34D399;">$${fmt(tool.subtotal)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                <div class="days-control">
                  <button type="button" class="days-btn" onclick="window.CorpfolioCart.addTool('${tool.toolId}', ${tool.days - 1})">-</button>
                  <span class="days-display">${tool.days}d</span>
                  <button type="button" class="days-btn" onclick="window.CorpfolioCart.addTool('${tool.toolId}', ${tool.days + 1})">+</button>
                </div>
                <button type="button" class="btn btn-outline btn-sm" style="color: var(--accent-rose); border-color: rgba(244,63,94,0.3);" onclick="window.CorpfolioCart.removeTool('${tool.toolId}')">
                  ${ui("remove")}
                </button>
              </div>
            </div>
          `;
        });

        itemsContainer.innerHTML = itemsHtml;
      }

      // Render Footer Breakdown
      if (footerContainer) {
        footerContainer.innerHTML = `
          <div class="cart-breakdown-row">
            <span>${ui("grossTotal")}</span>
            <span>$${fmt(summary.grossTotal)}</span>
          </div>

          ${summary.qualifiesDaysPromo ? `
            <div class="cart-breakdown-row discount">
              <span>✓ ${ui("promoDaysCartLabel")}</span>
              <span>-$${fmt(summary.daysDiscount)}</span>
            </div>
          ` : ''}

          ${summary.qualifiesGamesPromo ? `
            <div class="cart-breakdown-row discount">
              <span>✓ ${ui("promoGamesCartLabel")}</span>
              <span>-$${fmt(summary.gamesDiscount)}</span>
            </div>
          ` : ''}

          <div class="cart-breakdown-row total">
            <span>${ui("finalTotal")}</span>
            <span style="color: #34D399;">$${fmt(summary.finalTotal)}</span>
          </div>

          <button type="button" class="btn btn-primary" style="width: 100%; margin-top: 16px;" onclick="window.CorpfolioRenderer.openCheckoutModal()">
            ${ui("checkoutBtn")} →
          </button>
        `;
      }
    },

    /**
     * Renders and opens the Checkout Modal (Company, Date, Contact)
     */
    openCheckoutModal() {
      let modal = document.getElementById("checkout-modal");
      if (!modal) {
        const modalWrap = document.createElement("div");
        modalWrap.id = "checkout-modal";
        modalWrap.className = "modal-overlay";
        modalWrap.innerHTML = `
          <div class="modal-dialog">
            <div class="modal-header">
              <h3 style="font-size: 18px; font-weight: 800;">${ui("modalTitle")}</h3>
              <button type="button" class="btn btn-outline btn-sm" id="btn-close-modal">✕</button>
            </div>

            <div class="modal-body">
              <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">${ui("modalSubtitle")}</p>

              <div class="form-group">
                <label class="form-label">${ui("companyNameLabel")}</label>
                <input type="text" id="modal-company" class="form-input" placeholder="${ui("companyNamePlaceholder")}" />
              </div>

              <div class="form-group">
                <label class="form-label">${ui("eventDateLabel")}</label>
                <input type="date" id="modal-date" class="form-input" />
              </div>

              <div class="form-group">
                <label class="form-label">${ui("contactNameLabel")}</label>
                <input type="text" id="modal-contact" class="form-input" placeholder="${ui("contactNamePlaceholder")}" />
              </div>

              <div class="form-group">
                <label class="form-label">${ui("contactInfoLabel")}</label>
                <input type="text" id="modal-info" class="form-input" placeholder="${ui("contactInfoPlaceholder")}" />
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-success" id="btn-send-whatsapp">
                💬 ${ui("contactWhatsApp")}
              </button>
              <button type="button" class="btn btn-primary" id="btn-send-email">
                ✉️ ${ui("contactEmail")}
              </button>
              <button type="button" class="btn btn-outline" id="btn-copy-summary">
                📋 ${ui("copySummary")}
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(modalWrap);
        modal = modalWrap;

        // Bind Actions
        modal.querySelector("#btn-close-modal").addEventListener("click", () => {
          modal.classList.remove("active");
        });
        modal.addEventListener("click", (e) => {
          if (e.target === modal) modal.classList.remove("active");
        });

        const getInfo = () => ({
          companyName: document.getElementById("modal-company").value.trim(),
          eventDate: document.getElementById("modal-date").value,
          contactName: document.getElementById("modal-contact").value.trim(),
          contactInfo: document.getElementById("modal-info").value.trim()
        });

        modal.querySelector("#btn-send-whatsapp").addEventListener("click", () => {
          const url = cart()?.generateWhatsAppUrl(getInfo());
          if (url) window.open(url, "_blank");
        });

        modal.querySelector("#btn-send-email").addEventListener("click", () => {
          const url = cart()?.generateMailtoUrl(getInfo());
          if (url) window.location.href = url;
        });

        modal.querySelector("#btn-copy-summary").addEventListener("click", (e) => {
          const text = cart()?.generateTextSummary(getInfo());
          if (text) {
            navigator.clipboard.writeText(text).then(() => {
              const btn = e.target;
              const prev = btn.textContent;
              btn.textContent = ui("copied");
              setTimeout(() => { btn.textContent = prev; }, 2500);
            });
          }
        });
      }

      modal.classList.add("active");
    }
  };
})();
