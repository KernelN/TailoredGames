/**
 * Tailored Games — Smart Internationalization (i18n) Module
 * Handles language detection, manual switching, currency formatting, and translation dispatching.
 */

(function () {
  const STORAGE_KEY = "corpfolio_lang";
  const GEO_CACHE_KEY = "corpfolio_geo_lang";

  const SPANISH_COUNTRIES = new Set([
    "AR", "ES", "MX", "CO", "CL", "PE", "UY", "PY", "BO", "EC",
    "VE", "CR", "PA", "GT", "HN", "SV", "NI", "DO", "PR", "CU", "GQ"
  ]);

  const SPANISH_TIMEZONES = new Set([
    "America/Buenos_Aires",
    "America/Cordoba",
    "America/Salta",
    "America/Jujuy",
    "America/Tucuman",
    "America/Catamarca",
    "America/La_Rioja",
    "America/San_Juan",
    "America/Mendoza",
    "America/San_Luis",
    "America/Rio_Gallegos",
    "America/Ushuaia",
    "Europe/Madrid",
    "Atlantic/Canary",
    "Africa/Ceuta",
    "America/Mexico_City",
    "America/Cancun",
    "America/Merida",
    "America/Monterrey",
    "America/Matamoros",
    "America/Mazatlan",
    "America/Chihuahua",
    "America/Ojinaga",
    "America/Hermosillo",
    "America/Tijuana",
    "America/Bahia_Banderas",
    "America/Bogota",
    "America/Santiago",
    "Pacific/Easter",
    "America/Lima",
    "America/Montevideo",
    "America/Asuncion",
    "America/La_Paz",
    "America/Guayaquil",
    "Pacific/Galapagos",
    "America/Caracas",
    "America/Costa_Rica",
    "America/Panama",
    "America/Guatemala",
    "America/Tegucigalpa",
    "America/El_Salvador",
    "America/Managua",
    "America/Santo_Domingo",
    "America/Puerto_Rico",
    "America/Havana",
    "Africa/Malabo"
  ]);

  const LOCALIZED_IMAGES = {
    "assets/images/games/trivia.png": "assets/images/games/trivia-en.png",
    "assets/images/games/tap-gallery.png": "assets/images/games/tap-gallery-en.png",
    "assets/images/campaigns/mi-increible-paseo-detail.png": "assets/images/campaigns/mi-increible-paseo-detail-en.png",
    "assets/images/concept-blueprint.svg": "assets/images/concept-blueprint-en.svg",
    "assets/images/addons/ranking.svg": "assets/images/addons/ranking-en.svg",
    "assets/images/addons/ranking-detail.svg": "assets/images/addons/ranking-detail-en.svg",
    "assets/images/addons/registro.svg": "assets/images/addons/registro-en.svg",
    "assets/images/addons/registro-detail.svg": "assets/images/addons/registro-detail-en.svg",
    "assets/images/addons/sorteo.svg": "assets/images/addons/sorteo-en.svg",
    "assets/images/addons/sorteo-detail.svg": "assets/images/addons/sorteo-detail-en.svg",
    "assets/images/tools/ruleta.svg": "assets/images/tools/ruleta-en.svg",
    "assets/images/tools/ruleta-detail.svg": "assets/images/tools/ruleta-detail-en.svg",
    "assets/images/tools/sorteador.svg": "assets/images/tools/sorteador-en.svg",
    "assets/images/tools/sorteador-detail.svg": "assets/images/tools/sorteador-detail-en.svg",
    "assets/images/games/memotest.svg": "assets/images/games/memotest-en.svg",
    "assets/images/games/memotest-detail.svg": "assets/images/games/memotest-detail-en.svg",
    "assets/images/games/simon.svg": "assets/images/games/simon-en.svg",
    "assets/images/games/simon-detail.svg": "assets/images/games/simon-detail-en.svg",
    "assets/images/games/trivia.svg": "assets/images/games/trivia-en.svg",
    "assets/images/games/trivia-detail.svg": "assets/images/games/trivia-detail-en.svg"
  };

  // Common UI translation dictionary
  const UI_DICTIONARY = {
    heroBadge: {
      es: "Estudio Interactivo B2B",
      en: "B2B Interactive Studio"
    },
    heroBadgeShowcase: {
      es: "⚡ Experiencias B2B & Eventos Corporativos",
      en: "⚡ B2B Experiences & Corporate Events"
    },
    heroBadgeCotizador: {
      es: "💼 Cotizador Interactivo para Productoras & HR",
      en: "💼 Interactive Quoting for Producers & HR"
    },
    heroTitleCotizador: {
      es: "Arma el presupuesto digital para tu evento",
      en: "Build your digital event quote"
    },
    heroSubtitleCotizador: {
      es: "Selecciona los juegos, la duración y los add-ons. Los descuentos del 50% por 3+ días y 20% por 4+ juegos se aplican automáticamente sobre tu cotización.",
      en: "Select games, duration, and add-ons. 50% discounts for 3+ days and 20% for 4+ games are automatically applied to your quote."
    },
    heroQuotePill: {
      es: "💼 Cotizador en vivo: calcula tu presupuesto con descuentos automáticos por días y cantidad.",
      en: "💼 Live Quoting: calculate your formal budget with automatic duration and quantity discounts."
    },
    baseTemplateTab: {
      es: "⚙️ Plantilla Base",
      en: "⚙️ Base Template"
    },
    baseTemplateBadge: {
      es: "⚙️ Mecánica Base",
      en: "⚙️ Base Mechanic"
    },
    days: {
      es: "días",
      en: "days"
    },
    day: {
      es: "día",
      en: "day"
    },
    perDay: {
      es: "/ día",
      en: "/ day"
    },
    addToQuote: {
      es: "+ Agregar a Cotización",
      en: "+ Add to Quote"
    },
    addedToQuote: {
      es: "✓ Agregado",
      en: "✓ Added"
    },
    remove: {
      es: "Eliminar",
      en: "Remove"
    },
    viewAll: {
      es: "Ver todos y detalles →",
      en: "View all & details →"
    },
    viewSection: {
      es: "Explorar sección →",
      en: "Explore section →"
    },
    cartTitle: {
      es: "Cotización de Evento",
      en: "Event Quote Summary"
    },
    emptyCartTitle: {
      es: "Aún no has agregado juegos",
      en: "No games selected yet"
    },
    emptyCartSubtitle: {
      es: "Explora el catálogo y agrega juegos o add-ons para calcular tu presupuesto con descuentos automáticos.",
      en: "Browse the catalog and add games or add-ons to calculate your quote with automatic discounts."
    },
    checkoutBtn: {
      es: "Solicitar Presupuesto",
      en: "Request Formal Quote"
    },
    backToHome: {
      es: "← Volver al catálogo",
      en: "← Back to catalog"
    },
    durationDays: {
      es: "Duración del evento:",
      en: "Event duration:"
    },
    gameDuration: {
      es: "Días:",
      en: "Days:"
    },
    assignAddonTo: {
      es: "Asignar a juego:",
      en: "Assign to game:"
    },
    selectGamePrompt: {
      es: "Selecciona un juego...",
      en: "Select a game..."
    },
    noGamesForAddon: {
      es: "Primero debes agregar al menos un juego a la cotización.",
      en: "You must add at least one game to the quote first."
    },
    discountsApplied: {
      es: "Descuentos Aplicados",
      en: "Discounts Applied"
    },
    grossTotal: {
      es: "Subtotal Bruto:",
      en: "Gross Subtotal:"
    },
    discountSavings: {
      es: "Ahorro total:",
      en: "Total Savings:"
    },
    finalTotal: {
      es: "Total Estimado:",
      en: "Estimated Total:"
    },
    contactWhatsApp: {
      es: "Enviar por WhatsApp",
      en: "Send via WhatsApp"
    },
    contactEmail: {
      es: "Enviar por Email",
      en: "Send via Email"
    },
    copySummary: {
      es: "Copiar Resumen",
      en: "Copy Summary"
    },
    copied: {
      es: "¡Resumen copiado al portapapeles!",
      en: "Summary copied to clipboard!"
    },
    companyNameLabel: {
      es: "Nombre de Productora / Empresa",
      en: "Company / Producer Name"
    },
    companyNamePlaceholder: {
      es: "Ej: Productora Eventos X / Empresa Y",
      en: "e.g. Events Agency X / Company Y"
    },
    eventDateLabel: {
      es: "Fecha tentativa del evento",
      en: "Tentative Event Date"
    },
    contactNameLabel: {
      es: "Tu Nombre",
      en: "Your Name"
    },
    contactInfoLabel: {
      es: "Email o Teléfono",
      en: "Email or Phone"
    },
    modalTitle: {
      es: "Solicitar Presupuesto Formal",
      en: "Request Formal Event Quote"
    },
    modalSubtitle: {
      es: "Ingresa los datos del evento para generar tu presupuesto desglosado con descuentos aplicados.",
      en: "Enter event details to generate your itemized quotation with applied discounts."
    },
    close: {
      es: "Cerrar",
      en: "Close"
    },
    contactStudioTitle: {
      es: "Hablemos de tu próximo evento",
      en: "Let's discuss your next event"
    },
    contactStudioSubtitle: {
      es: "¿Tienes un requerimiento especial, desarrollo a medida o consulta técnica? Escríbenos directamente.",
      en: "Have a custom development inquiry or technical question? Reach out to our team directly."
    },
    consultPrice: {
      es: "Consultar cotización a medida",
      en: "Inquire for custom quote"
    },
    addonsCount: {
      es: "Add-ons incluidos:",
      en: "Included add-ons:"
    },
    featuresIncluded: {
      es: "Características destacadas:",
      en: "Key features:"
    },
    contactUs: {
      es: "Contactanos",
      en: "Contact Us"
    },
    conceptBadge: {
      es: "💡 Concepto / En Desarrollo",
      en: "💡 Concept / In Development"
    },
    addClassicGame: {
      es: "+ Agregar Juego Clásico",
      en: "+ Add Classic Game"
    },
    addCustomGame: {
      es: "+ Agregar Juego A Medida",
      en: "+ Add Custom Game"
    },
    campaignsTitle: {
      es: "Juegos de Largo Alcance",
      en: "Long-Term & Campaign Games"
    },
    campaignsSubtitle: {
      es: "Videojuegos de duración extendida para capacitación interna en servidores del cliente, campañas promocionales web, educación y gamificación continua.",
      en: "Extended-duration games built for internal employee training on client servers, public web promo campaigns, education, and ongoing gamification."
    },
    templateBadge: {
      es: "⚙️ Plantilla / Mecánica Base",
      en: "⚙️ Base Game Template"
    },
    specPlayers: {
      es: "👥 Participantes",
      en: "👥 Players"
    },
    specMechanic: {
      es: "🎹 Mecánica Base",
      en: "🎹 Core Mechanic"
    },
    specB2bGoal: {
      es: "🎯 Objetivo B2B",
      en: "🎯 B2B Goal"
    },
    implementationsTitle: {
      es: "Casos e Implementaciones Reales",
      en: "Real Brand Implementations"
    },
    eventApplicationLabel: {
      es: "💡 Aplicación en Eventos:",
      en: "💡 Event Application:"
    },
    quoteTemplateBtn: {
      es: "+ Cotizar esta Mecánica",
      en: "+ Quote this Mechanic"
    },
    gamesInCartGroup: {
      es: "Juegos en tu cotización",
      en: "Games in your quote"
    },
    gamesInCatalogGroup: {
      es: "Agregar juego del catálogo + este módulo...",
      en: "Add game from catalog + this add-on..."
    },
    assignAddonBtn: {
      es: "+ Asignar",
      en: "+ Assign"
    },
    includedZeroCost: {
      es: "Sin cargo extra ($0)",
      en: "Included ($0)"
    },
    openGamePickerOption: {
      es: "➕ Agregar nuevo juego del catálogo...",
      en: "➕ Add new game from catalog..."
    },
    pickGameBtn: {
      es: "🎮 Elegir Juego...",
      en: "🎮 Pick Game..."
    },
    gamePickerModalTitle: {
      es: "Seleccionar Juego para Add-on",
      en: "Select Game for Add-on"
    },
    gamePickerSearchPlaceholder: {
      es: "🔍 Buscar juego por nombre...",
      en: "🔍 Search game by name..."
    },
    selectAndAssignBtn: {
      es: "+ Seleccionar y Asignar",
      en: "+ Select & Assign"
    },
    requestYours: {
      es: "✨ ¡Pedí el tuyo!",
      en: "✨ Request Yours!"
    },
    requestSimilar: {
      es: "Pedir uno similar →",
      en: "Request similar →"
    },
    estPerDay: {
      es: "Est.",
      en: "Est."
    },
    customCasesCount: {
      es: "Casos de Éxito",
      en: "Success Cases"
    },
    seeSuccessCase: {
      es: "Ver caso real →",
      en: "See real case →"
    },
    backToCustomGames: {
      es: "← Volver a Casos de Éxito",
      en: "← Back to Success Cases"
    },
    clearRefCase: {
      es: "✕ Cambiar a consulta general",
      en: "✕ Switch to general inquiry"
    },
    currentRefBadge: {
      es: "✨ Caso de referencia seleccionado",
      en: "✨ Selected reference case"
    },
    briefGuidelinesTitle: {
      es: "Guía rápida para contarnos qué necesitás",
      en: "Quick guide to brief your custom game"
    },
    briefOptionalNote: {
      es: "Ningún campo es obligatorio",
      en: "All fields are optional"
    },
    sendBriefWhatsApp: {
      es: "Enviar Brief por WhatsApp",
      en: "Send Brief via WhatsApp"
    },
    sendBriefEmail: {
      es: "Enviar Brief por Email",
      en: "Send Brief via Email"
    },
    copyBrief: {
      es: "Copiar Brief",
      en: "Copy Brief"
    },
    copiedBrief: {
      es: "¡Brief copiado al portapapeles!",
      en: "Brief copied to clipboard!"
    },
    useAsStartingPoint: {
      es: "✨ Usar como punto de partida",
      en: "✨ Use as starting point"
    },
    quoteBaseMechanicShort: {
      es: "+ Cotizar mecánica base",
      en: "+ Quote base mechanic"
    },
    basedOnCaseTag: {
      es: "Caso real:",
      en: "Real case:"
    },
    backToCampaigns: {
      es: "← Volver a Juegos de Largo Alcance",
      en: "← Back to Long-Term Games"
    },
    useScenarioFormat: {
      es: "✨ Usar este formato",
      en: "✨ Use this format"
    },
    requestCampaignYours: {
      es: "✨ ¡Creá tu proyecto!",
      en: "✨ Start Your Project!"
    },
    campaignCasesBadge: {
      es: "🚀 Proyecto a Medida",
      en: "🚀 Custom Project"
    },
    builtForLabel: {
      es: "Diseñado para:",
      en: "Built for:"
    },
    clientVerdictLabel: {
      es: "Veredicto del cliente",
      en: "Client Verdict"
    },
    directWhatsApp: {
      es: "WhatsApp Directo",
      en: "Direct WhatsApp"
    },
    allRightsReserved: {
      es: "Todos los derechos reservados.",
      en: "All rights reserved."
    },
    footerTaglineRight: {
      es: "Entretenimiento B2B & Activaciones de Marca",
      en: "B2B Event Entertainment & Brand Activations"
    },
    availableForEvents: {
      es: "Disponible para activaciones & eventos B2B",
      en: "Available for B2B activations & events"
    },
    inquireExperience: {
      es: "Consultar por esta experiencia",
      en: "Inquire about this experience"
    },
    inquireWhatsAppPrefix: {
      es: "Hola, me interesa consultar por ",
      en: "Hi, I'd like to inquire about "
    },
    inYourQuoteTag: {
      es: "(✓ En tu cotización)",
      en: "(✓ In your quote)"
    },
    noGamesFound: {
      es: "No se encontraron juegos con ese nombre.",
      en: "No games found matching that name."
    },
    promoDaysCartLabel: {
      es: "Promo 3+ días (50% OFF)",
      en: "Promo 3+ days (50% OFF)"
    },
    promoGamesCartLabel: {
      es: "Promo 4+ juegos (20% OFF)",
      en: "Promo 4+ games (20% OFF)"
    },
    contactNamePlaceholder: {
      es: "Nombre y Apellido",
      en: "Full Name"
    },
    contactInfoPlaceholder: {
      es: "Email o WhatsApp de contacto",
      en: "Contact Email or WhatsApp"
    },
    customBannerBadgeCotizador: {
      es: "Estimador & Brief Interactivo",
      en: "Estimator & Interactive Brief"
    },
    customBannerBadgeShowcase: {
      es: "Desarrollo Desde Cero",
      en: "Built From Scratch"
    },
    campaignBannerBadgeCotizador: {
      es: "Brief de Proyecto a Medida",
      en: "Custom Project Brief"
    },
    campaignBannerBadgeShowcase: {
      es: "Intranet, Web & Capacitación",
      en: "Intranet, Web & Training"
    }
  };

  class I18nManager {
    constructor() {
      this.hasExplicitPreference = false;
      this.hasGeoCache = false;
      this.currentLang = this.detectLanguage();
      document.documentElement.lang = this.currentLang;
      this.detectGeoLanguageAsync();
    }

    detectLangFromTimezone(tz) {
      if (!tz || typeof tz !== "string") return null;
      if (tz.startsWith("America/Argentina/") || SPANISH_TIMEZONES.has(tz)) {
        return "es";
      }
      return null;
    }

    detectLangFromCountry(countryCode) {
      if (!countryCode || typeof countryCode !== "string") return "en";
      return SPANISH_COUNTRIES.has(countryCode.trim().toUpperCase()) ? "es" : "en";
    }

    detectLanguage() {
      // 1. Check URL param ?lang=es|en
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang && (urlLang === "es" || urlLang === "en")) {
        this.hasExplicitPreference = true;
        return urlLang;
      }

      // 2. Check localStorage (manual override)
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && (stored === "es" || stored === "en")) {
          this.hasExplicitPreference = true;
          return stored;
        }
      } catch (e) {
        console.warn("localStorage not accessible", e);
      }

      // 3. Check sessionStorage geo cache
      try {
        const geoCached = sessionStorage.getItem(GEO_CACHE_KEY);
        if (geoCached && (geoCached === "es" || geoCached === "en")) {
          this.hasGeoCache = true;
          return geoCached;
        }
      } catch (e) {
        // sessionStorage may be unavailable
      }

      // 4. Timezone heuristic for instant location-aware first paint
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const tzLang = this.detectLangFromTimezone(tz);
        if (tzLang) {
          return tzLang;
        }
      } catch (e) {
        // Intl may be unavailable
      }

      // 5. Fallback to browser/OS locale (es-* defaults to 'es', everything else to 'en')
      const browserLang = (navigator.language || navigator.userLanguage || "es").toLowerCase();
      if (browserLang.startsWith("es")) {
        return "es";
      }

      return "en";
    }

    async detectGeoLanguageAsync() {
      if (this.hasExplicitPreference || this.hasGeoCache || typeof fetch !== "function") {
        return;
      }

      let timeoutId = null;
      try {
        const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
        if (controller) {
          timeoutId = setTimeout(() => controller.abort(), 2500);
        }

        const res = await fetch("https://api.country.is/", {
          method: "GET",
          signal: controller ? controller.signal : undefined
        });

        if (timeoutId) clearTimeout(timeoutId);
        if (!res || !res.ok) return;

        const data = await res.json();
        if (!data || !data.country) return;

        const detected = this.detectLangFromCountry(data.country);
        try {
          sessionStorage.setItem(GEO_CACHE_KEY, detected);
          this.hasGeoCache = true;
        } catch (e) {
          // ignore storage errors
        }

        // Only update if the user hasn't manually chosen a language since page load
        if (!this.hasExplicitPreference && detected !== this.currentLang) {
          this.currentLang = detected;
          document.documentElement.lang = detected;
          window.dispatchEvent(new CustomEvent("corpfolio:langchange", { detail: { lang: detected, source: "geo" } }));
        }
      } catch (e) {
        if (timeoutId) clearTimeout(timeoutId);
        // Fail silently and keep timezone/browser fallback
      }
    }

    getLang() {
      return this.currentLang;
    }

    setLang(lang) {
      if (lang !== "es" && lang !== "en") return;
      this.hasExplicitPreference = true;
      this.currentLang = lang;
      document.documentElement.lang = lang;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {
        console.warn("Failed to persist language in localStorage", e);
      }

      // Dispatch event for UI updates
      window.dispatchEvent(new CustomEvent("corpfolio:langchange", { detail: { lang } }));
    }

    toggle() {
      this.setLang(this.currentLang === "es" ? "en" : "es");
    }

    /**
     * Resolves localized image path (supports { es, en } objects or explicit -en asset mapping)
     */
    resolveImage(src) {
      if (!src) return "";
      if (typeof src === "object") {
        return this.t(src);
      }
      if (this.currentLang === "en" && LOCALIZED_IMAGES[src]) {
        return LOCALIZED_IMAGES[src];
      }
      return src;
    }

    /**
     * Resolves localized string from an object { es: "...", en: "..." } or string
     */
    t(obj) {
      if (!obj) return "";
      if (typeof obj === "string") return obj;
      return obj[this.currentLang] || obj["es"] || obj["en"] || "";
    }

    /**
     * Resolves static UI string from dictionary
     */
    ui(key) {
      const entry = UI_DICTIONARY[key];
      if (!entry) return key;
      return entry[this.currentLang] || entry["es"] || entry["en"] || key;
    }

    /**
     * Formats currency with thousands separators (e.g. $180.000 in ES, $180,000 in EN)
     */
    formatPrice(amount) {
      const num = Math.round(Number(amount) || 0);
      try {
        return new Intl.NumberFormat(this.currentLang === "es" ? "es-AR" : "en-US", {
          maximumFractionDigits: 0
        }).format(num);
      } catch (e) {
        return num.toLocaleString();
      }
    }
  }

  // Expose global instance
  const instance = new I18nManager();
  window.CorpfolioI18n = instance;
})();
