/**
 * Corpfolio Studio — Vertical Section Controller (seccion.html)
 */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  let tipo = params.get("tipo") || "clasicos";
  if (tipo === "a-medida") tipo = "aMedida"; // normalize slug

  const mode = params.get("mode") === "cotizador" ? "cotizador" : "showcase";
  const renderer = window.CorpfolioRenderer;
  const cart = window.CorpfolioCart;
  const catalog = window.CORPFOLIO_CATALOG;
  const i18n = window.CorpfolioI18n;

  function fmt(val) {
    if (i18n && typeof i18n.formatPrice === "function") {
      return i18n.formatPrice(val);
    }
    return Math.round(Number(val) || 0).toLocaleString();
  }

  function t(obj) {
    return i18n ? i18n.t(obj) : (obj?.es || obj || "");
  }

  function ui(key) {
    return i18n ? i18n.ui(key) : key;
  }

  function buildPricingHtml(item, isGameCategory, isAddonCategory, isToolCategory, isCampaignCategory) {
    if (mode === "cotizador") {
      if (isGameCategory) {
        const inCart = cart?.hasGame(item.id);
        const currentDays = cart?.getGameDays(item.id) || 1;
        const btnLabel = inCart ? ui("addedToQuote") : (tipo === "aMedida" ? ui("quoteTemplateBtn") : ui("addToQuote"));

        return `
          <div class="vertical-pricing-box">
            <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
              <span class="price-pill" style="font-size: 18px; padding: 6px 14px;">$${fmt(item.dailyPrice)} ${ui("perDay")}</span>
              
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 13px; color: var(--text-muted);">${ui("gameDuration")}</span>
                <div class="days-control">
                  <button type="button" class="days-btn" onclick="updateItemDays('${item.id}', -1)">-</button>
                  <span class="days-display" id="days-display-${item.id}">${currentDays}d</span>
                  <button type="button" class="days-btn" onclick="updateItemDays('${item.id}', 1)">+</button>
                </div>
              </div>
            </div>

            <button type="button" class="btn ${inCart ? 'btn-success' : 'btn-primary'} btn-quote-action" data-game-id="${item.id}">
              ${btnLabel}
            </button>
          </div>
        `;
      } else if (isAddonCategory) {
        const gameOptions = renderer && typeof renderer.buildAddonGameSelectorOptions === "function"
          ? renderer.buildAddonGameSelectorOptions()
          : `<option value="__open_modal__">${ui("openGamePickerOption")}</option>`;
        const priceLabel = Number(item.dailyPrice) === 0
          ? ui("includedZeroCost")
          : `+$${fmt(item.dailyPrice)} ${ui("perDay")}`;

        return `
          <div class="vertical-pricing-box">
            <span class="price-pill" style="font-size: 16px; padding: 6px 14px;">${priceLabel}</span>

            <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
              <label style="font-size: 13px; color: var(--text-secondary);">${ui("assignAddonTo")}</label>
              <select id="select-game-for-${item.id}" data-addon-select="${item.id}" class="form-input" style="padding: 6px 12px; font-size: 13px; min-width: 220px;">
                ${gameOptions}
              </select>

              <button type="button" class="btn btn-primary btn-sm btn-assign-addon" data-addon-id="${item.id}">
                ${ui("assignAddonBtn")}
              </button>
            </div>
          </div>
        `;
      } else if (isToolCategory) {
        return `
          <div class="vertical-pricing-box">
            <span class="price-pill" style="font-size: 18px; padding: 6px 14px;">$${fmt(item.dailyPrice)} ${ui("perDay")}</span>
            <button type="button" class="btn btn-primary btn-sm btn-add-tool-sec" data-tool-id="${item.id}">
              ${ui("addToQuote")}
            </button>
          </div>
        `;
      } else if (isCampaignCategory) {
        return `
          <div class="vertical-pricing-box">
            <span class="price-pill note" style="font-size: 16px; padding: 6px 14px;">${t(item.priceNote)}</span>
            <button type="button" class="btn btn-primary btn-sm" onclick="window.CorpfolioRenderer.openCheckoutModal()">
              ${ui("consultPrice")}
            </button>
          </div>
        `;
      }
    }

    // Showcase Mode: direct contact consultation
    return `
      <div class="vertical-pricing-box">
        <span style="font-size: 13px; color: var(--text-muted);">Disponible para activaciones & eventos B2B</span>
        <a href="https://wa.me/${catalog.studioInfo.whatsapp}?text=Hola,%20me%20interesa%20consultar%20por%20${encodeURIComponent(t(item.title))}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
          💬 Consultar por esta experiencia
        </a>
      </div>
    `;
  }

  /**
   * Renders Streamlined Dual-Pane Card for Custom Game Templates (`aMedida`)
   * LEFT: Implementation Tabs + Screenshot ONLY (no count, no extra text box below image)
   * RIGHT: Title + max 2 header tags, compact Players/Mechanic pills, 1 description, short highlights & Quote bar
   */
  function renderCustomTemplateCard(item, pricingHtml) {
    const headerTags = (t(item.tags) || []).slice(0, 2).map(tag => `<span class="tag-pill">${tag}</span>`).join("");
    const itemFeatures = (t(item.features) || []).map(f => `<li>${f}</li>`).join("");
    const specs = item.templateSpecs || {};

    const impls = Array.isArray(item.implementations) ? item.implementations : [];
    const templateImg = (item.image && item.image.trim() !== "") ? item.image : "assets/images/concept-blueprint.svg";
    const templateIsConcept = item.isConcept || !item.image || !item.image.trim();

    // Tab 0: Base Template
    const templateTabHtml = `
      <button type="button" class="impl-tab-btn active"
        data-role="impl-tab"
        data-tab-type="template"
        data-title="${(t(item.title) || '').replace(/"/g, '&quot;')}"
        data-desc="${(t(item.description) || '').replace(/"/g, '&quot;')}"
        data-img="${templateImg.replace(/"/g, '&quot;')}"
        data-badge="${(ui('baseTemplateBadge') || '⚙️ Mecánica Base').replace(/"/g, '&quot;')}"
        data-concept="${templateIsConcept ? '1' : '0'}">
        ${ui("baseTemplateTab") || "⚙️ Plantilla Base"}
      </button>
    `;

    // Case tabs
    const caseTabsHtml = impls.map((im) => {
      const imImg = (im.image && im.image.trim() !== "") ? im.image : templateImg;
      const imIsConcept = item.isConcept || !imImg || !imImg.trim();
      const imBadge = t(im.client) ? `🏷️ ${t(im.client)}` : `🏷️ ${t(im.title)}`;
      const imDesc = t(im.summary) || t(item.description);
      return `
        <button type="button" class="impl-tab-btn"
          data-role="impl-tab"
          data-tab-type="case"
          data-title="${(t(im.title) || '').replace(/"/g, '&quot;')}"
          data-desc="${(imDesc || '').replace(/"/g, '&quot;')}"
          data-img="${imImg.replace(/"/g, '&quot;')}"
          data-badge="${imBadge.replace(/"/g, '&quot;')}"
          data-concept="${imIsConcept ? '1' : '0'}">
          🏷️ ${t(im.title)}
        </button>
      `;
    }).join("");

    return `
      <article class="custom-template-card" id="${item.id}" data-template-card="${item.id}">
        <!-- LEFT PANE: Implementation Tabs + Screenshot Only -->
        <div class="template-impl-pane">
          <div class="impl-tab-list">
            ${templateTabHtml}
            ${caseTabsHtml}
          </div>

          <div class="impl-preview-frame">
            <span class="slide-client-badge" data-role="impl-client-badge">${ui("baseTemplateBadge") || "⚙️ Mecánica Base"}</span>
            <span class="badge" data-role="impl-concept-badge" style="position: absolute; top: 12px; right: 12px; z-index: 6; background: rgba(6,182,212,0.3); color: #38BDF8; border: 1px solid rgba(6,182,212,0.6); backdrop-filter: blur(8px); ${templateIsConcept ? '' : 'display: none;'}">${ui("conceptBadge")}</span>
            <img src="${templateImg}" data-role="impl-img" alt="${t(item.title)}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/concept-blueprint.svg';" />
          </div>
        </div>

        <!-- RIGHT PANE: Compact Template Specs, 1 Description, Short Highlights & Quoting -->
        <div class="template-spec-pane">
          <div class="vertical-header-row" style="align-items: center;">
            <h2 class="vertical-item-title" data-role="card-title">${t(item.title)}</h2>
            ${headerTags ? `<div style="display: flex; gap: 6px; flex-wrap: wrap;">${headerTags}</div>` : ''}
          </div>

          <div class="b2b-inline-pills">
            ${t(specs.players) ? `<span class="b2b-inline-pill">👥 ${t(specs.players)}</span>` : ''}
            ${t(specs.mechanic) ? `<span class="b2b-inline-pill mechanic">🎹 ${t(specs.mechanic)}</span>` : ''}
          </div>

          <p class="vertical-desc" data-role="card-desc" style="margin-bottom: 14px;">${t(item.description)}</p>

          ${itemFeatures ? `
            <ul class="vertical-features" style="margin-bottom: 16px;">
              ${itemFeatures}
            </ul>
          ` : ''}

          ${pricingHtml}
        </div>
      </article>
    `;
  }

  function renderSection() {
    const category = catalog.categories[tipo] || catalog.categories.clasicos;
    const backUrl = mode === "cotizador" ? "cotizador.html" : "index.html";

    // 1. Navigation Header (with always-visible Back to Catalog button!)
    renderer.renderHeader("header-mount", mode, true);

    // 2. Section Header & Back Link
    const heroEl = document.getElementById("section-hero-mount");
    if (heroEl) {
      heroEl.innerHTML = `
        <div style="margin-bottom: 24px;">
          <a href="${backUrl}" class="section-link" style="font-size: 15px; margin-bottom: 16px; display: inline-flex;">
            ${ui("backToHome")}
          </a>
          <h1 class="hero-title" style="font-size: 38px; text-align: left; margin: 0 0 12px 0;">${t(category.title)}</h1>
          <p class="section-desc" style="font-size: 17px; max-width: 780px;">${t(category.subtitle)}</p>
        </div>
      `;
    }

    // 3. Vertical Items List (filtered by visible !== false)
    const listEl = document.getElementById("section-items-mount");
    if (listEl) {
      const isGameCategory = tipo === "clasicos" || tipo === "aMedida";
      const isAddonCategory = tipo === "agregados";
      const isToolCategory = tipo === "herramientas";
      const isCampaignCategory = tipo === "campanas";

      const visibleItems = (category.items || []).filter(item => item.visible !== false);

      const itemsHtml = visibleItems.map(item => {
        const pricingHtml = buildPricingHtml(item, isGameCategory, isAddonCategory, isToolCategory, isCampaignCategory);

        if (tipo === "aMedida") {
          return renderCustomTemplateCard(item, pricingHtml);
        }

        const headerTags = (t(item.tags) || []).slice(0, 2).map(tag => `<span class="tag-pill">${tag}</span>`).join("");
        const itemFeatures = (t(item.features) || []).map(f => `<li>${f}</li>`).join("");
        const isConcept = item.isConcept || !item.image || !item.image.trim();
        const imgSrc = (!item.image || !item.image.trim()) ? 'assets/images/concept-blueprint.svg' : item.image;

        return `
          <article class="vertical-item-card" id="${item.id}">
            <div class="vertical-media-column" style="position: relative;">
              ${isConcept ? `<span class="badge" style="position: absolute; top: 16px; left: 16px; z-index: 5; background: rgba(6,182,212,0.3); color: #38BDF8; border: 1px solid rgba(6,182,212,0.6); backdrop-filter: blur(8px);">${ui("conceptBadge")}</span>` : ''}
              <img src="${imgSrc}" alt="${t(item.title)}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/concept-blueprint.svg';" />
            </div>

            <div class="vertical-content-column">
              <div class="vertical-header-row" style="align-items: center;">
                <h2 class="vertical-item-title">${t(item.title)}</h2>
                ${headerTags ? `<div style="display: flex; gap: 6px; flex-wrap: wrap;">${headerTags}</div>` : ''}
              </div>

              <p class="vertical-desc" style="margin-bottom: 14px;">${t(item.description)}</p>

              ${itemFeatures ? `
                <ul class="vertical-features" style="margin-bottom: 16px;">
                  ${itemFeatures}
                </ul>
              ` : ''}

              ${pricingHtml}
            </div>
          </article>
        `;
      }).join('');

      listEl.innerHTML = itemsHtml;

      if (mode === "cotizador" && isAddonCategory) {
        renderer.bindAddonAssignControls(listEl);
      }
    }

    // 4. Footer
    renderer.renderFooter("footer-mount");

    // 5. Quoting Drawer (if in cotizador mode)
    if (mode === "cotizador") {
      renderer.renderCartDrawer("cart-mount");
    }

    // Bind item action buttons
    bindSectionEvents();
  }

  function bindSectionEvents() {
    // Bind implementation tabs in Streamlined Custom Game cards
    document.querySelectorAll("[data-template-card]").forEach(card => {
      const imgEl = card.querySelector('[data-role="impl-img"]');
      const titleEl = card.querySelector('[data-role="card-title"]');
      const descEl = card.querySelector('[data-role="card-desc"]');
      const clientBadgeEl = card.querySelector('[data-role="impl-client-badge"]');
      const conceptBadgeEl = card.querySelector('[data-role="impl-concept-badge"]');

      card.querySelectorAll(".impl-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          card.querySelectorAll(".impl-tab-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");

          const title = btn.getAttribute("data-title") || "";
          const desc = btn.getAttribute("data-desc") || "";
          const imBadge = btn.getAttribute("data-badge") || "";
          const imImg = btn.getAttribute("data-img") || "assets/images/concept-blueprint.svg";
          const imConcept = btn.getAttribute("data-concept") === "1";

          if (titleEl && title) titleEl.textContent = title;
          if (descEl && desc) descEl.textContent = desc;
          if (imgEl) imgEl.src = imImg;
          if (clientBadgeEl) clientBadgeEl.textContent = imBadge;
          if (conceptBadgeEl) conceptBadgeEl.style.display = imConcept ? "" : "none";
        });
      });
    });

    // Add/remove game button
    document.querySelectorAll(".btn-quote-action").forEach(btn => {
      btn.addEventListener("click", () => {
        const gameId = btn.getAttribute("data-game-id");
        if (cart) {
          const days = parseInt(document.getElementById(`days-display-${gameId}`)?.textContent) || 1;
          cart.addGame(gameId, days);
          btn.textContent = ui("addedToQuote");
          btn.classList.replace("btn-primary", "btn-success");
        }
      });
    });

    // Add tool button
    document.querySelectorAll(".btn-add-tool-sec").forEach(btn => {
      btn.addEventListener("click", () => {
        const toolId = btn.getAttribute("data-tool-id");
        if (cart) {
          cart.addTool(toolId, 1);
          btn.textContent = ui("addedToQuote");
        }
      });
    });
  }

  // Window helper for days +/- counter
  window.updateItemDays = function (gameId, delta) {
    const display = document.getElementById(`days-display-${gameId}`);
    if (!display) return;
    let current = parseInt(display.textContent) || 1;
    let next = Math.max(1, current + delta);
    display.textContent = `${next}d`;
    if (cart && cart.hasGame(gameId)) {
      cart.updateDays(gameId, next);
    }
  };

  // Initial render
  renderSection();

  // Re-render on language toggle
  window.addEventListener("corpfolio:langchange", () => {
    renderSection();
  });
});
