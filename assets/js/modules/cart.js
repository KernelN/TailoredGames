/**
 * Corpfolio Studio — Quoting & Shopping Cart Engine
 * Manages cart state, duration multiplier, per-game add-ons, and compound promotions.
 */

(function () {
  const STORAGE_KEY = "corpfolio_cart";

  class CartManager {
    constructor() {
      this.items = []; // Array of { gameId, days, assignedAddons: [] }
      this.tools = []; // Array of { toolId, days }
      this.campaignInquiry = false;
      this.load();
    }

    load() {
      if (typeof localStorage === "undefined") return;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data = JSON.parse(stored);
          this.items = Array.isArray(data.items) ? data.items : [];
          this.tools = Array.isArray(data.tools) ? data.tools : [];
          this.campaignInquiry = !!data.campaignInquiry;
        }
      } catch (e) {
        console.warn("Failed to load cart from storage", e);
        this.items = [];
        this.tools = [];
      }
    }

    save() {
      if (typeof localStorage === "undefined") return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          items: this.items,
          tools: this.tools,
          campaignInquiry: this.campaignInquiry
        }));
      } catch (e) {
        console.warn("Failed to save cart to storage", e);
      }
      this.dispatchChange();
    }

    dispatchChange() {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("corpfolio:cartchange", {
          detail: this.getSummary()
        }));
      }
    }

    getCatalog() {
      if (typeof window !== "undefined") {
        if (window.CORPFOLIO_CATALOG) return window.CORPFOLIO_CATALOG;
      }
      if (typeof global !== "undefined") {
        if (global.CORPFOLIO_CATALOG) return global.CORPFOLIO_CATALOG;
      }
      return null;
    }

    findGame(gameId) {
      const catalog = this.getCatalog();
      if (!catalog) return null;
      for (const catKey of ['clasicos', 'aMedida']) {
        const cat = catalog.categories[catKey];
        if (cat && cat.items) {
          const found = cat.items.find(g => g.id === gameId || (Array.isArray(g.implementations) && g.implementations.some(impl => impl.id === gameId)));
          if (found) return found;
        }
      }
      return null;
    }

    findAddon(addonId) {
      const catalog = this.getCatalog();
      if (!catalog || !catalog.categories.agregados) return null;
      return catalog.categories.agregados.items.find(a => a.id === addonId);
    }

    findTool(toolId) {
      const catalog = this.getCatalog();
      if (!catalog || !catalog.categories.herramientas) return null;
      return catalog.categories.herramientas.items.find(t => t.id === toolId);
    }

    // Cart actions
    addGame(gameId, days = 1) {
      const existing = this.items.find(i => i.gameId === gameId);
      if (existing) {
        existing.days = Math.max(1, days);
      } else {
        this.items.push({
          gameId,
          days: Math.max(1, days),
          assignedAddons: []
        });
      }
      this.save();
    }

    removeGame(gameId) {
      this.items = this.items.filter(i => i.gameId !== gameId);
      this.save();
    }

    updateDays(gameId, days) {
      const existing = this.items.find(i => i.gameId === gameId);
      if (existing) {
        existing.days = Math.max(1, parseInt(days) || 1);
        this.save();
      }
    }

    setAllDays(days) {
      const validDays = Math.max(1, parseInt(days) || 1);
      this.items.forEach(i => { i.days = validDays; });
      this.tools.forEach(t => { t.days = validDays; });
      this.save();
    }

    hasGame(gameId) {
      return this.items.some(i => i.gameId === gameId);
    }

    getGameDays(gameId) {
      const item = this.items.find(i => i.gameId === gameId);
      return item ? item.days : 1;
    }

    assignAddon(addonId, targetGameId) {
      const gameItem = this.items.find(i => i.gameId === targetGameId);
      if (!gameItem) return false;
      if (!gameItem.assignedAddons.includes(addonId)) {
        gameItem.assignedAddons.push(addonId);
        this.save();
      }
      return true;
    }

    removeAddon(addonId, targetGameId) {
      const gameItem = this.items.find(i => i.gameId === targetGameId);
      if (gameItem) {
        gameItem.assignedAddons = gameItem.assignedAddons.filter(id => id !== addonId);
        this.save();
      }
    }

    addTool(toolId, days = 1) {
      const existing = this.tools.find(t => t.toolId === toolId);
      if (existing) {
        existing.days = Math.max(1, days);
      } else {
        this.tools.push({ toolId, days: Math.max(1, days) });
      }
      this.save();
    }

    removeTool(toolId) {
      this.tools = this.tools.filter(t => t.toolId !== toolId);
      this.save();
    }

    toggleCampaignInquiry(active) {
      this.campaignInquiry = typeof active === 'boolean' ? active : !this.campaignInquiry;
      this.save();
    }

    clear() {
      this.items = [];
      this.tools = [];
      this.campaignInquiry = false;
      this.save();
    }

    /**
     * Mathematical Quoting Engine
     * Calculates gross, compound promotions, and breakdown.
     */
    getSummary() {
      const catalog = this.getCatalog();
      let grossTotal = 0;
      const gameLines = [];
      const toolLines = [];

      // Calculate each game subtotal
      this.items.forEach(item => {
        const game = this.findGame(item.gameId);
        if (!game) return;

        let addonDailyTotal = 0;
        const attachedAddons = [];

        item.assignedAddons.forEach(addonId => {
          const addon = this.findAddon(addonId);
          if (addon) {
            addonDailyTotal += addon.dailyPrice;
            attachedAddons.push({
              id: addon.id,
              title: addon.title,
              dailyPrice: addon.dailyPrice
            });
          }
        });

        const dailyRate = game.dailyPrice + addonDailyTotal;
        const subtotal = dailyRate * item.days;
        grossTotal += subtotal;

        gameLines.push({
          gameId: game.id,
          title: game.title,
          baseDailyPrice: game.dailyPrice,
          addonDailyTotal,
          dailyRate,
          days: item.days,
          subtotal,
          addons: attachedAddons
        });
      });

      // Calculate tools subtotal
      this.tools.forEach(toolItem => {
        const tool = this.findTool(toolItem.toolId);
        if (!tool) return;
        const subtotal = tool.dailyPrice * toolItem.days;
        grossTotal += subtotal;

        toolLines.push({
          toolId: tool.id,
          title: tool.title,
          dailyPrice: tool.dailyPrice,
          days: toolItem.days,
          subtotal
        });
      });

      // Promotions calculation
      const daysRule = catalog?.promotions?.daysRule || { minDays: 3, discountPercent: 50 };
      const gamesRule = catalog?.promotions?.gamesRule || { minGames: 4, discountPercent: 20 };

      // Promo 1: 3+ days condition (if any game or tool has >= minDays)
      const qualifiesDaysPromo = this.items.some(i => i.days >= daysRule.minDays) ||
                                 this.tools.some(t => t.days >= daysRule.minDays);
      
      const daysDiscount = qualifiesDaysPromo ? (grossTotal * (daysRule.discountPercent / 100)) : 0;
      const subtotalAfterDays = grossTotal - daysDiscount;

      // Promo 2: 4+ unique games condition
      const uniqueGamesCount = this.items.length;
      const qualifiesGamesPromo = uniqueGamesCount >= gamesRule.minGames;

      const gamesDiscount = qualifiesGamesPromo ? (subtotalAfterDays * (gamesRule.discountPercent / 100)) : 0;
      const finalTotal = subtotalAfterDays - gamesDiscount;
      const totalDiscount = daysDiscount + gamesDiscount;

      return {
        gameLines,
        toolLines,
        campaignInquiry: this.campaignInquiry,
        totalItemsCount: this.items.length + this.tools.length,
        uniqueGamesCount,
        grossTotal,
        qualifiesDaysPromo,
        daysDiscount,
        qualifiesGamesPromo,
        gamesDiscount,
        totalDiscount,
        finalTotal
      };
    }

    /**
     * Itemized Text Summary Generator (used for WhatsApp, Mail, and Clipboard)
     */
    generateTextSummary(clientInfo = {}) {
      const summary = this.getSummary();
      const catalog = this.getCatalog();
      const i18n = (typeof window !== "undefined") ? (window.CorpfolioI18n) : null;
      const lang = i18n ? i18n.getLang() : "es";

      const fmt = (num) => {
        if (i18n && typeof i18n.formatPrice === "function") {
          return i18n.formatPrice(num);
        }
        return Math.round(Number(num) || 0).toLocaleString();
      };

      const t = (obj) => {
        if (!obj) return "";
        if (typeof obj === "string") return obj;
        return obj[lang] || obj["es"] || obj["en"] || "";
      };

      const studioName = catalog?.studioInfo?.name || "CORPFOLIO STUDIO";

      const lines = [];
      lines.push("══════════════════════════════════════");
      lines.push(lang === "es" ? `📋 SOLICITUD DE COTIZACIÓN — ${studioName.toUpperCase()}` : `📋 QUOTE REQUEST — ${studioName.toUpperCase()}`);
      lines.push("══════════════════════════════════════");
      lines.push("");

      if (clientInfo.companyName) {
        lines.push(`${lang === "es" ? "🏢 Empresa/Productora:" : "🏢 Company/Agency:"} ${clientInfo.companyName}`);
      }
      if (clientInfo.eventDate) {
        lines.push(`${lang === "es" ? "📅 Fecha tentativa:" : "📅 Event Date:"} ${clientInfo.eventDate}`);
      }
      if (clientInfo.contactName) {
        lines.push(`${lang === "es" ? "👤 Contacto:" : "👤 Contact:"} ${clientInfo.contactName}`);
      }
      if (clientInfo.contactInfo) {
        lines.push(`${lang === "es" ? "📞 Datos de contacto:" : "📞 Contact Info:"} ${clientInfo.contactInfo}`);
      }

      lines.push("");
      lines.push(lang === "es" ? "🎮 JUEGOS SELECCIONADOS:" : "🎮 SELECTED GAMES:");
      lines.push("──────────────────────────────────────");

      if (summary.gameLines.length === 0 && summary.toolLines.length === 0) {
        lines.push(lang === "es" ? "(Sin juegos en la cotización)" : "(No games in quote)");
      } else {
        summary.gameLines.forEach(g => {
          lines.push(`• ${t(g.title)}: $${fmt(g.dailyRate)}/día × ${g.days} ${lang === "es" ? "días" : "days"} = $${fmt(g.subtotal)}`);
          if (g.addons.length > 0) {
            g.addons.forEach(a => {
              lines.push(`   ↳ ${t(a.title)} (+$${fmt(a.dailyPrice)}/día)`);
            });
          }
        });

        summary.toolLines.forEach(tool => {
          lines.push(`• ${t(tool.title)}: $${fmt(tool.dailyPrice)}/día × ${tool.days} ${lang === "es" ? "días" : "days"} = $${fmt(tool.subtotal)}`);
        });
      }

      if (summary.campaignInquiry) {
        lines.push("");
        lines.push(`• ${lang === "es" ? "Campaña Especial:" : "Special Campaign:"} (${lang === "es" ? "Precio a convenir / Consulta personalizada" : "Custom quote request"})`);
      }

      lines.push("");
      lines.push("──────────────────────────────────────");
      lines.push(`${lang === "es" ? "Subtotal Bruto:" : "Gross Subtotal:"} $${fmt(summary.grossTotal)}`);

      const daysRule = catalog?.promotions?.daysRule || { minDays: 3, discountPercent: 50 };
      const gamesRule = catalog?.promotions?.gamesRule || { minGames: 4, discountPercent: 20 };

      if (summary.qualifiesDaysPromo) {
        lines.push(`✓ ${lang === "es" ? `Promo ${daysRule.minDays}+ días (${daysRule.discountPercent}% OFF):` : `Promo ${daysRule.minDays}+ days (${daysRule.discountPercent}% OFF):`} -$${fmt(summary.daysDiscount)}`);
      }
      if (summary.qualifiesGamesPromo) {
        lines.push(`✓ ${lang === "es" ? `Promo ${gamesRule.minGames}+ juegos (${gamesRule.discountPercent}% OFF):` : `Promo ${gamesRule.minGames}+ games (${gamesRule.discountPercent}% OFF):`} -$${fmt(summary.gamesDiscount)}`);
      }

      lines.push("══════════════════════════════════════");
      lines.push(`${lang === "es" ? "💰 TOTAL ESTIMADO:" : "💰 ESTIMATED TOTAL:"} $${fmt(summary.finalTotal)}`);
      lines.push("══════════════════════════════════════");
      lines.push("");
      lines.push(t(catalog?.promotions?.disclaimer));

      return lines.join("\n");
    }

    generateWhatsAppUrl(clientInfo = {}) {
      const catalog = this.getCatalog();
      const phone = catalog?.studioInfo?.whatsapp || "5491100000000";
      const text = this.generateTextSummary(clientInfo);
      return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    }

    generateMailtoUrl(clientInfo = {}) {
      const catalog = this.getCatalog();
      const email = catalog?.studioInfo?.email || "contacto@corpfolio.com";
      const i18n = (typeof window !== "undefined") ? (window.CorpfolioI18n) : null;
      const lang = i18n ? i18n.getLang() : "es";
      const studioName = catalog?.studioInfo?.name || "Corpfolio Studio";
      const subject = lang === "es" 
        ? `Solicitud de Presupuesto — ${clientInfo.companyName || studioName}` 
        : `Quote Request — ${clientInfo.companyName || studioName}`;
      const body = this.generateTextSummary(clientInfo);
      return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  const instance = new CartManager();

  if (typeof window !== "undefined") {
    window.CorpfolioCart = instance;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = CartManager;
  }
})();
