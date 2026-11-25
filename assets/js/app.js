/**
 * Tailored Games — Landing Page Controller (index.html & cotizador.html)
 */

document.addEventListener("DOMContentLoaded", () => {
  const mode = document.body.getAttribute("data-mode") || "showcase";
  const renderer = window.CorpfolioRenderer;

  function renderAll() {
    if (!renderer) return;

    // 1. Navigation Header & Favicon
    renderer.renderHeader("header-mount", mode);

    // 2. Hero Section
    renderer.renderHero("hero-mount", mode);

    // 3. Promotional Banner
    renderer.renderPromoBanner("promo-mount");

    // 3. Split Columns (Clásicos & A Medida Carousels)
    renderer.renderSplitShowcase("split-showcase-mount", mode);

    // 4. Agregados Showcase (4-Screenshot Grid)
    renderer.renderAddonsShowcase("addons-mount", mode);

    // 5. Herramientas Showcase (Ruleta, Sorteador)
    renderer.renderToolsShowcase("tools-mount", mode);

    // 6. Campañas Showcase (Mi Gran Paseo)
    renderer.renderCampaignShowcase("campaign-mount", mode);

    // 7. Footer
    renderer.renderFooter("footer-mount");

    // 8. Quoting Cart Drawer (Only in Cotizador Mode)
    if (mode === "cotizador") {
      renderer.renderCartDrawer("cart-mount");
    }

    // 9. Initialize Auto-Carousels
    if (window.initCarousels) {
      window.initCarousels();
    }
  }

  // Initial render
  renderAll();

  // Re-render when language changes
  window.addEventListener("corpfolio:langchange", () => {
    renderAll();
  });
});
