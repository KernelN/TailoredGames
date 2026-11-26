/**
 * Tailored Games — Vertical Section & Custom Brief Controller (seccion.html)
 */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  let tipo = params.get("tipo") || "clasicos";
  if (tipo === "a-medida") tipo = "aMedida";
  if (tipo === "a-medida-custom" || tipo === "pedi-el-tuyo") tipo = "aMedidaCustom";
  if (tipo === "campanas-custom" || tipo === "largo-alcance-custom") tipo = "campanasCustom";

  const refParam = params.get("ref") || "";
  const mode = params.get("mode") === "cotizador" ? "cotizador" : "showcase";
  const renderer = window.CorpfolioRenderer;
  const cart = window.CorpfolioCart;
  const catalog = window.CORPFOLIO_CATALOG;
  const i18n = window.CorpfolioI18n;

  // Preserve brief inputs across language switches
  const briefState = {
    idea: "",
    company: "",
    theme: "",
    date: "",
    selectedPills: {} // { [groupId]: Set<number> }
  };

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

  function resolveImg(src) {
    if (!src) return "";
    return i18n && typeof i18n.resolveImage === "function" ? i18n.resolveImage(src) : src;
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function interpolateCase(text, caseName) {
    return String(text || "").replace(/\[case\]/g, caseName || "");
  }

  function normalizeBriefConfig(rawCfg, defaults) {
    const cfg = rawCfg || {};
    return {
      bannerTitle: cfg.bannerTitle || defaults.bannerTitle,
      bannerSubtitle: cfg.bannerSubtitle || defaults.bannerSubtitle,
      bannerCta: cfg.bannerCta || defaults.bannerCta,
      pageTitle: cfg.pageTitle || defaults.pageTitle,
      pageSubtitle: cfg.pageSubtitle || defaults.pageSubtitle,
      inspiredHeroPrefix: cfg.inspiredHeroPrefix || defaults.inspiredHeroPrefix,
      inspiredHeroSubtitle: cfg.inspiredHeroSubtitle || defaults.inspiredHeroSubtitle,
      defaultIdeaLabel: cfg.defaultIdeaLabel || defaults.defaultIdeaLabel,
      defaultIdeaPlaceholder: cfg.defaultIdeaPlaceholder || defaults.defaultIdeaPlaceholder,
      inspiredIdeaLabel: cfg.inspiredIdeaLabel || defaults.inspiredIdeaLabel,
      inspiredIdeaPlaceholder: cfg.inspiredIdeaPlaceholder || defaults.inspiredIdeaPlaceholder,
      fields: cfg.fields || defaults.fields,
      guidelines: Array.isArray(cfg.guidelines) ? cfg.guidelines : [],
      pillGroups: Array.isArray(cfg.pillGroups) ? cfg.pillGroups : [],
      mechanicsSectionTitle: cfg.mechanicsSectionTitle || defaults.mechanicsSectionTitle,
      mechanicsSectionSubtitleShowcase: cfg.mechanicsSectionSubtitleShowcase || defaults.mechanicsSectionSubtitleShowcase,
      mechanicsSectionSubtitleCotizador: cfg.mechanicsSectionSubtitleCotizador || defaults.mechanicsSectionSubtitleCotizador,
      scenariosSectionTitle: cfg.scenariosSectionTitle || defaults.scenariosSectionTitle,
      scenariosSectionSubtitle: cfg.scenariosSectionSubtitle || defaults.scenariosSectionSubtitle,
      scenarios: Array.isArray(cfg.scenarios) ? cfg.scenarios : []
    };
  }

  function getBriefConfig() {
    return normalizeBriefConfig(catalog?.customBriefConfig, {
      bannerTitle: { es: "¡Pedí el tuyo!", en: "Request Your Custom Game!" },
      bannerSubtitle: {
        es: "Diseñamos videojuegos y dinámicas táctiles desde cero para tu marca, temática y público.",
        en: "We design interactive touch games from scratch tailored to your brand, theme, and audience."
      },
      bannerCta: { es: "Armar mi brief / Ver ideas →", en: "Start my brief / See ideas →" },
      pageTitle: { es: "Pedí tu Juego a Medida", en: "Request Your Custom Game" },
      pageSubtitle: {
        es: "Completá los puntos que ya tengas definidos (ningún campo es obligatorio) para enviarnos tu consulta en 1 clic.",
        en: "Fill in whatever details you already have (all fields are optional) to send your inquiry in 1 click."
      },
      inspiredHeroPrefix: {
        es: "Quiero una experiencia inspirada en [case]...",
        en: "I'd like an experience inspired by [case]..."
      },
      inspiredHeroSubtitle: {
        es: "Tomamos la dinámica probada de [case] y la adaptamos 100% a tu marca, estética y objetivos del evento.",
        en: "We take the proven core loop of [case] and tailor it 100% to your brand, visuals, and event goals."
      },
      defaultIdeaLabel: {
        es: "¿Tenés una idea en mente? (Opcional)",
        en: "Do you have a specific idea in mind? (Optional)"
      },
      defaultIdeaPlaceholder: {
        es: "Contanos brevemente qué imaginás...",
        en: "Briefly describe what you envision..."
      },
      inspiredIdeaLabel: {
        es: "¿Qué te gustaría adaptar, sumar o cambiar respecto a [case]?",
        en: "What would you like to adapt, add, or change from [case]?"
      },
      inspiredIdeaPlaceholder: {
        es: "Ej: Me encantó la dinámica, pero ambientada en nuestra industria...",
        en: "e.g. Loved the mechanic, but themed around our industry..."
      },
      fields: {
        companyLabel: { es: "Empresa / Rubro", en: "Company / Industry" },
        companyPlaceholder: { es: "Ej: Fintech, Automotriz, Productora...", en: "e.g. Fintech, Automotive, Agency..." },
        themeLabel: { es: "Temática del Evento", en: "Event Theme" },
        themePlaceholder: { es: "Ej: Sustentabilidad, Lanzamiento...", en: "e.g. Sustainability, Launch..." },
        dateLabel: { es: "Fecha tentativa y duración", en: "Tentative Date & Duration" },
        datePlaceholder: { es: "Ej: Noviembre 2026, 2 días", en: "e.g. November 2026, 2 days" }
      },
      mechanicsSectionTitle: { es: "Mecánicas Base e Ideas de Referencia", en: "Base Mechanics & Reference Ideas" },
      mechanicsSectionSubtitleShowcase: {
        es: "¿Buscás inspiración? Explorá estas mecánicas probadas como punto de partida.",
        en: "Looking for inspiration? Explore these proven mechanics as a starting point."
      },
      mechanicsSectionSubtitleCotizador: {
        es: "Explorá estas mecánicas para inspirarte, ver valores estimados por día y sumarlas a tu cotización.",
        en: "Explore these mechanics for inspiration, see estimated daily rates, and add them to your quote."
      }
    });
  }

  function getCampaignBriefConfig() {
    return normalizeBriefConfig(catalog?.campaignBriefConfig, {
      bannerTitle: { es: "¡Creá tu Juego de Largo Alcance!", en: "Build Your Long-Term Game!" },
      bannerSubtitle: {
        es: "Desarrollamos experiencias interactivas de duración extendida para servidores internos de tu empresa o campañas web públicas.",
        en: "We build extended-duration interactive experiences for your company servers or public web campaigns."
      },
      bannerCta: { es: "Armar mi brief / Ver formatos →", en: "Start my brief / See formats →" },
      pageTitle: { es: "Pedí tu Juego de Largo Alcance", en: "Request Your Long-Term Game" },
      pageSubtitle: {
        es: "Completá los datos que ya tengas (todos los campos son opcionales) para enviarnos tu consulta en 1 clic.",
        en: "Fill in whatever details you already have (all fields are optional) to send your inquiry in 1 click."
      },
      inspiredHeroPrefix: {
        es: "Quiero un proyecto inspirado en [case]...",
        en: "I'd like a project inspired by [case]..."
      },
      inspiredHeroSubtitle: {
        es: "Tomamos la profundidad y dinámica de [case] y la diseñamos a medida para tu empresa, campaña o programa educativo.",
        en: "We take the depth and core loop of [case] and tailor it from scratch for your company, campaign, or educational program."
      },
      defaultIdeaLabel: {
        es: "¿Tenés un proyecto o idea en mente? (Opcional)",
        en: "Do you have a project or idea in mind? (Optional)"
      },
      defaultIdeaPlaceholder: {
        es: "Contanos brevemente qué querés lograr o qué contenido querés gamificar...",
        en: "Briefly describe what you want to achieve or gamify..."
      },
      inspiredIdeaLabel: {
        es: "¿Qué te gustaría adaptar, sumar o cambiar respecto a [case]?",
        en: "What would you like to adapt, add, or change from [case]?"
      },
      inspiredIdeaPlaceholder: {
        es: "Ej: Nos gustó el formato, pero adaptado a nuestra industria o plataforma...",
        en: "e.g. Loved the format, tailored to our industry or platform..."
      },
      fields: {
        companyLabel: { es: "Empresa / Institución / Rubro", en: "Company / Organization / Industry" },
        companyPlaceholder: { es: "Ej: Banco, Retail, Universidad, ONG...", en: "e.g. Bank, Retail, University, NGO..." },
        themeLabel: { es: "Temática o Contenido a comunicar", en: "Theme or Content to Convey" },
        themePlaceholder: { es: "Ej: Onboarding, Seguridad vial, Lanzamiento...", en: "e.g. Onboarding, Safety, Launch..." },
        dateLabel: { es: "Plazo estimado de lanzamiento", en: "Target Launch Window" },
        datePlaceholder: { es: "Ej: Q3 2026 / En 2 meses", en: "e.g. Q3 2026 / In 2 months" }
      },
      scenariosSectionTitle: { es: "Formatos y Escenarios Posibles", en: "Solution Formats & Scenarios" },
      scenariosSectionSubtitle: {
        es: "Ejemplos de cómo empresas, marcas e instituciones despliegan juegos de largo alcance.",
        en: "Examples of how companies, brands, and institutions deploy long-term games."
      }
    });
  }

  function findRefMatch(refId) {
    if (!refId) return null;
    const items = catalog?.categories?.aMedida?.items || [];
    for (const item of items) {
      if (item.visible === false) continue;
      const impls = Array.isArray(item.implementations) ? item.implementations : [];
      const exactImpl = impls.find(im => im.id === refId);
      if (exactImpl) return { item, impl: exactImpl };
      if (item.id === refId && impls.length > 0) return { item, impl: impls[0] };
    }
    return null;
  }

  function findCampaignRefMatch(refId) {
    if (!refId) return null;
    const items = catalog?.categories?.campanas?.items || [];
    const found = items.find(item => item.visible !== false && item.id === refId);
    return found ? { item: found } : null;
  }

  function buildPricingHtml(item, isGameCategory, isAddonCategory, isToolCategory) {
    if (mode === "cotizador") {
      if (isGameCategory) {
        const inCart = cart?.hasGame(item.id);
        const currentDays = cart?.getGameDays(item.id) || 1;
        const btnLabel = inCart ? ui("addedToQuote") : ui("addToQuote");

        return `
          <div class="vertical-pricing-box">
            <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
              <span class="price-pill" style="font-size: 18px; padding: 6px 14px;">$${fmt(item.dailyPrice)} ${ui("perDay")}</span>

              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 13px; color: var(--text-muted);">${ui("gameDuration")}</span>
                <div class="days-control">
                  <button type="button" class="days-btn" data-days-game="${escapeHtml(item.id)}" data-days-delta="-1">-</button>
                  <span class="days-display" id="days-display-${escapeHtml(item.id)}">${currentDays}d</span>
                  <button type="button" class="days-btn" data-days-game="${escapeHtml(item.id)}" data-days-delta="1">+</button>
                </div>
              </div>
            </div>

            <button type="button" class="btn ${inCart ? 'btn-success' : 'btn-primary'} btn-quote-action" data-game-id="${escapeHtml(item.id)}">
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
              <select id="select-game-for-${escapeHtml(item.id)}" data-addon-select="${escapeHtml(item.id)}" class="form-input" style="padding: 6px 12px; font-size: 13px; min-width: 220px;">
                ${gameOptions}
              </select>

              <button type="button" class="btn btn-primary btn-sm btn-assign-addon" data-addon-id="${escapeHtml(item.id)}">
                ${ui("assignAddonBtn")}
              </button>
            </div>
          </div>
        `;
      } else if (isToolCategory) {
        return `
          <div class="vertical-pricing-box">
            <span class="price-pill" style="font-size: 18px; padding: 6px 14px;">$${fmt(item.dailyPrice)} ${ui("perDay")}</span>
            <button type="button" class="btn btn-primary btn-sm btn-add-tool-sec" data-tool-id="${escapeHtml(item.id)}">
              ${ui("addToQuote")}
            </button>
          </div>
        `;
      }
    }

    // Showcase Mode: direct contact consultation
    return `
      <div class="vertical-pricing-box">
        <span style="font-size: 13px; color: var(--text-muted);">${ui("availableForEvents")}</span>
        <a href="https://wa.me/${catalog.studioInfo.whatsapp}?text=${encodeURIComponent(ui("inquireWhatsAppPrefix") + t(item.title))}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
          💬 ${ui("inquireExperience")}
        </a>
      </div>
    `;
  }

  /**
   * Renders Pure Success Case Card (Custom Games Section)
   */
  function renderSuccessCaseCard(item, impl, isPrimaryImpl) {
    const headerTags = (t(item.tags) || []).slice(0, 2).map(tag => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("");
    const itemFeatures = (t(item.features) || []).map(f => `<li>${escapeHtml(f)}</li>`).join("");
    const specs = item.templateSpecs || {};

    const caseTitle = t(impl.title) || t(item.title);
    const caseClient = t(impl.client) || "";
    const caseSummary = t(impl.summary) || t(item.description);
    const caseBuiltFor = t(impl.builtFor || impl.eventNote) || "";
    const verdictQuote = t(impl.clientVerdict?.quote).trim();
    const verdictAuthor = t(impl.clientVerdict?.author).trim();
    const fallbackSrc = resolveImg("assets/images/concept-blueprint.svg");
    const caseImg = resolveImg((impl.image && impl.image.trim())
      ? impl.image
      : ((item.image && item.image.trim()) ? item.image : "assets/images/concept-blueprint.svg"));

    const customBriefUrl = `seccion.html?tipo=a-medida-custom&mode=${mode}&ref=${encodeURIComponent(impl.id)}`;
    const cardAnchorId = isPrimaryImpl ? item.id : impl.id;

    const footerHtml = mode === "cotizador"
      ? `
        <div class="vertical-pricing-box">
          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <span class="price-pill note" style="font-size: 16px; padding: 6px 14px;">
              ${ui("estPerDay")} $${fmt(item.dailyPrice)} ${ui("perDay")}
            </span>
          </div>
          <a href="${customBriefUrl}" class="btn btn-primary btn-sm">
            ✨ ${ui("requestSimilar")}
          </a>
        </div>
      `
      : `
        <div class="vertical-pricing-box">
          <span style="font-size: 13px; color: var(--text-muted);">
            ${escapeHtml(t(specs.b2bGoal) || ui("availableForEvents"))}
          </span>
          <a href="${customBriefUrl}" class="btn btn-primary btn-sm">
            ✨ ${ui("requestSimilar")}
          </a>
        </div>
      `;

    return `
      <article class="success-case-card" id="${escapeHtml(cardAnchorId)}">
        <div class="success-case-media">
          ${caseClient ? `<span class="slide-client-badge">🏷️ ${escapeHtml(caseClient)}</span>` : ''}
          <img src="${escapeHtml(caseImg)}" alt="${escapeHtml(caseTitle)}" loading="lazy" onerror="this.onerror=null; this.src='${escapeHtml(fallbackSrc)}';" />
        </div>

        <div class="success-case-body">
          <div class="vertical-header-row" style="align-items: center;">
            <h2 class="vertical-item-title">${escapeHtml(caseTitle)}</h2>
            ${headerTags ? `<div style="display: flex; gap: 6px; flex-wrap: wrap;">${headerTags}</div>` : ''}
          </div>

          <div class="b2b-inline-pills">
            ${t(specs.players) ? `<span class="b2b-inline-pill">👥 ${escapeHtml(t(specs.players))}</span>` : ''}
            ${t(specs.mechanic) ? `<span class="b2b-inline-pill mechanic">🎹 ${escapeHtml(t(specs.mechanic))}</span>` : ''}
          </div>

          <p class="vertical-desc" style="margin-bottom: 14px;">${escapeHtml(caseSummary)}</p>

          ${caseBuiltFor ? `
            <div class="success-case-built-for">
              <span>🎯</span>
              <div>
                <span class="success-case-built-for-label">${escapeHtml(ui("builtForLabel"))}</span>
                <span>${escapeHtml(caseBuiltFor)}</span>
              </div>
            </div>
          ` : ''}

          ${verdictQuote ? `
            <div class="success-case-verdict">
              <div class="success-case-verdict-label">💬 ${escapeHtml(ui("clientVerdictLabel"))}</div>
              <blockquote class="success-case-verdict-quote">“${escapeHtml(verdictQuote)}”</blockquote>
              ${verdictAuthor ? `<div class="success-case-verdict-author">— ${escapeHtml(verdictAuthor)}</div>` : ''}
            </div>
          ` : ''}

          ${itemFeatures ? `
            <ul class="vertical-features" style="margin-bottom: 16px;">
              ${itemFeatures}
            </ul>
          ` : ''}

          ${footerHtml}
        </div>
      </article>
    `;
  }

  /**
   * Renders Long-Term / Campaign Case Card
   */
  function renderCampaignCaseCard(item, categoryTitle) {
    const headerTags = (t(item.tags) || []).slice(0, 2).map(tag => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("");
    const itemFeatures = (t(item.features) || []).map(f => `<li>${escapeHtml(f)}</li>`).join("");
    const isConcept = item.isConcept || !item.image || !item.image.trim();
    const fallbackSrc = resolveImg("assets/images/concept-blueprint.svg");
    const imgSrc = resolveImg(isConcept ? "assets/images/concept-blueprint.svg" : item.image);
    const campaignBriefUrl = `seccion.html?tipo=campanas-custom&mode=${mode}&ref=${encodeURIComponent(item.id)}`;

    const footerHtml = mode === "cotizador"
      ? `
        <div class="vertical-pricing-box">
          <span class="price-pill note" style="font-size: 16px; padding: 6px 14px;">${escapeHtml(t(item.priceNote))}</span>
          <a href="${campaignBriefUrl}" class="btn btn-primary btn-sm">
            ✨ ${ui("requestSimilar")}
          </a>
        </div>
      `
      : `
        <div class="vertical-pricing-box">
          <span style="font-size: 13px; color: var(--text-muted);">${escapeHtml(ui("campaignCasesBadge"))}</span>
          <a href="${campaignBriefUrl}" class="btn btn-primary btn-sm">
            ✨ ${ui("requestSimilar")}
          </a>
        </div>
      `;

    return `
      <article class="success-case-card" id="${escapeHtml(item.id)}">
        <div class="success-case-media">
          <span class="slide-client-badge">🌟 ${escapeHtml(categoryTitle)}</span>
          ${isConcept ? `<span class="badge" style="position: absolute; top: 12px; right: 12px; z-index: 6; background: rgba(6,182,212,0.3); color: #38BDF8; border: 1px solid rgba(6,182,212,0.6); backdrop-filter: blur(8px);">${ui("conceptBadge")}</span>` : ''}
          <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(t(item.title))}" loading="lazy" onerror="this.onerror=null; this.src='${escapeHtml(fallbackSrc)}';" />
        </div>

        <div class="success-case-body">
          <div class="vertical-header-row" style="align-items: center;">
            <h2 class="vertical-item-title">${escapeHtml(t(item.title))}</h2>
            ${headerTags ? `<div style="display: flex; gap: 6px; flex-wrap: wrap;">${headerTags}</div>` : ''}
          </div>

          <p class="vertical-desc" style="margin-bottom: 14px;">${escapeHtml(t(item.description))}</p>

          ${itemFeatures ? `
            <ul class="vertical-features" style="margin-bottom: 16px;">
              ${itemFeatures}
            </ul>
          ` : ''}

          ${footerHtml}
        </div>
      </article>
    `;
  }

  /**
   * Builds the shared Interactive Brief Card HTML used by both Custom Games and Long-Term Games
   */
  function buildBriefCardHtml(cfg, refCtx) {
    let refStripHtml = "";
    if (refCtx) {
      const fallbackSrc = resolveImg("assets/images/concept-blueprint.svg");
      const refImg = resolveImg((refCtx.img && refCtx.img.trim()) ? refCtx.img : "assets/images/concept-blueprint.svg");
      const inCart = refCtx.quoteGameId ? cart?.hasGame(refCtx.quoteGameId) : false;

      let refRightActions = "";
      if (mode === "cotizador") {
        if (refCtx.quoteGameId && refCtx.dailyPrice != null) {
          refRightActions += `
            <span class="price-pill note">${ui("estPerDay")} $${fmt(refCtx.dailyPrice)} ${ui("perDay")}</span>
            <button type="button" class="btn ${inCart ? 'btn-success' : 'btn-primary'} btn-sm btn-quote-action" data-game-id="${escapeHtml(refCtx.quoteGameId)}">
              ${inCart ? ui("addedToQuote") : ui("quoteBaseMechanicShort")}
            </button>
          `;
        } else if (refCtx.priceNoteText) {
          refRightActions += `<span class="price-pill note">${escapeHtml(refCtx.priceNoteText)}</span>`;
        }
      }
      refRightActions += `<a href="${refCtx.clearRefUrl}" class="btn btn-outline btn-sm">${ui("clearRefCase")}</a>`;

      refStripHtml = `
        <div class="brief-ref-strip">
          <div class="brief-ref-left">
            <img src="${escapeHtml(refImg)}" alt="${escapeHtml(refCtx.title)}" class="brief-ref-thumb" onerror="this.onerror=null; this.src='${escapeHtml(fallbackSrc)}';" />
            <div style="min-width: 0;">
              <div style="font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #38BDF8;">
                ${ui("currentRefBadge")}
              </div>
              <div class="brief-ref-title">
                ${escapeHtml(refCtx.title)}
              </div>
              <div class="brief-ref-client">
                🏷️ ${escapeHtml(refCtx.clientLabel)}
              </div>
            </div>
          </div>

          <div class="brief-ref-actions">
            ${refRightActions}
          </div>
        </div>
      `;
    }

    const guidelinesHtml = cfg.guidelines.length > 0 ? `
      <div class="brief-guidelines-box">
        <div class="brief-guidelines-header">
          <span class="brief-guidelines-title">💡 ${ui("briefGuidelinesTitle")}</span>
          <span class="badge" style="background: rgba(16,185,129,0.12); color: #34D399; border-color: rgba(16,185,129,0.3);">${ui("briefOptionalNote")}</span>
        </div>
        <ul class="brief-guidelines-list">
          ${cfg.guidelines.map(g => `<li>${escapeHtml(t(g))}</li>`).join("")}
        </ul>
      </div>
    ` : "";

    const pillGroupsHtml = cfg.pillGroups.map(group => {
      const gid = group.id || "group";
      const selectedSet = briefState.selectedPills[gid] || new Set();
      const optionsHtml = (group.options || []).map((opt, optIdx) => {
        const isActive = selectedSet.has(optIdx);
        return `
          <button type="button" class="brief-pill-btn ${isActive ? 'active' : ''}" data-pill-group="${escapeHtml(gid)}" data-pill-idx="${optIdx}" data-multi="${group.multiSelect !== false ? '1' : '0'}">
            ${escapeHtml(t(opt))}
          </button>
        `;
      }).join("");

      return `
        <div class="brief-pill-group">
          <label class="form-label">${escapeHtml(t(group.label))}</label>
          <div class="brief-pill-row">
            ${optionsHtml}
          </div>
        </div>
      `;
    }).join("");

    const ideaLabel = refCtx
      ? interpolateCase(t(cfg.inspiredIdeaLabel), refCtx.title)
      : t(cfg.defaultIdeaLabel);
    const ideaPlaceholder = refCtx
      ? interpolateCase(t(cfg.inspiredIdeaPlaceholder), refCtx.title)
      : t(cfg.defaultIdeaPlaceholder);

    return `
      <section class="brief-studio-card">
        ${refStripHtml}
        ${guidelinesHtml}

        <div class="brief-form">
          <div class="form-group">
            <label class="form-label" for="brief-idea-input">${escapeHtml(ideaLabel)}</label>
            <textarea id="brief-idea-input" class="form-input" rows="3" placeholder="${escapeHtml(ideaPlaceholder)}">${escapeHtml(briefState.idea)}</textarea>
          </div>

          <div class="brief-form-grid">
            <div class="form-group">
              <label class="form-label" for="brief-company-input">${escapeHtml(t(cfg.fields?.companyLabel))}</label>
              <input type="text" id="brief-company-input" class="form-input" placeholder="${escapeHtml(t(cfg.fields?.companyPlaceholder))}" value="${escapeHtml(briefState.company)}" />
            </div>

            <div class="form-group">
              <label class="form-label" for="brief-theme-input">${escapeHtml(t(cfg.fields?.themeLabel))}</label>
              <input type="text" id="brief-theme-input" class="form-input" placeholder="${escapeHtml(t(cfg.fields?.themePlaceholder))}" value="${escapeHtml(briefState.theme)}" />
            </div>

            <div class="form-group">
              <label class="form-label" for="brief-date-input">${escapeHtml(t(cfg.fields?.dateLabel))}</label>
              <input type="text" id="brief-date-input" class="form-input" placeholder="${escapeHtml(t(cfg.fields?.datePlaceholder))}" value="${escapeHtml(briefState.date)}" />
            </div>
          </div>

          ${pillGroupsHtml}

          <div class="brief-actions-bar">
            <button type="button" class="btn btn-success" id="btn-brief-whatsapp">
              💬 ${ui("sendBriefWhatsApp")}
            </button>
            <button type="button" class="btn btn-primary" id="btn-brief-email">
              ✉️ ${ui("sendBriefEmail")}
            </button>
            <button type="button" class="btn btn-outline" id="btn-brief-copy">
              📋 ${ui("copyBrief")}
            </button>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Renders the "¡Pedí el tuyo!" Interactive Brief + Base Mechanics Blueprint Grid
   */
  function renderCustomBriefView(heroEl, listEl) {
    const cfg = getBriefConfig();
    const refMatch = findRefMatch(refParam);
    const refCaseTitle = refMatch ? (t(refMatch.impl.title) || t(refMatch.item.title)) : "";
    const backUrl = `seccion.html?tipo=aMedida&mode=${mode}`;

    const heroTitle = refMatch
      ? interpolateCase(t(cfg.inspiredHeroPrefix), refCaseTitle)
      : t(cfg.pageTitle);
    const heroSubtitle = refMatch
      ? interpolateCase(t(cfg.inspiredHeroSubtitle), refCaseTitle)
      : t(cfg.pageSubtitle);

    if (heroEl) {
      heroEl.innerHTML = `
        <div style="margin-bottom: 24px;">
          <a href="${backUrl}" class="section-link" style="font-size: 15px; margin-bottom: 16px; display: inline-flex;">
            ${ui("backToCustomGames")}
          </a>
          <h1 class="hero-title" style="font-size: 38px; text-align: left; margin: 0 0 12px 0;">${escapeHtml(heroTitle)}</h1>
          <p class="section-desc" style="font-size: 17px; max-width: 820px;">${escapeHtml(heroSubtitle)}</p>
        </div>
      `;
    }

    if (!listEl) return;

    const refCtx = refMatch ? {
      title: refCaseTitle,
      clientLabel: t(refMatch.impl.client) || t(refMatch.item.title),
      img: refMatch.impl.image || refMatch.item.image,
      quoteGameId: refMatch.item.id,
      dailyPrice: refMatch.item.dailyPrice,
      clearRefUrl: `seccion.html?tipo=a-medida-custom&mode=${mode}`
    } : null;

    const briefCardHtml = buildBriefCardHtml(cfg, refCtx);

    // Compact 2-Column Mechanic Blueprint Grid (all visible aMedida base mechanics)
    const allMechanics = (catalog?.categories?.aMedida?.items || []).filter(item => item.visible !== false);
    const mechanicsSub = mode === "cotizador"
      ? t(cfg.mechanicsSectionSubtitleCotizador)
      : t(cfg.mechanicsSectionSubtitleShowcase);

    const mechanicCardsHtml = allMechanics.map(item => {
      const specs = item.templateSpecs || {};
      const impls = Array.isArray(item.implementations) ? item.implementations : [];
      const primaryImpl = impls[0] || null;
      const isHighlighted = refMatch && refMatch.item.id === item.id;
      const inCart = cart?.hasGame(item.id);
      const currentDays = cart?.getGameDays(item.id) || 1;
      const mechTitle = t(item.title);

      const caseLinkHtml = primaryImpl
        ? `<a href="seccion.html?tipo=aMedida&mode=${mode}#${escapeHtml(item.id)}" class="blueprint-case-link">🏆 ${ui("basedOnCaseTag")} ${escapeHtml(t(primaryImpl.title))} →</a>`
        : "";

      const footerHtml = mode === "cotizador"
        ? `
          <div class="blueprint-card-footer">
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <span class="price-pill">$${fmt(item.dailyPrice)} ${ui("perDay")}</span>
              <div class="days-control">
                <button type="button" class="days-btn" data-days-game="${escapeHtml(item.id)}" data-days-delta="-1">-</button>
                <span class="days-display" id="days-display-${escapeHtml(item.id)}">${currentDays}d</span>
                <button type="button" class="days-btn" data-days-game="${escapeHtml(item.id)}" data-days-delta="1">+</button>
              </div>
            </div>
            <button type="button" class="btn ${inCart ? 'btn-success' : 'btn-primary'} btn-sm btn-quote-action" data-game-id="${escapeHtml(item.id)}">
              ${inCart ? ui("addedToQuote") : ui("quoteTemplateBtn")}
            </button>
          </div>
        `
        : `
          <div class="blueprint-card-footer">
            <span style="font-size: 13px; color: var(--text-muted);">${escapeHtml(t(specs.b2bGoal) || "")}</span>
            <button type="button" class="btn btn-outline btn-sm btn-use-mechanic" data-mechanic-title="${escapeHtml(mechTitle)}">
              ${ui("useAsStartingPoint")}
            </button>
          </div>
        `;

      return `
        <article class="mechanic-blueprint-card ${isHighlighted ? 'highlighted' : ''}" id="mech-${escapeHtml(item.id)}">
          <div class="blueprint-card-top">
            <h3 class="blueprint-title">${escapeHtml(mechTitle)}</h3>
            ${isHighlighted
              ? `<span class="badge" style="background: rgba(6,182,212,0.2); color: #38BDF8; border-color: rgba(6,182,212,0.45);">${ui("currentRefBadge")}</span>`
              : caseLinkHtml}
          </div>

          <div class="b2b-inline-pills" style="margin-bottom: 10px;">
            ${t(specs.players) ? `<span class="b2b-inline-pill">👥 ${escapeHtml(t(specs.players))}</span>` : ''}
            ${t(specs.mechanic) ? `<span class="b2b-inline-pill mechanic">🎹 ${escapeHtml(t(specs.mechanic))}</span>` : ''}
          </div>

          <p class="blueprint-desc">${escapeHtml(t(item.description))}</p>

          ${mode === "cotizador" && t(specs.b2bGoal)
            ? `<div class="blueprint-goal">🎯 ${escapeHtml(t(specs.b2bGoal))}</div>`
            : ""}

          ${footerHtml}
        </article>
      `;
    }).join("");

    const mechanicsSectionHtml = `
      <section class="blueprint-section">
        <div class="blueprint-section-header">
          <h2 class="section-title" style="margin-bottom: 6px;">${escapeHtml(t(cfg.mechanicsSectionTitle))}</h2>
          <p class="section-desc" style="margin-bottom: 0; max-width: 780px;">${escapeHtml(mechanicsSub)}</p>
        </div>

        <div class="blueprint-grid-2">
          ${mechanicCardsHtml}
        </div>
      </section>
    `;

    listEl.innerHTML = briefCardHtml + mechanicsSectionHtml;
    bindBriefEvents(cfg, refCtx, false);
  }

  /**
   * Renders the Long-Term & Campaign Games Brief + Editable Solution Scenarios Grid
   */
  function renderCampaignBriefView(heroEl, listEl) {
    const cfg = getCampaignBriefConfig();
    const refMatch = findCampaignRefMatch(refParam);
    const refCaseTitle = refMatch ? t(refMatch.item.title) : "";
    const backUrl = `seccion.html?tipo=campanas&mode=${mode}`;

    const heroTitle = refMatch
      ? interpolateCase(t(cfg.inspiredHeroPrefix), refCaseTitle)
      : t(cfg.pageTitle);
    const heroSubtitle = refMatch
      ? interpolateCase(t(cfg.inspiredHeroSubtitle), refCaseTitle)
      : t(cfg.pageSubtitle);

    if (heroEl) {
      heroEl.innerHTML = `
        <div style="margin-bottom: 24px;">
          <a href="${backUrl}" class="section-link" style="font-size: 15px; margin-bottom: 16px; display: inline-flex;">
            ${ui("backToCampaigns")}
          </a>
          <h1 class="hero-title" style="font-size: 38px; text-align: left; margin: 0 0 12px 0;">${escapeHtml(heroTitle)}</h1>
          <p class="section-desc" style="font-size: 17px; max-width: 820px;">${escapeHtml(heroSubtitle)}</p>
        </div>
      `;
    }

    if (!listEl) return;

    const campCatTitle = t(catalog?.categories?.campanas?.title) || "Juegos de Largo Alcance";
    const refCtx = refMatch ? {
      title: refCaseTitle,
      clientLabel: campCatTitle,
      img: refMatch.item.image,
      priceNoteText: t(refMatch.item.priceNote),
      clearRefUrl: `seccion.html?tipo=campanas-custom&mode=${mode}`
    } : null;

    const briefCardHtml = buildBriefCardHtml(cfg, refCtx);

    const visibleCases = new Set(
      (catalog?.categories?.campanas?.items || []).filter(i => i.visible !== false).map(i => i.id)
    );

    const scenariosHtml = (cfg.scenarios || []).map(sc => {
      const scTitle = t(sc.title);
      const hasRelatedCase = sc.relatedCaseId && visibleCases.has(sc.relatedCaseId);
      const caseLinkHtml = hasRelatedCase
        ? `<a href="seccion.html?tipo=campanas&mode=${mode}#${escapeHtml(sc.relatedCaseId)}" class="blueprint-case-link">🏆 ${ui("seeSuccessCase")}</a>`
        : "";
      const linkedPillAttr = Number.isInteger(sc.linkedPillIdx) ? String(sc.linkedPillIdx) : "";

      return `
        <article class="mechanic-blueprint-card" id="scenario-${escapeHtml(sc.id)}">
          <div class="blueprint-card-top">
            <h3 class="blueprint-title">${escapeHtml(sc.icon || "🚀")} ${escapeHtml(scTitle)}</h3>
            ${caseLinkHtml}
          </div>

          <div class="b2b-inline-pills" style="margin-bottom: 10px;">
            ${t(sc.platform) ? `<span class="b2b-inline-pill">💻 ${escapeHtml(t(sc.platform))}</span>` : ''}
            ${t(sc.duration) ? `<span class="b2b-inline-pill mechanic">⏳ ${escapeHtml(t(sc.duration))}</span>` : ''}
          </div>

          <p class="blueprint-desc">${escapeHtml(t(sc.description))}</p>

          ${t(sc.goal) ? `<div class="blueprint-goal">🎯 ${escapeHtml(t(sc.goal))}</div>` : ""}

          <div class="blueprint-card-footer">
            <span></span>
            <button type="button" class="btn btn-outline btn-sm btn-use-scenario" data-scenario-title="${escapeHtml(scTitle)}" data-pill-idx="${escapeHtml(linkedPillAttr)}">
              ${ui("useScenarioFormat")}
            </button>
          </div>
        </article>
      `;
    }).join("");

    const scenariosSectionHtml = (cfg.scenarios || []).length > 0 ? `
      <section class="blueprint-section">
        <div class="blueprint-section-header">
          <h2 class="section-title" style="margin-bottom: 6px;">${escapeHtml(t(cfg.scenariosSectionTitle))}</h2>
          <p class="section-desc" style="margin-bottom: 0; max-width: 780px;">${escapeHtml(t(cfg.scenariosSectionSubtitle))}</p>
        </div>

        <div class="blueprint-grid-2">
          ${scenariosHtml}
        </div>
      </section>
    ` : "";

    listEl.innerHTML = briefCardHtml + scenariosSectionHtml;
    bindBriefEvents(cfg, refCtx, true);
  }

  function composeBriefText(cfg, refCtx, isCampaignBrief) {
    const lang = i18n ? i18n.getLang() : "es";
    const studioName = catalog?.studioInfo?.name || "Tailored Games";

    const lines = [];
    lines.push("══════════════════════════════════════");
    if (isCampaignBrief) {
      lines.push(lang === "es"
        ? `🌐 CONSULTA JUEGO DE LARGO ALCANCE — ${studioName.toUpperCase()}`
        : `🌐 LONG-TERM GAME BRIEF — ${studioName.toUpperCase()}`);
    } else {
      lines.push(lang === "es"
        ? `🎮 CONSULTA DE JUEGO A MEDIDA — ${studioName.toUpperCase()}`
        : `🎮 CUSTOM GAME BRIEF — ${studioName.toUpperCase()}`);
    }
    lines.push("══════════════════════════════════════");
    lines.push("");

    if (refCtx) {
      const refIntro = interpolateCase(t(cfg.inspiredHeroPrefix), refCtx.title);
      lines.push(`🎯 ${refIntro}`);
      lines.push(`   (${lang === "es" ? "Caso de referencia" : "Reference case"}: ${refCtx.title})`);
      lines.push("");
    }

    if (briefState.idea.trim()) {
      lines.push(refCtx
        ? (lang === "es" ? "✏️ Adaptaciones / Idea:" : "✏️ Customizations / Idea:")
        : (lang === "es" ? "💡 Idea o Proyecto:" : "💡 Concept / Project:"));
      lines.push(briefState.idea.trim());
      lines.push("");
    }

    if (briefState.company.trim()) {
      lines.push(`🏢 ${t(cfg.fields?.companyLabel)}: ${briefState.company.trim()}`);
    }
    if (briefState.theme.trim()) {
      lines.push(`🎨 ${t(cfg.fields?.themeLabel)}: ${briefState.theme.trim()}`);
    }
    if (briefState.date.trim()) {
      lines.push(`📅 ${t(cfg.fields?.dateLabel)}: ${briefState.date.trim()}`);
    }

    cfg.pillGroups.forEach(group => {
      const gid = group.id || "group";
      const selected = briefState.selectedPills[gid];
      if (selected && selected.size > 0) {
        const labels = Array.from(selected)
          .map(idx => group.options?.[idx])
          .filter(Boolean)
          .map(opt => t(opt));
        if (labels.length > 0) {
          lines.push(`• ${t(group.label)}: ${labels.join(", ")}`);
        }
      }
    });

    const hasDetails = refCtx || briefState.idea.trim() || briefState.company.trim() || briefState.theme.trim() || briefState.date.trim() ||
      Object.values(briefState.selectedPills).some(s => s && s.size > 0);

    if (!hasDetails) {
      if (isCampaignBrief) {
        lines.push(lang === "es"
          ? "Hola! Me gustaría asesoramiento para desarrollar un juego de largo alcance (capacitación interna, campaña web o similar)."
          : "Hi! We'd love guidance on building a long-term interactive game (internal training, web campaign, or similar).");
      } else {
        lines.push(lang === "es"
          ? "Hola! Me gustaría asesoramiento para desarrollar un juego a medida para nuestro próximo evento."
          : "Hi! We'd love guidance on developing a custom interactive game for our upcoming event.");
      }
    }

    return lines.join("\n");
  }

  function bindBriefEvents(cfg, refCtx, isCampaignBrief) {
    const ideaEl = document.getElementById("brief-idea-input");
    const companyEl = document.getElementById("brief-company-input");
    const themeEl = document.getElementById("brief-theme-input");
    const dateEl = document.getElementById("brief-date-input");

    ideaEl?.addEventListener("input", () => { briefState.idea = ideaEl.value; });
    companyEl?.addEventListener("input", () => { briefState.company = companyEl.value; });
    themeEl?.addEventListener("input", () => { briefState.theme = themeEl.value; });
    dateEl?.addEventListener("input", () => { briefState.date = dateEl.value; });

    document.querySelectorAll(".brief-pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const gid = btn.getAttribute("data-pill-group");
        const idx = parseInt(btn.getAttribute("data-pill-idx"), 10);
        const isMulti = btn.getAttribute("data-multi") === "1";

        if (!briefState.selectedPills[gid]) {
          briefState.selectedPills[gid] = new Set();
        }
        const set = briefState.selectedPills[gid];

        if (set.has(idx)) {
          set.delete(idx);
          btn.classList.remove("active");
        } else {
          if (!isMulti) {
            set.clear();
            document.querySelectorAll(`.brief-pill-btn[data-pill-group="${gid}"]`).forEach(b => b.classList.remove("active"));
          }
          set.add(idx);
          btn.classList.add("active");
        }
      });
    });

    document.getElementById("btn-brief-whatsapp")?.addEventListener("click", () => {
      const phone = catalog?.studioInfo?.whatsapp || "5491100000000";
      const text = composeBriefText(cfg, refCtx, isCampaignBrief);
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });

    document.getElementById("btn-brief-email")?.addEventListener("click", () => {
      const email = catalog?.studioInfo?.email || "contacto@tailoredgames.com";
      const lang = i18n ? i18n.getLang() : "es";
      const refTitle = refCtx ? refCtx.title : "";
      const prefixEs = isCampaignBrief ? "Consulta Juego de Largo Alcance" : "Consulta Juego a Medida";
      const prefixEn = isCampaignBrief ? "Long-Term Game Brief" : "Custom Game Brief";
      const subject = refCtx
        ? `${lang === "es" ? prefixEs : prefixEn} (Ref: ${refTitle})`
        : `${lang === "es" ? prefixEs : prefixEn} — ${briefState.company || catalog?.studioInfo?.name || "Tailored Games"}`;
      const body = composeBriefText(cfg, refCtx, isCampaignBrief);
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });

    document.getElementById("btn-brief-copy")?.addEventListener("click", (e) => {
      const text = composeBriefText(cfg, refCtx, isCampaignBrief);
      navigator.clipboard.writeText(text).then(() => {
        const btn = e.currentTarget;
        const prev = btn.textContent;
        btn.textContent = ui("copiedBrief");
        setTimeout(() => { btn.textContent = prev; }, 2500);
      });
    });

    // Showcase mode: "Use as starting point" scrolls up and seeds idea input
    document.querySelectorAll(".btn-use-mechanic").forEach(btn => {
      btn.addEventListener("click", () => {
        const mechTitle = btn.getAttribute("data-mechanic-title") || "";
        const lang = i18n ? i18n.getLang() : "es";
        if (ideaEl) {
          const starter = lang === "es"
            ? `Me interesa tomar como base la mecánica "${mechTitle}" y adaptarla a...`
            : `I'd like to use the "${mechTitle}" mechanic as a starting point and adapt it to...`;
          if (!ideaEl.value.trim()) {
            ideaEl.value = starter;
            briefState.idea = starter;
          } else if (!ideaEl.value.includes(mechTitle)) {
            ideaEl.value = `${ideaEl.value.trim()}\n(${lang === "es" ? "Mecánica de referencia" : "Reference mechanic"}: ${mechTitle})`;
            briefState.idea = ideaEl.value;
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => ideaEl.focus(), 350);
        }
      });
    });

    // Long-Term Scenarios: "Use this format" activates linked pill (if any) + seeds idea input
    document.querySelectorAll(".btn-use-scenario").forEach(btn => {
      btn.addEventListener("click", () => {
        const scTitle = btn.getAttribute("data-scenario-title") || "";
        const pillIdxStr = btn.getAttribute("data-pill-idx");
        const lang = i18n ? i18n.getLang() : "es";

        if (pillIdxStr !== "" && cfg.pillGroups?.[0]) {
          const firstGroupId = cfg.pillGroups[0].id || "projectType";
          const pillIdx = parseInt(pillIdxStr, 10);
          if (!Number.isNaN(pillIdx)) {
            if (!briefState.selectedPills[firstGroupId]) {
              briefState.selectedPills[firstGroupId] = new Set();
            }
            briefState.selectedPills[firstGroupId].add(pillIdx);
            const pillBtn = document.querySelector(`.brief-pill-btn[data-pill-group="${firstGroupId}"][data-pill-idx="${pillIdx}"]`);
            pillBtn?.classList.add("active");
          }
        }

        if (ideaEl) {
          const starter = lang === "es"
            ? `Nos interesa explorar el formato "${scTitle}" para...`
            : `We'd like to explore the "${scTitle}" format for...`;
          if (!ideaEl.value.trim()) {
            ideaEl.value = starter;
            briefState.idea = starter;
          } else if (!ideaEl.value.includes(scTitle)) {
            ideaEl.value = `${ideaEl.value.trim()}\n(${lang === "es" ? "Formato de interés" : "Format of interest"}: ${scTitle})`;
            briefState.idea = ideaEl.value;
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => ideaEl.focus(), 350);
        }
      });
    });
  }

  function renderSection() {
    const backUrl = mode === "cotizador" ? "cotizador.html" : "index.html";

    // 1. Navigation Header
    renderer.renderHeader("header-mount", mode, true);

    const heroEl = document.getElementById("section-hero-mount");
    const listEl = document.getElementById("section-items-mount");

    if (tipo === "aMedidaCustom") {
      renderCustomBriefView(heroEl, listEl);
    } else if (tipo === "campanasCustom") {
      renderCampaignBriefView(heroEl, listEl);
    } else {
      const category = catalog.categories[tipo] || catalog.categories.clasicos;

      // 2. Section Header & Back Link
      if (heroEl) {
        heroEl.innerHTML = `
          <div style="margin-bottom: 24px;">
            <a href="${backUrl}" class="section-link" style="font-size: 15px; margin-bottom: 16px; display: inline-flex;">
              ${ui("backToHome")}
            </a>
            <h1 class="hero-title" style="font-size: 38px; text-align: left; margin: 0 0 12px 0;">${escapeHtml(t(category.title))}</h1>
            <p class="section-desc" style="font-size: 17px; max-width: 780px;">${escapeHtml(t(category.subtitle))}</p>
          </div>
        `;
      }

      // 3. Vertical Items List
      if (listEl) {
        if (tipo === "aMedida") {
          const cfg = getBriefConfig();
          const briefHref = `seccion.html?tipo=a-medida-custom&mode=${mode}`;

          const bannerHtml = `
            <section class="pedi-tuyo-banner">
              <div class="pedi-tuyo-content">
                <div class="hero-badge" style="margin-bottom: 12px;">✨ ${mode === "cotizador" ? ui("customBannerBadgeCotizador") : ui("customBannerBadgeShowcase")}</div>
                <h2 style="font-size: 28px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;">${escapeHtml(t(cfg.bannerTitle))}</h2>
                <p style="font-size: 16px; color: var(--text-secondary); max-width: 680px; line-height: 1.6;">${escapeHtml(t(cfg.bannerSubtitle))}</p>
              </div>
              <div class="pedi-tuyo-cta">
                <a href="${briefHref}" class="btn btn-primary" style="padding: 13px 24px; font-size: 15px;">
                  ${escapeHtml(t(cfg.bannerCta))}
                </a>
              </div>
            </section>
          `;

          const caseItems = (category.items || []).filter(item =>
            item.visible !== false && Array.isArray(item.implementations) && item.implementations.length > 0
          );

          const casesHtml = caseItems.map(item =>
            item.implementations.map((impl, idx) => renderSuccessCaseCard(item, impl, idx === 0)).join("")
          ).join("");

          listEl.innerHTML = bannerHtml + casesHtml;
        } else if (tipo === "campanas") {
          const cfg = getCampaignBriefConfig();
          const briefHref = `seccion.html?tipo=campanas-custom&mode=${mode}`;

          const bannerHtml = `
            <section class="pedi-tuyo-banner">
              <div class="pedi-tuyo-content">
                <div class="hero-badge" style="margin-bottom: 12px;">🌐 ${mode === "cotizador" ? ui("campaignBannerBadgeCotizador") : ui("campaignBannerBadgeShowcase")}</div>
                <h2 style="font-size: 28px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;">${escapeHtml(t(cfg.bannerTitle))}</h2>
                <p style="font-size: 16px; color: var(--text-secondary); max-width: 680px; line-height: 1.6;">${escapeHtml(t(cfg.bannerSubtitle))}</p>
              </div>
              <div class="pedi-tuyo-cta">
                <a href="${briefHref}" class="btn btn-primary" style="padding: 13px 24px; font-size: 15px;">
                  ${escapeHtml(t(cfg.bannerCta))}
                </a>
              </div>
            </section>
          `;

          const visibleCampaigns = (category.items || []).filter(item => item.visible !== false);
          const campTitle = t(category.title);
          const casesHtml = visibleCampaigns.map(item => renderCampaignCaseCard(item, campTitle)).join("");

          listEl.innerHTML = bannerHtml + casesHtml;
        } else {
          const isGameCategory = tipo === "clasicos";
          const isAddonCategory = tipo === "agregados";
          const isToolCategory = tipo === "herramientas";

          const visibleItems = (category.items || []).filter(item => item.visible !== false);

          const itemsHtml = visibleItems.map(item => {
            const pricingHtml = buildPricingHtml(item, isGameCategory, isAddonCategory, isToolCategory);
            const headerTags = (t(item.tags) || []).slice(0, 2).map(tag => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("");
            const itemFeatures = (t(item.features) || []).map(f => `<li>${escapeHtml(f)}</li>`).join("");
            const isConcept = item.isConcept || !item.image || !item.image.trim();
            const fallbackSrc = resolveImg("assets/images/concept-blueprint.svg");
            const imgSrc = resolveImg((!item.image || !item.image.trim()) ? "assets/images/concept-blueprint.svg" : item.image);

            return `
              <article class="vertical-item-card" id="${escapeHtml(item.id)}">
                <div class="vertical-media-column" style="position: relative;">
                  ${isConcept ? `<span class="badge" style="position: absolute; top: 16px; left: 16px; z-index: 5; background: rgba(6,182,212,0.3); color: #38BDF8; border: 1px solid rgba(6,182,212,0.6); backdrop-filter: blur(8px);">${ui("conceptBadge")}</span>` : ''}
                  <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(t(item.title))}" loading="lazy" onerror="this.onerror=null; this.src='${escapeHtml(fallbackSrc)}';" />
                </div>

                <div class="vertical-content-column">
                  <div class="vertical-header-row" style="align-items: center;">
                    <h2 class="vertical-item-title">${escapeHtml(t(item.title))}</h2>
                    ${headerTags ? `<div style="display: flex; gap: 6px; flex-wrap: wrap;">${headerTags}</div>` : ''}
                  </div>

                  <p class="vertical-desc" style="margin-bottom: 14px;">${escapeHtml(t(item.description))}</p>

                  ${itemFeatures ? `
                    <ul class="vertical-features" style="margin-bottom: 16px;">
                      ${itemFeatures}
                    </ul>
                  ` : ''}

                  ${pricingHtml}
                </div>
              </article>
            `;
          }).join("");

          listEl.innerHTML = itemsHtml;

          if (mode === "cotizador" && isAddonCategory) {
            renderer.bindAddonAssignControls(listEl);
          }
        }
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
    // Days +/- buttons
    document.querySelectorAll("[data-days-game]").forEach(btn => {
      btn.addEventListener("click", () => {
        const gameId = btn.getAttribute("data-days-game");
        const delta = parseInt(btn.getAttribute("data-days-delta"), 10) || 0;
        window.updateItemDays(gameId, delta);
      });
    });

    // Add/remove game button
    document.querySelectorAll(".btn-quote-action").forEach(btn => {
      btn.addEventListener("click", () => {
        const gameId = btn.getAttribute("data-game-id");
        if (cart) {
          const daysEl = document.getElementById(`days-display-${gameId}`);
          const days = parseInt(daysEl?.textContent, 10) || cart.getGameDays(gameId) || 1;
          cart.addGame(gameId, days);
          document.querySelectorAll(`.btn-quote-action[data-game-id="${gameId}"]`).forEach(b => {
            b.textContent = ui("addedToQuote");
            b.classList.replace("btn-primary", "btn-success");
          });
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
    let current = parseInt(display.textContent, 10) || 1;
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
