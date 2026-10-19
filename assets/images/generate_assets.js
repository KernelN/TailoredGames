const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function makeSvg(title, subtitle, accentColor, iconSvg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B0F19" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#161E31" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#0B0F19" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="500" fill="url(#bg)"/>
  <rect width="800" height="500" fill="url(#grid)"/>
  <circle cx="400" cy="220" r="280" fill="url(#glow)"/>

  <!-- Device Frame Outline -->
  <rect x="70" y="50" width="660" height="400" rx="16" fill="rgba(17, 24, 39, 0.75)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5"/>
  <rect x="70" y="50" width="660" height="400" rx="16" fill="none" stroke="${accentColor}" stroke-opacity="0.25" stroke-width="3"/>

  <!-- Top bar of the simulated device -->
  <rect x="70" y="50" width="660" height="42" rx="16" fill="rgba(11, 15, 25, 0.85)"/>
  <circle cx="95" cy="71" r="5" fill="#EF4444" opacity="0.8"/>
  <circle cx="112" cy="71" r="5" fill="#F59E0B" opacity="0.8"/>
  <circle cx="129" cy="71" r="5" fill="#10B981" opacity="0.8"/>
  <text x="400" y="76" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle" font-weight="600" letter-spacing="1">CORPFOLIO INTERACTIVE</text>

  <!-- Icon Graphic -->
  <g transform="translate(400, 210) scale(1.1)">
    ${iconSvg}
  </g>

  <!-- Titles -->
  <text x="400" y="360" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="28" font-weight="800" text-anchor="middle" letter-spacing="-0.5">${title}</text>
  <text x="400" y="390" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="14" font-weight="500" text-anchor="middle" letter-spacing="0.5">${subtitle}</text>

  <!-- Status Pill -->
  <rect x="330" y="415" width="140" height="24" rx="12" fill="${accentColor}" fill-opacity="0.15" stroke="${accentColor}" stroke-opacity="0.4"/>
  <circle cx="345" cy="427" r="4" fill="${accentColor}"/>
  <text x="405" y="431" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="1">EVENT-READY</text>
</svg>`;
}

const assets = [
  // Logo
  {
    path: 'assets/images/logo/logo.svg',
    content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 60" width="280" height="60">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366F1" />
          <stop offset="100%" stop-color="#10B981" />
        </linearGradient>
      </defs>
      <!-- Gamepad Icon -->
      <rect x="8" y="12" width="38" height="36" rx="10" fill="url(#logoGrad)"/>
      <path d="M 27 22 L 27 38 M 19 30 L 35 30" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <circle cx="38" cy="20" r="3" fill="#F59E0B"/>
      <!-- Text -->
      <text x="56" y="36" fill="#F8FAFC" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" letter-spacing="-0.5">Corpfolio</text>
      <text x="172" y="36" fill="#6366F1" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="300" letter-spacing="0">Studio</text>
    </svg>`
  },

  // Memotest
  {
    path: 'assets/images/games/memotest.svg',
    content: makeSvg('MEMOTEST', 'Juego de Memoria Táctil & Branded Cards', '#6366F1', `
      <rect x="-80" y="-70" width="45" height="60" rx="8" fill="#1E293B" stroke="#6366F1" stroke-width="2"/>
      <rect x="-25" y="-70" width="45" height="60" rx="8" fill="#6366F1"/>
      <text x="-2.5" y="-35" fill="#FFFFFF" font-size="24" font-weight="bold" text-anchor="middle">★</text>
      <rect x="30" y="-70" width="45" height="60" rx="8" fill="#1E293B" stroke="#6366F1" stroke-width="2"/>
      
      <rect x="-80" y="0" width="45" height="60" rx="8" fill="#6366F1"/>
      <text x="-57.5" y="35" fill="#FFFFFF" font-size="24" font-weight="bold" text-anchor="middle">★</text>
      <rect x="-25" y="0" width="45" height="60" rx="8" fill="#1E293B" stroke="#6366F1" stroke-width="2"/>
      <rect x="30" y="0" width="45" height="60" rx="8" fill="#1E293B" stroke="#6366F1" stroke-width="2"/>
    `)
  },
  {
    path: 'assets/images/games/memotest-detail.svg',
    content: makeSvg('MEMOTEST DETAIL', 'Configuración de Marca y Niveles', '#6366F1', `
      <circle cx="0" cy="-20" r="45" fill="none" stroke="#6366F1" stroke-width="4"/>
      <path d="M -20 -20 L -5 -5 L 25 -35" fill="none" stroke="#10B981" stroke-width="5" stroke-linecap="round"/>
    `)
  },

  // Simon Dice
  {
    path: 'assets/images/games/simon.svg',
    content: makeSvg('SIMÓN DICE', 'Secuencia Táctil de Luces & Sonidos', '#EC4899', `
      <circle cx="-35" cy="-35" r="32" fill="#EF4444"/>
      <circle cx="35" cy="-35" r="32" fill="#3B82F6"/>
      <circle cx="-35" cy="35" r="32" fill="#F59E0B"/>
      <circle cx="35" cy="35" r="32" fill="#10B981"/>
      <circle cx="0" cy="0" r="20" fill="#0B0F19" stroke="#1F2937" stroke-width="3"/>
    `)
  },
  {
    path: 'assets/images/games/simon-detail.svg',
    content: makeSvg('SIMÓN DICE PRO', 'Pulsadores Gigantes & Feedback Proyectado', '#EC4899', `
      <polygon points="0,-40 38,25 -38,25" fill="#EC4899" opacity="0.8"/>
    `)
  },

  // Trivia
  {
    path: 'assets/images/games/trivia.svg',
    content: makeSvg('TRIVIA CORPORATIVA', 'Preguntas & Respuestas Personalizadas', '#3B82F6', `
      <rect x="-70" y="-60" width="140" height="90" rx="12" fill="#1E293B" stroke="#3B82F6" stroke-width="2"/>
      <text x="0" y="-5" fill="#F8FAFC" font-size="44" font-weight="900" text-anchor="middle">?</text>
      <rect x="-55" y="42" width="110" height="12" rx="6" fill="#3B82F6"/>
    `)
  },
  {
    path: 'assets/images/games/trivia-detail.svg',
    content: makeSvg('TRIVIA METRICS', 'Métricas de Conocimiento en Vivo', '#3B82F6', `
      <rect x="-60" y="-40" width="30" height="70" rx="4" fill="#3B82F6"/>
      <rect x="-15" y="-60" width="30" height="90" rx="4" fill="#10B981"/>
      <rect x="30" y="-20" width="30" height="50" rx="4" fill="#6366F1"/>
    `)
  },

  // ABB Drones
  {
    path: 'assets/images/games/abb-drones.svg',
    content: makeSvg('ABB DRONES', 'Simulador de Pilotaje & Telemetría', '#10B981', `
      <circle cx="0" cy="-20" r="22" fill="#10B981"/>
      <line x1="-55" y1="-55" x2="55" y2="15" stroke="#10B981" stroke-width="4"/>
      <line x1="-55" y1="15" x2="55" y2="-55" stroke="#10B981" stroke-width="4"/>
      <circle cx="-55" cy="-55" r="14" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
      <circle cx="55" cy="-55" r="14" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
      <circle cx="-55" cy="15" r="14" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
      <circle cx="55" cy="15" r="14" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
    `)
  },
  {
    path: 'assets/images/games/abb-drones-detail.svg',
    content: makeSvg('ABB TELEMETRÍA', 'Pantallas Gigantes con Radar y Retos', '#10B981', `
      <circle cx="0" cy="-20" r="45" fill="none" stroke="#10B981" stroke-width="3"/>
      <line x1="0" y1="-65" x2="0" y2="25" stroke="#10B981" stroke-width="2"/>
      <line x1="-45" y1="-20" x2="45" y2="-20" stroke="#10B981" stroke-width="2"/>
    `)
  },

  // ABB Brazos
  {
    path: 'assets/images/games/abb-brazos.svg',
    content: makeSvg('ABB BRAZOS RECICLADORES', 'Robótica Industrial & Sustentabilidad', '#06B6D4', `
      <rect x="-40" y="20" width="80" height="15" rx="4" fill="#334155"/>
      <line x1="0" y1="20" x2="-25" y2="-20" stroke="#06B6D4" stroke-width="8" stroke-linecap="round"/>
      <line x1="-25" y1="-20" x2="30" y2="-50" stroke="#06B6D4" stroke-width="6" stroke-linecap="round"/>
      <circle cx="30" cy="-50" r="8" fill="#10B981"/>
    `)
  },
  {
    path: 'assets/images/games/abb-brazos-detail.svg',
    content: makeSvg('ABB ROBÓTICA', 'Automatización & Clasificación Inteligente', '#06B6D4', `
      <polygon points="-30,-40 30,-40 40,20 -40,20" fill="#06B6D4" opacity="0.7"/>
    `)
  },

  // Snake Airlines
  {
    path: 'assets/images/games/snake.svg',
    content: makeSvg('SNAKE AIRLINES', 'Vuelos Comerciales & Escalas Arcade', '#F59E0B', `
      <path d="M -60 20 L -20 20 L -20 -30 L 30 -30 L 30 10 L 60 10" fill="none" stroke="#F59E0B" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="60" cy="10" r="10" fill="#FFFFFF"/>
    `)
  },
  {
    path: 'assets/images/games/snake-detail.svg',
    content: makeSvg('SNAKE AIRLINES MAP', 'Hubs de Conexión & Power-ups', '#F59E0B', `
      <circle cx="-30" cy="-30" r="10" fill="#F59E0B"/>
      <circle cx="30" cy="10" r="10" fill="#F59E0B"/>
      <line x1="-30" y1="-30" x2="30" y2="10" stroke="#F59E0B" stroke-width="3" stroke-dasharray="6,6"/>
    `)
  },

  // Tap Gallery
  {
    path: 'assets/images/games/tap-gallery.svg',
    content: makeSvg('TAP GALLERY', 'Tiro al Blanco Táctil & Ritmo', '#8B5CF6', `
      <circle cx="0" cy="-20" r="45" fill="none" stroke="#8B5CF6" stroke-width="4"/>
      <circle cx="0" cy="-20" r="28" fill="none" stroke="#8B5CF6" stroke-width="3"/>
      <circle cx="0" cy="-20" r="12" fill="#EF4444"/>
    `)
  },
  {
    path: 'assets/images/games/tap-gallery-detail.svg',
    content: makeSvg('TAP GALLERY MULTITOUCH', 'Multiplicadores y Reacciones Rápidas', '#8B5CF6', `
      <polygon points="0,-60 18,-24 58,-24 26,4 38,44 0,20 -38,44 -26,4 -58,-24 -18,-24" fill="#8B5CF6"/>
    `)
  },

  // Addons
  {
    path: 'assets/images/addons/ranking.svg',
    content: makeSvg('TABLA DE PUNTUACIÓN', 'Leaderboard en Tiempo Real para Proyección', '#F59E0B', `
      <rect x="-60" y="-10" width="35" height="50" rx="4" fill="#334155"/>
      <rect x="-18" y="-45" width="36" height="85" rx="4" fill="#F59E0B"/>
      <rect x="25" y="10" width="35" height="30" rx="4" fill="#475569"/>
      <text x="0" y="-15" fill="#0B0F19" font-size="20" font-weight="900" text-anchor="middle">1</text>
    `)
  },
  {
    path: 'assets/images/addons/ranking-detail.svg',
    content: makeSvg('RANKING EN VIVO', 'Podio y Reconocimiento de Jugadores', '#F59E0B', `
      <polygon points="0,-50 14,-20 46,-20 20,4 30,34 0,16 -30,34 -20,4 -46,-20 -14,-20" fill="#F59E0B"/>
    `)
  },
  {
    path: 'assets/images/addons/registro.svg',
    content: makeSvg('REGISTRO DE USUARIO', 'Captura de Leads & Base de Datos', '#10B981', `
      <rect x="-50" y="-55" width="100" height="95" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
      <line x1="-30" y1="-30" x2="30" y2="-30" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>
      <line x1="-30" y1="-10" x2="30" y2="-10" stroke="#64748B" stroke-width="3" stroke-linecap="round"/>
      <line x1="-30" y1="10" x2="10" y2="10" stroke="#64748B" stroke-width="3" stroke-linecap="round"/>
    `)
  },
  {
    path: 'assets/images/addons/registro-detail.svg',
    content: makeSvg('BASE DE DATOS LEADS', 'Exportación Instantánea a Excel / CRM', '#10B981', `
      <rect x="-40" y="-40" width="80" height="70" rx="6" fill="#10B981" opacity="0.8"/>
    `)
  },
  {
    path: 'assets/images/addons/sorteo.svg',
    content: makeSvg('SORTEO DE PREMIOS', 'Entrega Instantánea de Premios y Merch', '#EC4899', `
      <rect x="-40" y="-20" width="80" height="60" rx="6" fill="#EC4899"/>
      <rect x="-46" y="-35" width="92" height="18" rx="4" fill="#F43F5E"/>
      <line x1="0" y1="-35" x2="0" y2="40" stroke="#FDE047" stroke-width="8"/>
      <line x1="-40" y1="10" x2="40" y2="10" stroke="#FDE047" stroke-width="6"/>
    `)
  },
  {
    path: 'assets/images/addons/sorteo-detail.svg',
    content: makeSvg('SORTEO AUTOMÁTICO', 'Activación por Puntaje Mínimo', '#EC4899', `
      <circle cx="0" cy="-15" r="35" fill="#EC4899"/>
      <text x="0" y="-2" fill="#FFFFFF" font-size="28" font-weight="900" text-anchor="middle">WIN</text>
    `)
  },

  // Tools
  {
    path: 'assets/images/tools/ruleta.svg',
    content: makeSvg('RULETA DIGITAL', 'Gajos Brandeables y Probabilidad Ajustable', '#6366F1', `
      <circle cx="0" cy="-20" r="50" fill="#1E293B" stroke="#6366F1" stroke-width="5"/>
      <line x1="0" y1="-70" x2="0" y2="30" stroke="#6366F1" stroke-width="2"/>
      <line x1="-50" y1="-20" x2="50" y2="-20" stroke="#6366F1" stroke-width="2"/>
      <polygon points="0,-78 -8,-90 8,-90" fill="#F59E0B"/>
    `)
  },
  {
    path: 'assets/images/tools/ruleta-detail.svg',
    content: makeSvg('RULETA EN VIVO', 'Efectos de Giro y Casino en Escenario', '#6366F1', `
      <circle cx="0" cy="-20" r="40" fill="#6366F1" opacity="0.6"/>
    `)
  },
  {
    path: 'assets/images/tools/sorteador.svg',
    content: makeSvg('SORTEADOR EN PANTALLA', 'Animación y Conteo Regresivo para Escenario', '#10B981', `
      <rect x="-60" y="-55" width="120" height="75" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
      <text x="0" y="-3" fill="#10B981" font-size="32" font-weight="900" text-anchor="middle"># 0 4 2</text>
    `)
  },
  {
    path: 'assets/images/tools/sorteador-detail.svg',
    content: makeSvg('SORTEO DE ESCENARIO', 'Carga de Asistentes desde Excel', '#10B981', `
      <polygon points="0,-45 35,25 -35,25" fill="#10B981" opacity="0.7"/>
    `)
  },

  // Campaigns
  {
    path: 'assets/images/campaigns/mi-gran-paseo.svg',
    content: makeSvg('MI GRAN PASEO', 'Campaña Lúdica Educativa & Publicitaria', '#3B82F6', `
      <circle cx="-30" cy="-40" r="22" fill="#3B82F6"/>
      <circle cx="30" cy="-20" r="28" fill="#10B981"/>
      <path d="M -50 25 Q 0 -10 50 25" fill="none" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/>
    `)
  },
  {
    path: 'assets/images/campaigns/mi-gran-paseo-detail.svg',
    content: makeSvg('CAMPAÑAS DE IMPACTO', 'Métricas de Aprendizaje & Concientización', '#3B82F6', `
      <rect x="-45" y="-35" width="90" height="60" rx="8" fill="#3B82F6" opacity="0.8"/>
    `)
  }
];

assets.forEach(asset => {
  const fullPath = path.join(__dirname, '..', '..', asset.path);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, asset.content.trim(), 'utf8');
  console.log('Created asset:', asset.path);
});

console.log('All SVG assets generated successfully!');
