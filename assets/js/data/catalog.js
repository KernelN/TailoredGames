/**
 * Tailored Games — Catalog & Configuration Data
 * Generated via Visual Local Editor (editor.html)
 */

const CORPFOLIO_CATALOG = {
  "studioInfo": {
    "name": "Tailored Games",
    "logo": "assets/images/logo/logo-full-cleanish.png",
    "favicon": "assets/images/logo/logo.svg",
    "tagline": {
      "es": "Videojuegos y dinámicas táctiles diseñadas desde cero a tu medida, pensadas para captar la atención de tu público y potenciar tus eventos.",
      "en": "Video games and touch experiences designed from scratch tailored to you, crafted to captivate your audience and empower your events."
    },
    "heroTitle": {
      "es": "Juegos a Medida",
      "en": "Custom Games"
    },
    "heroSubtitle": {
      "es": "Videojuegos y dinámicas táctiles diseñadas desde cero a tu medida, pensadas para captar la atención de tu público y potenciar tus eventos.",
      "en": "Video games and touch experiences designed from scratch tailored to you, crafted to captivate your audience and empower your events."
    },
    "whatsapp": "541124992975",
    "email": "tailoredlabs@gmail.com"
  },
  "promotions": {
    "daysRule": {
      "minDays": 3,
      "discountPercent": 50,
      "label": {
        "es": "Promo [days]+ días: [discount]% OFF sobre el total",
        "en": "Promo [days]+ days: [discount]% OFF total booking"
      }
    },
    "gamesRule": {
      "minGames": 4,
      "discountPercent": 20,
      "label": {
        "es": "Promo [games]+ juegos: [discount]% OFF sobre el total",
        "en": "Promo [games]+ games: [discount]% OFF total booking"
      }
    },
    "disclaimer": {
      "es": "Precio por día de cada juego. No incluye pantalla LCD ni guardia técnica.",
      "en": "Daily rate per game. Does not include LCD display or technical standby."
    }
  },
  "categories": {
    "clasicos": {
      "id": "clasicos",
      "title": {
        "es": "Juegos Clásicos",
        "en": "Classic Games"
      },
      "subtitle": {
        "es": "Dinámicas familiares y adictivas adaptadas con tecnología táctil moderna.",
        "en": "Familiar, addictive game dynamics reimagined with modern touchscreen technology."
      },
      "items": [
        {
          "id": "memotest",
          "title": {
            "es": "Memotest",
            "en": "Memory Match"
          },
          "category": "clasicos",
          "dailyPrice": 712400,
          "visible": true,
          "showcase": true,
          "image": "assets/images/games/memotest.png",
          "screenshots": [
            "assets/images/games/memotest.svg",
            "assets/images/games/memotest-detail.svg"
          ],
          "description": {
            "es": "Encuentra las parejas de cartas en pantallas táctiles interactivas con branding e iconografía 100% personalizada de la empresa.",
            "en": "Find matching card pairs on interactive touchscreens with 100% customized company branding and iconography."
          },
          "features": {
            "es": [
              "Dificultades configurables",
              "Cartas con logos/productos",
              "Ideal para rotación rápida"
            ],
            "en": [
              "Configurable difficulty",
              "Custom logo/product cards",
              "Fast player turnover"
            ]
          },
          "tags": {
            "es": [
              "Memoria",
              "Brandeable",
              "Ágil"
            ],
            "en": [
              "Memory",
              "Brandable",
              "Fast-paced"
            ]
          },
          "hours": 7.5,
          "priceOverride": 0
        },
        {
          "id": "simon-dice",
          "title": {
            "es": "Simón Dice",
            "en": "Simon Says"
          },
          "category": "clasicos",
          "dailyPrice": 729500,
          "visible": true,
          "showcase": true,
          "image": "assets/images/games/simon.png",
          "screenshots": [
            "assets/images/games/simon.svg",
            "assets/images/games/simon-detail.svg"
          ],
          "description": {
            "es": "Secuencia de luces y sonidos táctiles donde los participantes ponen a prueba su memoria visual y auditiva.",
            "en": "Light and sound sequence challenge testing visual and auditory memory under pressure."
          },
          "features": {
            "es": [
              "Secuencias con ritmo ascendente",
              "Efectos visuales y sonoros reactivos",
              "Partidas cortas y atrapantes"
            ],
            "en": [
              "Progressive rhythm sequences",
              "Reactive audio & visual FX",
              "Short, engaging gameplay"
            ]
          },
          "tags": {
            "es": [
              "Agil",
              "Sonido",
              "Luces"
            ],
            "en": [
              "Fast-paced",
              "Audio",
              "Lights"
            ]
          },
          "hours": 8,
          "priceOverride": 0
        },
        {
          "id": "trivia",
          "title": {
            "es": "Trivia",
            "en": "Trivia"
          },
          "category": "clasicos",
          "dailyPrice": 661100,
          "visible": true,
          "showcase": true,
          "image": "assets/images/games/trivia.png",
          "screenshots": [
            "assets/images/games/trivia.svg",
            "assets/images/games/trivia-detail.svg"
          ],
          "description": {
            "es": "Juego de preguntas y respuestas personalizadas sobre la cultura de la empresa, productos o temática del evento.",
            "en": "Customizable trivia Q&A game about company culture, products, or event themes."
          },
          "features": {
            "es": [
              "Preguntas con imágenes y timer",
              "Puntaje por velocidad",
              "Métricas de aciertos en tiempo real"
            ],
            "en": [
              "Timed questions with images",
              "Speed-based scoring",
              "Real-time accuracy metrics"
            ]
          },
          "tags": {
            "es": [
              "Preguntas",
              "Educativo",
              "Competitivo"
            ],
            "en": [
              "Trivia",
              "Educational",
              "Competitive"
            ]
          },
          "hours": 6,
          "priceOverride": 0
        }
      ]
    },
    "aMedida": {
      "id": "aMedida",
      "title": {
        "es": "Juegos A Medida",
        "en": "Custom Games"
      },
      "subtitle": {
        "es": "Mecánicas base probadas y personalizables con casos reales para stands y activaciones B2B.",
        "en": "Proven, customizable base mechanics backed by real implementations for B2B booths and activations."
      },
      "items": [
        {
          "id": "abb-drones",
          "title": {
            "es": "Desafío en Carriles",
            "en": "Lane Rush"
          },
          "category": "aMedida",
          "dailyPrice": 1174100,
          "visible": true,
          "showcase": true,
          "isConcept": false,
          "image": "assets/images/games/lane-rush.svg",
          "screenshots": [
            "assets/images/games/lane-rush.svg",
            "assets/images/games/abb-drones.png"
          ],
          "description": {
            "es": "Un juego de reflejos y coordinación en pantalla táctil donde dos participantes juegan codo a codo. Cada uno toca los objetivos que avanzan por su carril en el momento justo para mantener el ritmo, sumar puntos y lograr la mejor racha de equipo.",
            "en": "A fast-paced touch reflex game where two players team up side by side. Each player taps targets speeding down their lane with perfect timing to build streak combos, spark laughter, and test team coordination."
          },
          "templateSpecs": {
            "players": {
              "es": "2 Jugadores (Cooperativo)",
              "en": "2 Players (Co-op)"
            },
            "mechanic": {
              "es": "Reflejos táctiles por carriles sincronizados",
              "en": "Synchronized lane touch reflexes"
            },
            "b2bGoal": {
              "es": "Coordinación, trabajo en equipo y alta atracción de público",
              "en": "Teamwork, coordination & high crowd attraction"
            }
          },
          "features": {
            "es": [
              "Trabajo en equipo sin castigo: el mapa siempre reverdece",
              "Soporte multi-touch con respuesta inmediata",
              "Gráficos y elementos 100% personalizables con la marca"
            ],
            "en": [
              "Encouraging co-op loop: the world only gets greener",
              "Multi-touch support with instant responsiveness",
              "100% brandable visuals and terrain elements"
            ]
          },
          "tags": {
            "es": [
              "Cooperativo",
              "Multi-Touch",
              "Reflejos",
              "Pantalla Gigante"
            ],
            "en": [
              "Co-op",
              "Multi-Touch",
              "Reflexes",
              "Large Screen"
            ]
          },
          "implementations": [
            {
              "id": "impl-abb-drones",
              "title": {
                "es": "Drones Reforestadores",
                "en": "Reforestation Drones"
              },
              "client": {
                "es": "ABB — Family Day (Ecología)",
                "en": "ABB — Family Day (Ecology)"
              },
              "image": "assets/images/games/abb-drones.png",
              "summary": {
                "es": "Dos participantes comandan drones virtuales en pantalla táctil coordinando disparos de semillas y agua para hacer florecer un bosque, con recuento final de árboles plantados.",
                "en": "Two players pilot touchscreen virtual drones coordinating seed and water drops to make a forest bloom, concluding with a tree-planting impact count."
              },
              "builtFor": {
                "es": "ABB Family Day — Jornada familiar centrada en ecología, creada para incentivar el cuidado de la naturaleza y la reforestación a través de una experiencia divertida en equipo.",
                "en": "ABB Family Day — Family event centered around ecology, created to encourage caring for nature and reforestation through a fun, collaborative experience."
              },
              "clientVerdict": {
                "quote": {
                  "es": "",
                  "en": ""
                },
                "author": {
                  "es": "",
                  "en": ""
                }
              }
            }
          ],
          "hours": 21,
          "priceOverride": 0
        },
        {
          "id": "abb-brazos",
          "title": {
            "es": "Clasificador Veloz",
            "en": "Fast Sorter"
          },
          "category": "aMedida",
          "dailyPrice": 1071500,
          "visible": true,
          "showcase": true,
          "isConcept": false,
          "image": "assets/images/games/fast-sorter.svg",
          "screenshots": [
            "assets/images/games/fast-sorter.svg",
            "assets/images/games/fast-sorter.png",
            "assets/images/games/abb-brazos.png"
          ],
          "description": {
            "es": "Un dinámico juego táctil de clasificación rápida. Los participantes deben atrapar elementos que circulan a toda velocidad y enviarlos al contenedor correcto antes de que caigan, pudiendo pasarse ítems entre compañeros para multiplicar el puntaje.",
            "en": "An exhilarating quick-sorting touch game. Players catch fast-moving items along the line and drop them into the matching goal before time runs out, passing special items to their teammate to boost team multipliers."
          },
          "templateSpecs": {
            "players": {
              "es": "1 o 2 Jugadores (Cooperativo o Duelo)",
              "en": "1 or 2 Players (Co-op or Duel)"
            },
            "mechanic": {
              "es": "Agarre táctil, derivación por cintas y pases entre compañeros",
              "en": "Touch grab, belt sorting & teammate item hand-offs"
            },
            "b2bGoal": {
              "es": "Dinamismo en stand, agilidad mental y trabajo coordinado",
              "en": "Booth dynamism, mental agility & coordinated teamwork"
            }
          },
          "features": {
            "es": [
              "Mecánica de pases colaborativos entre jugadores",
              "Contenedores y elementos tematizables según la empresa",
              "Racha de combos con aceleración progresiva"
            ],
            "en": [
              "Cooperative item passing between teammates",
              "Customizable bins and items matching company products",
              "Streak combo multiplier with progressive speed ramp"
            ]
          },
          "tags": {
            "es": [
              "Robótica",
              "Clasificación",
              "Cintas",
              "Competitivo"
            ],
            "en": [
              "Robotics",
              "Sorting",
              "Conveyors",
              "Competitive"
            ]
          },
          "implementations": [
            {
              "id": "impl-abb-brazos",
              "title": {
                "es": "Brazos Clasificadores",
                "en": "Sorting Arms"
              },
              "client": {
                "es": "ABB — Family Day (Ecología)",
                "en": "ABB — Family Day (Ecology)"
              },
              "image": "assets/images/games/abb-brazos.png",
              "summary": {
                "es": "Brazos robóticos virtuales en pantalla grande clasificando materiales reciclables hacia sus contenedores correspondientes a ritmo acelerado para eventos de sustentabilidad.",
                "en": "Virtual robotic arms on a large screen sorting recyclables into correct bins at an accelerating pace for sustainability events."
              },
              "builtFor": {
                "es": "ABB Family Day — Jornada familiar centrada en ecología, pensada para enseñar información real sobre reciclaje y separación de residuos a través de un juego accesible para todas las edades.",
                "en": "ABB Family Day — Family event centered around ecology, designed to teach real-world recycling and waste-sorting facts through an approachable game for all ages."
              },
              "clientVerdict": {
                "quote": {
                  "es": "",
                  "en": ""
                },
                "author": {
                  "es": "",
                  "en": ""
                }
              }
            }
          ],
          "hours": 18,
          "priceOverride": 0
        },
        {
          "id": "abb-ensamblado-circular",
          "title": {
            "es": "Ensamblado Circular",
            "en": "Circular Assembly"
          },
          "category": "aMedida",
          "dailyPrice": 1242500,
          "visible": true,
          "showcase": true,
          "isConcept": false,
          "image": "assets/images/games/circular-assembly.svg",
          "screenshots": [
            "assets/images/games/circular-assembly.svg"
          ],
          "description": {
            "es": "Desafío cooperativo de armado y coordinación. Mientras un participante organiza y limpia piezas que llegan por diferentes vías, el otro las combina siguiendo patrones visuales para completar modelos terminados contra reloj.",
            "en": "A cooperative assembly challenge. One player organizes incoming components across different tracks, while their teammate combines them to build finished products before the clock runs out."
          },
          "templateSpecs": {
            "players": {
              "es": "1 o 2 Jugadores (Dupla o Solitario)",
              "en": "1 or 2 Players (Duo or Solo)"
            },
            "mechanic": {
              "es": "Clasificación, preparación y ensamblaje por patrones",
              "en": "Sorting, prep & pattern assembly"
            },
            "b2bGoal": {
              "es": "Economía circular, procesos de manufactura y calidad",
              "en": "Circular economy, manufacturing & quality control"
            }
          },
          "features": {
            "es": [
              "Flujo integral de economía circular: reciclado y re-manufactura",
              "Recetas visuales sin texto, máxima accesibilidad",
              "Aceleración y complejidad creciente a lo largo de la partida"
            ],
            "en": [
              "Complete circular economy loop: recycle & remanufacture",
              "Diegetic visual recipes without text for universal accessibility",
              "Progressive difficulty ramp over the session"
            ]
          },
          "tags": {
            "es": [
              "Manufactura",
              "Economía Circular",
              "Estrategia",
              "Recetas"
            ],
            "en": [
              "Manufacturing",
              "Circular Economy",
              "Strategy",
              "Recipes"
            ]
          },
          "implementations": [
            {
              "id": "impl-abb-ensamblado",
              "title": {
                "es": "Ensamblado Circular de Robots",
                "en": "Circular Robot Assembly"
              },
              "client": {
                "es": "ABB — Family Day (Ecología)",
                "en": "ABB — Family Day (Ecology)"
              },
              "image": "assets/images/games/abb-circular-assembly.png",
              "summary": {
                "es": "Transformación de chatarra en robots de última generación, ideal para stands de manufactura, ingeniería y procesos circulares.",
                "en": "Transforming scrap parts into next-generation robots, ideal for manufacturing, engineering, and circular economy booths."
              },
              "builtFor": {
                "es": "ABB Family Day — Jornada familiar centrada en ecología, creada para concientizar sobre la economía circular y evitar el desperdicio mediante una dinámica divertida y cooperativa.",
                "en": "ABB Family Day — Family event centered around ecology, created to promote circular economy habits and waste reduction through a fun, cooperative challenge."
              },
              "clientVerdict": {
                "quote": {
                  "es": "",
                  "en": ""
                },
                "author": {
                  "es": "",
                  "en": ""
                }
              }
            }
          ],
          "hours": 23,
          "priceOverride": 0
        },
        {
          "id": "ensamblado-versus",
          "title": {
            "es": "Ensamblado Versus",
            "en": "Assembly Versus"
          },
          "category": "aMedida",
          "dailyPrice": 1105700,
          "visible": true,
          "showcase": false,
          "isConcept": true,
          "image": "assets/images/games/assembly-versus.svg",
          "screenshots": [
            "assets/images/games/assembly-versus.svg"
          ],
          "description": {
            "es": "Duelo cara a cara en pantalla dividida lleno de adrenalina. Dos participantes compiten directamente por atrapar piezas que caen en una zona central neutral, intentando ganarle de mano a su rival para completar primero su objetivo.",
            "en": "High-energy face-to-face duel on a split screen. Two players compete to grab shared components falling through a central neutral zone, racing to beat their rival to the finish line."
          },
          "templateSpecs": {
            "players": {
              "es": "2 Jugadores (Duelo Competitivo)",
              "en": "2 Players (Competitive Duel)"
            },
            "mechanic": {
              "es": "Captura de piezas en zona neutral y armado por planos",
              "en": "Neutral zone component grab & blueprint assembly"
            },
            "b2bGoal": {
              "es": "Competencia de alto impacto, adrenalina y atracción en ferias",
              "en": "High-impact crowd attraction, adrenaline & trade show duels"
            }
          },
          "features": {
            "es": [
              "Partidas frenéticas de 60 segundos cara a cara",
              "Zona neutral disputada con caída acelerada por gravedad",
              "Modelos y planos personalizables con maquinaria o productos de la marca"
            ],
            "en": [
              "Fast 60-second face-to-face duels",
              "Contested neutral zone with gravity-accelerated falling parts",
              "Customizable blueprints featuring brand machines or products"
            ]
          },
          "tags": {
            "es": [
              "Versus",
              "Competitivo",
              "Reflejos",
              "Pantalla Dividida"
            ],
            "en": [
              "Versus",
              "Competitive",
              "Reflexes",
              "Split-Screen"
            ]
          },
          "implementations": [],
          "hours": 19,
          "priceOverride": 0
        },
        {
          "id": "snake",
          "title": {
            "es": "Snake",
            "en": "Snake"
          },
          "category": "aMedida",
          "dailyPrice": 712400,
          "visible": true,
          "showcase": false,
          "isConcept": true,
          "image": "assets/images/games/snake.svg",
          "screenshots": [
            "assets/images/games/snake.svg"
          ],
          "description": {
            "es": "La clásica mecánica de la viborita adaptada a pantallas táctiles corporativas: navegación fluida recolectando hitos que aumentan el largo de la cadena, con recorte de longitud en caso de colisión.",
            "en": "The classic snake mechanic reimagined for corporate touchscreens: fluid navigation collecting milestones that extend your trail, with segment trimming on collision."
          },
          "templateSpecs": {
            "players": {
              "es": "1 Jugador (Alta Rotación)",
              "en": "1 Player (Fast Turnover)"
            },
            "mechanic": {
              "es": "Navegación en cuadrícula y recolección continua",
              "en": "Grid navigation & continuous collection"
            },
            "b2bGoal": {
              "es": "Logística, rutas, redes de distribución y partidas rápidas",
              "en": "Logistics, routes, distribution networks & agile play"
            }
          },
          "features": {
            "es": [
              "Regla de recorte de cola en lugar de muerte instantánea para mantener la diversión",
              "Hitos y power-ups tematizables con la marca",
              "Partidas dinámicas de 60 a 90 segundos"
            ],
            "en": [
              "Tail-trimming collision rule instead of instant game over to sustain fun",
              "Brandable milestones and power-ups",
              "Dynamic 60–90 second sessions"
            ]
          },
          "tags": {
            "es": [
              "Arcade",
              "Casual",
              "Ágil",
              "Personalizable"
            ],
            "en": [
              "Arcade",
              "Casual",
              "Fast-Paced",
              "Customizable"
            ]
          },
          "implementations": [],
          "hours": 7.5,
          "priceOverride": 0
        },
        {
          "id": "triple-snake",
          "title": {
            "es": "Triple Snake",
            "en": "Triple Snake"
          },
          "category": "aMedida",
          "dailyPrice": 866300,
          "visible": true,
          "showcase": false,
          "isConcept": true,
          "image": "assets/images/games/triple-snake.svg",
          "screenshots": [
            "assets/images/games/triple-snake.svg"
          ],
          "description": {
            "es": "Innovadora variante donde el jugador guía simultáneamente a 3 entidades mediante trazos táctiles en pantalla. Cada entidad recolecta un tipo específico de elemento y puede obtener mejoras especiales evitando choques cruzados.",
            "en": "Innovative multi-collector mechanic where players guide 3 entities simultaneously via finger-drawing paths. Each entity gathers a specific category, unlocking upgrades while avoiding cross-collisions."
          },
          "templateSpecs": {
            "players": {
              "es": "1 o 2 Jugadores",
              "en": "1 or 2 Players"
            },
            "mechanic": {
              "es": "Trazado simultáneo de trayectorias táctiles para 3 recolectores",
              "en": "Simultaneous finger-drawn path navigation for 3 collectors"
            },
            "b2bGoal": {
              "es": "Clasificación multirubro, agilidad mental y alto engagement",
              "en": "Multi-category sorting, mental speed & high engagement"
            }
          },
          "features": {
            "es": [
              "Control por dibujo de trazo táctil fluido e intuitivo",
              "3 categorías simultáneas con power-ups desbloqueables",
              "Excelente para transmitir separación, clasificación o procesos de 3 vías"
            ],
            "en": [
              "Fluid and intuitive finger-drawn gesture controls",
              "3 simultaneous categories with unlockable upgrades",
              "Ideal for communicating 3-way sorting, logistics or multi-stream flows"
            ]
          },
          "tags": {
            "es": [
              "Táctil",
              "Multitarea",
              "Trazado",
              "Innovador"
            ],
            "en": [
              "Touch",
              "Multitasking",
              "Path-Drawing",
              "Innovative"
            ]
          },
          "implementations": [],
          "hours": 12,
          "priceOverride": 0
        },
        {
          "id": "crossy",
          "title": {
            "es": "Crossy",
            "en": "Crossy"
          },
          "category": "aMedida",
          "dailyPrice": 797900,
          "visible": true,
          "showcase": false,
          "isConcept": true,
          "image": "assets/images/games/crossy.svg",
          "screenshots": [
            "assets/images/games/crossy.svg"
          ],
          "description": {
            "es": "Mecánica arcade de avance continuo donde los participantes guían un personaje o vehículo tocando los lados de la pantalla para esquivar obstáculos móviles y saltar sobre plataformas flotantes para llegar al objetivo.",
            "en": "Classic obstacle-crossing arcade mechanic where players tap the screen edges to dodge moving traffic and hop across dynamic floating platforms to reach the goal."
          },
          "templateSpecs": {
            "players": {
              "es": "1 Jugador (Partidas Dinámicas)",
              "en": "1 Player (Dynamic Sessions)"
            },
            "mechanic": {
              "es": "Cruce de carriles con timing, cálculo de saltos y plataformas móviles",
              "en": "Lane crossing with timing, platform hops & moving obstacles"
            },
            "b2bGoal": {
              "es": "Fácil aprendizaje, partidas adictivas y competencia por ranking",
              "en": "Instant learnability, addictive gameplay & leaderboard contest"
            }
          },
          "features": {
            "es": [
              "Controles táctiles instantáneos: un toque para avanzar y corregir dirección",
              "Obstáculos y plataformas 100% ambientables con la identidad del cliente",
              "Ideal para proyectar tabla de puntuación en vivo"
            ],
            "en": [
              "Instant touch controls: tap to advance and adjust position",
              "100% themeable obstacles and platforms reflecting brand assets",
              "Perfect to pair with live stage leaderboards"
            ]
          },
          "tags": {
            "es": [
              "Arcade",
              "Timing",
              "Reflejos",
              "Adictivo"
            ],
            "en": [
              "Arcade",
              "Timing",
              "Reflexes",
              "Addictive"
            ]
          },
          "implementations": [],
          "hours": 10,
          "priceOverride": 0
        },
        {
          "id": "crossy-duo",
          "title": {
            "es": "Crossy Duo",
            "en": "Crossy Duo"
          },
          "category": "aMedida",
          "dailyPrice": 866300,
          "visible": true,
          "showcase": false,
          "isConcept": true,
          "image": "assets/images/games/crossy-duo.svg",
          "screenshots": [
            "assets/images/games/crossy-duo.svg"
          ],
          "description": {
            "es": "Dinámica cooperativa donde dos participantes controlan al mismo personaje desde lados opuestos de la pantalla: el Jugador 1 toca a la izquierda para impulsarlo hacia la derecha, mientras que el Jugador 2 toca a la derecha para enviarlo hacia la izquierda, coordinando cada movimiento para esquivar obstáculos.",
            "en": "Cooperative directional game where two players control a shared character from opposite sides of the screen: Player 1 taps on the left to push the character right, while Player 2 taps on the right to send it back left, coordinating every move to dodge incoming obstacles."
          },
          "templateSpecs": {
            "players": {
              "es": "2 Jugadores (Cooperativo de Coordinación)",
              "en": "2 Players (Cooperative Coordination)"
            },
            "mechanic": {
              "es": "Control direccional cruzado (J1 mueve a derecha, J2 mueve a izquierda)",
              "en": "Cross-directional touch control (P1 moves right, P2 moves left)"
            },
            "b2bGoal": {
              "es": "Trabajo en equipo, comunicación constante y activación de duplas",
              "en": "Teamwork, constant communication & paired activations"
            }
          },
          "features": {
            "es": [
              "Control compartido: cada jugador maneja una dirección desde su lado de la pantalla",
              "Exige sincronización y comunicación verbal inmediata para esquivar obstáculos",
              "Personaje, obstáculos y carriles tematizables según la industria del cliente"
            ],
            "en": [
              "Shared control: each player commands one direction from their side of the screen",
              "Demands instant synchronization and communication to dodge hazards",
              "Customizable character, obstacles, and lanes tailored to the client's industry"
            ]
          },
          "tags": {
            "es": [
              "Cooperativo",
              "Carriles",
              "Relevos",
              "Velocidad"
            ],
            "en": [
              "Co-op",
              "Lanes",
              "Relay",
              "Speed"
            ]
          },
          "implementations": [],
          "hours": 12,
          "priceOverride": 0
        },
        {
          "id": "tap-gallery",
          "title": {
            "es": "Tap Gallery",
            "en": "Tap Gallery"
          },
          "category": "aMedida",
          "dailyPrice": 797900,
          "visible": true,
          "showcase": true,
          "isConcept": false,
          "image": "assets/images/games/tap-gallery.svg",
          "screenshots": [
            "assets/images/games/tap-gallery.svg",
            "assets/images/games/tap-gallery.png"
          ],
          "description": {
            "es": "Escenario interactivo de objetivos dinámicos donde los participantes deben detectar y tocar rápidamente elementos que asoman, saltan o corren por la pantalla, sumando combos y evitando penalizaciones.",
            "en": "Interactive moving-target stage where players spot and tap targets that peek, jump, or run across the screen, building combo streaks while avoiding decoy penalties."
          },
          "templateSpecs": {
            "players": {
              "es": "1 Jugador (Competencia por Ranking)",
              "en": "1 Player (Leaderboard Competition)"
            },
            "mechanic": {
              "es": "Detección visual y toque rápido con objetivos móviles y señuelos",
              "en": "Visual spotting & rapid tap with moving targets and decoys"
            },
            "b2bGoal": {
              "es": "Reflejos, reconocimiento de marca y alta rotación en stands",
              "en": "Reflexes, brand recognition & high booth throughput"
            }
          },
          "features": {
            "es": [
              "Comportamientos dinámicos: asomarse, saltar y huir por el escenario",
              "Señuelos con penalización de puntaje para desafiar la atención",
              "Sesiones cortas y explosivas de 60 segundos"
            ],
            "en": [
              "Dynamic behaviors: peek, jump, and run across the stage",
              "Decoy targets with point penalties to challenge focus",
              "Short, explosive 60-second sessions"
            ]
          },
          "tags": {
            "es": [
              "Reflejos",
              "Velocidad",
              "Competitivo",
              "Arcade"
            ],
            "en": [
              "Reflexes",
              "Speed",
              "Competitive",
              "Arcade"
            ]
          },
          "implementations": [
            {
              "id": "impl-tap-gallery",
              "title": {
                "es": "Cacería de Brokers (GeTravel)",
                "en": "Broker Hunt (GeTravel)"
              },
              "client": {
                "es": "GE Travel — Evento RE/MAX",
                "en": "GE Travel — RE/MAX Event"
              },
              "image": "assets/images/games/tap-gallery.png",
              "summary": {
                "es": "Activación lúdica donde los participantes deben capturar a brokers fugitivos de Remax que viajan por distintos destinos del mundo gracias a GeTravel, apareciendo sorpresivamente en aeropuertos y atracciones.",
                "en": "Playful activation where players spot and capture rogue Remax brokers travelling worldwide via GeTravel, popping up unexpectedly across international airports and iconic destinations."
              },
              "builtFor": {
                "es": "Stand de GE Travel en un evento de RE/MAX — Creado para atraer clientes al stand y generar risas y diversión al ver caras conocidas de la empresa en pantalla.",
                "en": "GE Travel booth at a RE/MAX event — Created to attract clients to the booth and spark laughs and fun as attendees spot familiar company faces right on screen."
              },
              "clientVerdict": {
                "quote": {
                  "es": "",
                  "en": ""
                },
                "author": {
                  "es": "",
                  "en": ""
                }
              }
            }
          ],
          "hours": 10,
          "priceOverride": 0
        }
      ]
    },
    "agregados": {
      "id": "agregados",
      "title": {
        "es": "Agregados para Juegos",
        "en": "Game Add-Ons"
      },
      "subtitle": {
        "es": "Módulos adicionales que potencian la captación de leads, engagement y competencia en cada juego.",
        "en": "Additional modules that boost lead capture, engagement, and competitive excitement for each game."
      },
      "items": [
        {
          "id": "ranking-live",
          "title": {
            "es": "Tabla de Puntuación (Leaderboard)",
            "en": "Live Leaderboard"
          },
          "dailyPrice": 0,
          "visible": true,
          "showcase": true,
          "image": "assets/images/addons/ranking.svg",
          "screenshots": [
            "assets/images/addons/ranking.svg",
            "assets/images/addons/ranking-detail.svg"
          ],
          "description": {
            "es": "Pantalla de ranking en tiempo real proyectable para premiar a los mejores jugadores y encender la competencia en el evento.",
            "en": "Real-time leaderboard display ready for stage projection to reward top players and spark event competition."
          },
          "features": {
            "es": [
              "Sincronización en vivo con todos los juegos",
              "Diseño adaptable al branding del evento",
              "Ideal para sorteos y entregas de premios"
            ],
            "en": [
              "Real-time live sync across all games",
              "Custom styling matching event branding",
              "Ideal for stage raffles & awards"
            ]
          },
          "tags": {
            "es": [
              "Competencia",
              "Pantalla Gigante"
            ],
            "en": [
              "Competition",
              "Big Screen"
            ]
          },
          "hours": 0,
          "priceOverride": 0
        },
        {
          "id": "registro-usuario",
          "title": {
            "es": "Registro de Usuario / Captura de Leads",
            "en": "User Registration / Lead Capture"
          },
          "dailyPrice": 0,
          "visible": true,
          "showcase": true,
          "image": "assets/images/addons/registro.svg",
          "screenshots": [
            "assets/images/addons/registro.svg",
            "assets/images/addons/registro-detail.svg"
          ],
          "description": {
            "es": "Formulario táctil previo a la partida (nombre, email, teléfono, empresa) con teclado en pantalla y exportación de base de datos.",
            "en": "Touchscreen pre-game form (name, email, phone, company) with on-screen virtual keyboard and structured database export."
          },
          "features": {
            "es": [
              "Campos 100% personalizables",
              "Validación automática de email",
              "Exportación a Excel / CSV post-evento"
            ],
            "en": [
              "100% customizable form fields",
              "Automatic email validation",
              "Excel / CSV export post-event"
            ]
          },
          "tags": {
            "es": [
              "Leads",
              "Base de Datos"
            ],
            "en": [
              "Leads",
              "Database"
            ]
          },
          "hours": 0,
          "priceOverride": 0
        },
        {
          "id": "sorteo-premio",
          "title": {
            "es": "Sorteo Automático de Premios",
            "en": "Automated Prize Giveaway"
          },
          "dailyPrice": 51300,
          "visible": true,
          "showcase": true,
          "image": "assets/images/addons/sorteo.svg",
          "screenshots": [
            "assets/images/addons/sorteo.svg",
            "assets/images/addons/sorteo-detail.svg"
          ],
          "description": {
            "es": "Sistema que premia aleatoriamente a jugadores que superen cierta marca de puntos con entrega inmediata de premios o merchandising.",
            "en": "Automated prize raffle triggered when players reach target score thresholds, perfect for instant swag giveaway."
          },
          "features": {
            "es": [
              "Probabilidad y stock de premios regulable",
              "Animación sorpresa en pantalla",
              "Control contra doble premio"
            ],
            "en": [
              "Adjustable prize odds & inventory",
              "Surprise win animation",
              "Duplicate prevention logic"
            ]
          },
          "tags": {
            "es": [
              "Premios",
              "Merchandising"
            ],
            "en": [
              "Prizes",
              "Swag"
            ]
          },
          "hours": 1.5,
          "priceOverride": 0
        }
      ]
    },
    "herramientas": {
      "id": "herramientas",
      "title": {
        "es": "Herramientas de Evento",
        "en": "Event Tools"
      },
      "subtitle": {
        "es": "Módulos independientes para dinamizar escenarios, stands y sorteos corporativos.",
        "en": "Standalone digital tools to energize stages, brand booths, and corporate giveaways."
      },
      "items": [
        {
          "id": "ruleta-digital",
          "title": {
            "es": "Ruleta Digital Brandeable",
            "en": "Brandable Digital Roulette"
          },
          "dailyPrice": 205200,
          "visible": true,
          "showcase": true,
          "image": "assets/images/tools/ruleta.svg",
          "screenshots": [
            "assets/images/tools/ruleta.svg",
            "assets/images/tools/ruleta-detail.svg"
          ],
          "description": {
            "es": "Ruleta de la fortuna con probabilidades matemáticas, gajos y premios 100% configurables para entrega de regalos en vivo.",
            "en": "Custom prize wheel with configurable slices, odds, and branded gifts for live crowd excitement."
          },
          "features": {
            "es": [
              "Efectos de sonido estilo casino",
              "Gajos con colores y logos",
              "Ajuste de probabilidad por premio"
            ],
            "en": [
              "Casino-style sound effects",
              "Custom logo & color slices",
              "Per-prize probability weighting"
            ]
          },
          "tags": {
            "es": [
              "Stand",
              "Premios Directos"
            ],
            "en": [
              "Booth",
              "Instant Prizes"
            ]
          },
          "hours": 6,
          "priceOverride": 0
        },
        {
          "id": "sorteador-pantalla",
          "title": {
            "es": "Sorteador en Pantalla Gigante",
            "en": "Stage Screen Raffle System"
          },
          "dailyPrice": 171000,
          "visible": true,
          "showcase": true,
          "image": "assets/images/tools/sorteador.svg",
          "screenshots": [
            "assets/images/tools/sorteador.svg",
            "assets/images/tools/sorteador-detail.svg"
          ],
          "description": {
            "es": "Animación de sorteo con conteo regresivo dramático y efectos especiales diseñada para proyectar en el escenario principal.",
            "en": "Exciting countdown and special-effects raffle animation designed for projection onto main event stages."
          },
          "features": {
            "es": [
              "Carga de lista desde Excel",
              "Animación de suspenso con sonido",
              "Validación de ganadores presentes"
            ],
            "en": [
              "Import list from Excel",
              "Suspense audio & visual FX",
              "Absentee redraw toggle"
            ]
          },
          "tags": {
            "es": [
              "Escenario",
              "Sorteo En Vivo"
            ],
            "en": [
              "Main Stage",
              "Live Raffle"
            ]
          },
          "hours": 5,
          "priceOverride": 0
        }
      ]
    },
    "campanas": {
      "id": "campanas",
      "title": {
        "es": "Juegos como Campaña",
        "en": "Games as Campaigns"
      },
      "subtitle": {
        "es": "Soluciones lúdicas de mediano y largo plazo orientadas a educación, concientización o publicidad masiva.",
        "en": "Medium-to-long term playful solutions for education, awareness, or mass marketing campaigns."
      },
      "items": [
        {
          "id": "mi-increible-paseo",
          "title": {
            "es": "Mi Increíble Paseo",
            "en": "Mi Increíble Paseo"
          },
          "priceNote": {
            "es": "Precio a convenir",
            "en": "Custom quote on request"
          },
          "visible": true,
          "showcase": true,
          "image": "assets/images/campaigns/mi-increible-paseo.png",
          "screenshots": [
            "assets/images/campaigns/mi-increible-paseo.png",
            "assets/images/campaigns/mi-increible-paseo-detail.png"
          ],
          "description": {
            "es": "Serious game de simulación y gestión turística estilo Point & Click (inspirado en dinámicas como Papa's Pizzeria y Papers, Please). El jugador asume el rol de gestor turístico en San Telmo, atendiendo a diversos visitantes y diseñando recorridos personalizados que cumplan con sus expectativas culturales e históricas.",
            "en": "Point & Click serious game and tourism simulation (inspired by titles like Papa's Pizzeria and Papers, Please). Players step into the role of a tourism manager in historic San Telmo, attending to visitors and designing custom walking tours that match their cultural and historical interests."
          },
          "features": {
            "es": [
              "Mapa interactivo con lugares reales e información histórica",
              "Mecánicas accesibles estilo Point & Click con alta usabilidad",
              "Adaptable a cualquier ciudad, programa educativo o campaña cultural"
            ],
            "en": [
              "Interactive map featuring real heritage landmarks and cultural trivia",
              "Accessible Point & Click mechanics with high usability",
              "Adaptable to any city, educational program, or cultural campaign"
            ]
          },
          "tags": {
            "es": [
              "Simulación",
              "Point & Click",
              "Serious Game",
              "Educativo"
            ],
            "en": [
              "Simulation",
              "Point & Click",
              "Serious Game",
              "Educational"
            ]
          }
        }
      ]
    }
  },
  "pricingConfig": {
    "hourlyRateUsd": 15,
    "usdToArsRate": 1520,
    "timeMultiplier": 1.5,
    "gameBasePrice": 455900
  },
  "customBriefConfig": {
    "bannerTitle": {
      "es": "¡Pedí el tuyo!",
      "en": "Request Your Custom Game!"
    },
    "bannerSubtitle": {
      "es": "Diseñamos videojuegos y dinámicas táctiles desde cero para tu marca, temática y público. Contanos sobre tu evento o inspirate en nuestras mecánicas base.",
      "en": "We design interactive touch games from scratch tailored to your brand, theme, and audience. Tell us about your event or get inspired by our base mechanics."
    },
    "bannerCta": {
      "es": "Armar mi brief / Ver ideas →",
      "en": "Start my brief / See ideas →"
    },
    "pageTitle": {
      "es": "Pedí tu Juego a Medida",
      "en": "Request Your Custom Game"
    },
    "pageSubtitle": {
      "es": "Completá los puntos que ya tengas definidos (ningún campo es obligatorio) para enviarnos tu consulta en 1 clic, o explorá nuestras mecánicas base debajo.",
      "en": "Fill in whatever details you already have (all fields are optional) to send your inquiry in 1 click, or explore our base mechanics below."
    },
    "inspiredHeroPrefix": {
      "es": "Quiero una experiencia inspirada en [case]...",
      "en": "I'd like an experience inspired by [case]..."
    },
    "inspiredHeroSubtitle": {
      "es": "Tomamos la dinámica probada de [case] y la adaptamos 100% a tu marca, estética y objetivos del evento. Contanos qué te gustaría personalizar o cambiar.",
      "en": "We take the proven core loop of [case] and tailor it 100% to your brand, visuals, and event goals. Tell us what you'd like to customize or change."
    },
    "defaultIdeaLabel": {
      "es": "¿Tenés una idea en mente? (Opcional)",
      "en": "Do you have a specific idea in mind? (Optional)"
    },
    "defaultIdeaPlaceholder": {
      "es": "Contanos brevemente qué imaginás. Si todavía no tenés una idea definida, dejalo vacío y completá los puntos siguientes para que te propongamos opciones.",
      "en": "Briefly describe what you envision. If you don't have an idea yet, leave this blank and fill in the details below so we can pitch concepts."
    },
    "inspiredIdeaLabel": {
      "es": "¿Qué te gustaría adaptar, sumar o cambiar respecto a [case]?",
      "en": "What would you like to adapt, add, or change from [case]?"
    },
    "inspiredIdeaPlaceholder": {
      "es": "Ej: Me encantó la dinámica, pero ambientada en nuestra industria, con nuestros productos, otra duración o formato de jugadores...",
      "en": "e.g. Loved the mechanic, but themed around our industry, featuring our products, or with a different duration or player format..."
    },
    "fields": {
      "companyLabel": {
        "es": "Empresa / Rubro",
        "en": "Company / Industry"
      },
      "companyPlaceholder": {
        "es": "Ej: Fintech, Automotriz, Productora de Eventos...",
        "en": "e.g. Fintech, Automotive, Event Agency..."
      },
      "themeLabel": {
        "es": "Temática del Evento",
        "en": "Event Theme"
      },
      "themePlaceholder": {
        "es": "Ej: Sustentabilidad, Lanzamiento, Convención Anual...",
        "en": "e.g. Sustainability, Product Launch, Annual Summit..."
      },
      "dateLabel": {
        "es": "Fecha tentativa y duración",
        "en": "Tentative Date & Duration"
      },
      "datePlaceholder": {
        "es": "Ej: Noviembre 2026, 2 días",
        "en": "e.g. November 2026, 2 days"
      }
    },
    "guidelines": [
      {
        "es": "Si ya tenés una idea o mecánica en mente, contanos lo esencial (aunque sea un boceto).",
        "en": "If you already have an idea or mechanic in mind, share the essentials (even a rough sketch)."
      },
      {
        "es": "Si todavía no sabés qué juego hacer, indicanos tu rubro, temática y público para que te propongamos 2 o 3 opciones.",
        "en": "If you don't have a concept yet, share your industry, event theme, and audience so we can pitch 2–3 tailored options."
      },
      {
        "es": "Sumá fecha tentativa y duración del evento para confirmar disponibilidad y estimar presupuesto.",
        "en": "Include tentative dates and duration so we can confirm availability and prepare an accurate estimate."
      },
      {
        "es": "Todos los campos son opcionales: podés escribirnos directo por WhatsApp o Email en 1 clic en cualquier momento.",
        "en": "Every field is optional: you can reach out directly via WhatsApp or Email in 1 click at any time."
      }
    ],
    "pillGroups": [
      {
        "id": "audience",
        "multiSelect": true,
        "label": {
          "es": "¿Para quién es el juego?",
          "en": "Who is the game for?"
        },
        "options": [
          {
            "es": "Clientes / Leads",
            "en": "Clients / Leads"
          },
          {
            "es": "Empleados / Equipo",
            "en": "Employees / Team"
          },
          {
            "es": "Familias / Niños",
            "en": "Families / Kids"
          },
          {
            "es": "Público General",
            "en": "General Public"
          },
          {
            "es": "Ejecutivos / VIP",
            "en": "Executives / VIP"
          }
        ]
      },
      {
        "id": "goal",
        "multiSelect": true,
        "label": {
          "es": "Objetivo principal",
          "en": "Main Event Goal"
        },
        "options": [
          {
            "es": "Captación de Leads",
            "en": "Lead Capture"
          },
          {
            "es": "Activación de Marca",
            "en": "Brand Activation"
          },
          {
            "es": "Team Building",
            "en": "Team Building"
          },
          {
            "es": "Alta Rotación en Stand",
            "en": "High Booth Turnover"
          },
          {
            "es": "Educación / Concientización",
            "en": "Education / Awareness"
          }
        ]
      }
    ],
    "mechanicsSectionTitle": {
      "es": "Mecánicas Base e Ideas de Referencia",
      "en": "Base Mechanics & Reference Ideas"
    },
    "mechanicsSectionSubtitleShowcase": {
      "es": "¿Buscás inspiración? Explorá estas mecánicas probadas y personalizables como punto de partida para tu próximo evento.",
      "en": "Looking for inspiration? Explore these proven, customizable mechanics as a starting point for your next event."
    },
    "mechanicsSectionSubtitleCotizador": {
      "es": "Explorá estas mecánicas personalizables para inspirarte, ver valores estimados por día y sumarlas directamente a tu cotización.",
      "en": "Explore these customizable mechanics for inspiration, see estimated daily rates, and add them directly to your quote."
    }
  },
  "campaignBriefConfig": {
    "bannerTitle": {
      "es": "¡Creá tu Juego de Largo Alcance!",
      "en": "Build Your Long-Term Game!"
    },
    "bannerSubtitle": {
      "es": "Desarrollamos experiencias interactivas de duración extendida para servidores del cliente o web pública.",
      "en": "We build extended-duration interactive experiences for client servers or public web."
    },
    "bannerCta": {
      "es": "Armar mi brief / Ver formatos →",
      "en": "Start my brief / See formats →"
    },
    "pageTitle": {
      "es": "Pedí tu Juego de Largo Alcance",
      "en": "Request Your Long-Term Game"
    },
    "pageSubtitle": {
      "es": "Completá los datos que ya tengas (todos los campos son opcionales) para enviarnos tu consulta en 1 clic.",
      "en": "Fill in whatever details you already have (all fields are optional) to send your inquiry in 1 click."
    },
    "inspiredHeroPrefix": {
      "es": "Quiero un proyecto inspirado en [case]...",
      "en": "I'd like a project inspired by [case]..."
    },
    "inspiredHeroSubtitle": {
      "es": "Tomamos la profundidad y dinámica de [case] y la diseñamos a medida para tu empresa o campaña.",
      "en": "We take the depth and core loop of [case] and tailor it from scratch for your company or campaign."
    },
    "defaultIdeaLabel": {
      "es": "¿Tenés un proyecto o idea en mente? (Opcional)",
      "en": "Do you have a project or idea in mind? (Optional)"
    },
    "defaultIdeaPlaceholder": {
      "es": "Contanos brevemente qué querés lograr...",
      "en": "Briefly describe what you want to achieve..."
    },
    "inspiredIdeaLabel": {
      "es": "¿Qué te gustaría adaptar, sumar o cambiar respecto a [case]?",
      "en": "What would you like to adapt, add, or change from [case]?"
    },
    "inspiredIdeaPlaceholder": {
      "es": "Ej: Nos gustó el formato, pero aplicado a capacitación interna...",
      "en": "e.g. Loved the format, tailored to internal training..."
    },
    "fields": {
      "companyLabel": {
        "es": "Empresa / Institución / Rubro",
        "en": "Company / Organization / Industry"
      },
      "companyPlaceholder": {
        "es": "Ej: Banco, Retail, Universidad...",
        "en": "e.g. Bank, Retail, University..."
      },
      "themeLabel": {
        "es": "Temática o Contenido a comunicar",
        "en": "Theme or Content to Convey"
      },
      "themePlaceholder": {
        "es": "Ej: Onboarding, Seguridad vial...",
        "en": "e.g. Onboarding, Safety..."
      },
      "dateLabel": {
        "es": "Plazo estimado de lanzamiento",
        "en": "Target Launch Window"
      },
      "datePlaceholder": {
        "es": "Ej: Q3 2026 / En 2 meses",
        "en": "e.g. Q3 2026 / In 2 months"
      }
    },
    "guidelines": [],
    "pillGroups": [],
    "scenariosSectionTitle": {
      "es": "Formatos y Escenarios Posibles",
      "en": "Solution Formats & Scenarios"
    },
    "scenariosSectionSubtitle": {
      "es": "Ejemplos de cómo empresas, marcas e instituciones despliegan juegos de largo alcance.",
      "en": "Examples of how companies, brands, and institutions deploy long-term games."
    },
    "scenarios": []
  }
};

if (typeof window !== "undefined") {
  window.CORPFOLIO_CATALOG = CORPFOLIO_CATALOG;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = CORPFOLIO_CATALOG;
}
