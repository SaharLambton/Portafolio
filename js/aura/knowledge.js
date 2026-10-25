/* ==========================================================
   AURA · Base de conocimiento
   Aquí vive todo lo que el asistente sabe. Para cambiar su
   nombre, textos o respuestas, edita solo este archivo.
   ========================================================== */
window.AURA_KB = {
    config: {
        name: 'AURA',
        // Cuando conectemos una IA real: URL de un endpoint que reciba
        // POST { message, lang, history } y responda { reply }.
        // Mientras esté vacío, AURA solo usa esta base local.
        aiEndpoint: ''
    },

    /* ---------- Secuencia de bienvenida ---------- */
    welcome: {
        es: [
            '¡Hola! 👋 Bienvenido al portafolio digital de Sahar Chain. Soy {name}, su asistente inteligente.',
            'Sahar es programadora, desarrolladora web y diseñadora de marca, formada en Lambton College (Canadá) y creando experiencias digitales desde 2019.',
            'Aquí puedes explorar sus proyectos de desarrollo web, branding y programación, su stack tecnológico, su experiencia y cómo contactarla.',
            '¿Por dónde quieres empezar? Toca una opción o escríbeme tu pregunta.'
        ],
        en: [
            'Hi! 👋 Welcome to Sahar Chain\'s digital portfolio. I\'m {name}, her intelligent assistant.',
            'Sahar is a programmer, web developer and brand designer, trained at Lambton College (Canada) and crafting digital experiences since 2019.',
            'Here you can explore her web development, branding and programming projects, her tech stack, her experience and how to reach her.',
            'Where would you like to start? Tap an option or type your question.'
        ]
    },
    returning: {
        es: 'Sistema reactivado. Hola de nuevo 👋 ¿Qué quieres explorar ahora?',
        en: 'System back online. Welcome back 👋 What would you like to explore?'
    },
    langSwitched: {
        es: 'Idioma cambiado a español. ¿En qué te ayudo?',
        en: 'Language switched to English. How can I help?'
    },
    poke: {
        es: ['¡Eso hace cosquillas! ⚡ ¿Quieres que te muestre algo?', 'Núcleo estable y funcionando al 100%. Pregúntame lo que quieras.', 'Sigo aquí 👀 ¿Te cuento sobre algún proyecto?'],
        en: ['That tickles! ⚡ Want me to show you something?', 'Core stable and running at 100%. Ask me anything.', 'Still here 👀 Shall I tell you about a project?']
    },
    fallback: {
        es: 'Todavía no tengo esa información en mis registros 🤖. Puedo contarte sobre los proyectos de Sahar, sus tecnologías, su experiencia, sus servicios o cómo contactarla.',
        en: 'I don\'t have that in my records yet 🤖. I can tell you about Sahar\'s projects, technologies, experience, services or how to contact her.'
    },

    /* ---------- Comentarios de AURA en cada pestaña ----------
       intro: primer mensaje del chat en esa pestaña.
       enter: comentario al entrar (una vez por visita, en el globo).
       sections: comentario cuando aparece una sección con data-aura-say="clave".
       ---------------------------------------------------------------- */
    pages: {
        home: {
            sections: {
                pilares: {
                    es: 'Estos son los cuatro pilares de Sahar. Pasa el cursor sobre cada uno y haz clic para ver sus proyectos de esa área.',
                    en: 'These are Sahar\'s four pillars. Hover over each one and click to see her projects in that area.'
                },
                vistazo: {
                    es: 'Aquí tienes una muestra rápida. Si quieres ver todo, la pestaña Proyectos tiene el archivo completo.',
                    en: 'Here\'s a quick sample. If you want to see everything, the Projects tab has the full archive.'
                }
            }
        },
        about: {
            chips: ['experience', 'skills', 'education', 'cv'],
            intro: {
                es: 'Estás en el expediente de Sahar: su perfil, trayectoria y habilidades. Pregúntame lo que quieras sobre ella.',
                en: 'You\'re in Sahar\'s file: her profile, journey and skills. Ask me anything about her.'
            },
            enter: {
                es: 'Bienvenido al expediente de Sahar. Aquí está quién es, de dónde viene y con qué trabaja.',
                en: 'Welcome to Sahar\'s file. Here\'s who she is, where she comes from and what she works with.'
            },
            sections: {
                trayectoria: {
                    es: 'Su trayectoria va desde cofundar Únicos en Bogotá en 2019 hasta trabajar por su cuenta en Colombia y Canadá.',
                    en: 'Her journey goes from co-founding Únicos in Bogotá in 2019 to working independently in Colombia and Canada.'
                },
                habilidades: {
                    es: 'Las habilidades están agrupadas por sus cuatro pilares. Cada color corresponde a uno.',
                    en: 'Skills are grouped by her four pillars. Each color matches one of them.'
                }
            }
        },
        projects: {
            chips: ['web', 'design', 'code', 'contact'],
            intro: {
                es: 'Este es el archivo de proyectos de Sahar. Puedo contarte sobre cualquiera de ellos.',
                en: 'This is Sahar\'s project archive. I can tell you about any of them.'
            },
            enter: {
                es: 'Este es el archivo de proyectos. Si te interesa el branding, te recomiendo empezar por Zohar.',
                en: 'This is the project archive. If you\'re into branding, I recommend starting with Zohar.'
            },
            filters: {
                web: { es: 'Estos son los desarrollos web: tiendas en línea, sitios corporativos y páginas responsive.', en: 'These are the web builds: online stores, corporate sites and responsive pages.' },
                code: { es: 'Estos son los proyectos de programación: sistemas en TypeScript y Node.js, pruebas automatizadas, integración continua y yo, AURA.', en: 'These are the programming projects: TypeScript and Node.js systems, automated tests, continuous integration and me, AURA.' },
                ai: { es: 'En IA, el proyecto principal soy yo 🤖. Pronto habrá más.', en: 'In AI, the main project is me 🤖. More are coming soon.' },
                design: { es: 'Aquí está el trabajo de branding de Sahar. Zohar y MetalTec son dos de los más completos.', en: 'Here is Sahar\'s branding work. Zohar and MetalTec are two of the most complete ones.' },
                marketing: { es: 'Estos proyectos incluyen estrategia digital y redes sociales, además del diseño.', en: 'These projects include digital strategy and social media, on top of design.' }
            }
        },
        services: {
            chips: ['workshops', 'hire', 'contact'],
            intro: {
                es: 'Aquí están los servicios de Sahar. Si me cuentas qué necesitas, te digo cuál encaja mejor.',
                en: 'Here are Sahar\'s services. Tell me what you need and I\'ll point you to the right one.'
            },
            enter: {
                es: 'Estos son los servicios de Sahar. ¿Tienes un proyecto en mente? Pregúntame y te oriento.',
                en: 'These are Sahar\'s services. Got a project in mind? Ask me and I\'ll guide you.'
            },
            sections: {
                proceso: {
                    es: 'Así trabaja Sahar: primero escucha tu idea, luego te envía una propuesta con precio, y te acompaña hasta después de la entrega.',
                    en: 'This is how Sahar works: she listens to your idea first, then sends you a priced proposal, and supports you even after delivery.'
                }
            }
        },
        contact: {
            chips: ['hire', 'cv', 'services'],
            intro: {
                es: 'Desde aquí puedes escribirle a Sahar directamente. Te respondo cualquier duda antes de que lo hagas.',
                en: 'From here you can reach Sahar directly. I can answer any question before you do.'
            },
            enter: {
                es: '¿Listo para hablar con Sahar? Escríbele por WhatsApp o déjale tu mensaje en el formulario: responde en 24–48 horas.',
                en: 'Ready to talk to Sahar? Message her on WhatsApp or leave your message in the form: she replies within 24–48 hours.'
            }
        }
    },

    /* ---------- Sugerencias rápidas ---------- */
    chips: {
        default: ['projects', 'skills', 'experience', 'contact', 'whoami'],
        labels: {
            projects: { es: 'Ver proyectos', en: 'See projects' },
            skills: { es: '¿Qué tecnologías domina?', en: 'What tech does she use?' },
            experience: { es: 'Experiencia', en: 'Experience' },
            contact: { es: 'Contacto', en: 'Contact' },
            whoami: { es: '¿Quién eres?', en: 'Who are you?' },
            about: { es: '¿Quién es Sahar?', en: 'Who is Sahar?' },
            services: { es: 'Servicios', en: 'Services' },
            education: { es: 'Formación', en: 'Education' },
            web: { es: 'Proyectos web', en: 'Web projects' },
            design: { es: 'Branding y diseño', en: 'Branding & design' },
            code: { es: 'Programación', en: 'Programming' },
            hire: { es: '¿Está disponible?', en: 'Is she available?' },
            ai: { es: 'Inteligencia artificial', en: 'Artificial intelligence' },
            pillars: { es: 'Sus pilares', en: 'Her pillars' },
            marketing: { es: 'Marketing digital', en: 'Digital marketing' },
            cv: { es: 'Descargar CV', en: 'Download CV' },
            workshops: { es: 'Talleres de IA', en: 'AI workshops' }
        }
    },

    /* ---------- Intenciones ----------
       keys: palabras o frases que activan la respuesta (sin tildes, en minúscula).
       action: qué hace la interfaz. { type: 'go', href } lleva a otra pestaña
                 (o se desplaza si el destino está en la misma página).
       ------------------------------------------------------------ */
    intents: [
        {
            id: 'greeting',
            keys: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey', 'hello', 'hi', 'good morning', 'good evening', 'que tal', 'saludos'],
            weight: 0.6,
            answer: {
                es: '¡Hola! 😊 Qué bueno tenerte por aquí. Puedo mostrarte proyectos, tecnologías, experiencia o datos de contacto de Sahar.',
                en: 'Hi there! 😊 Great to have you here. I can show you Sahar\'s projects, technologies, experience or contact details.'
            },
            chips: ['projects', 'skills', 'about']
        },
        {
            id: 'pillars',
            keys: ['pilar', 'pilares', 'cimientos', 'ramas', 'areas', 'especialidades', 'enfoque', 'pillars', 'pillar', 'foundations', 'areas of expertise', 'focus'],
            answer: {
                es: 'El trabajo de Sahar se sostiene en cuatro pilares: 💻 Programación, 🧠 Inteligencia Artificial, 🎨 Diseño y 📈 Marketing Digital. Juntos le permiten llevar una idea desde la marca y la interfaz hasta el código, la automatización y su crecimiento en el mercado.',
                en: 'Sahar\'s work stands on four pillars: 💻 Programming, 🧠 Artificial Intelligence, 🎨 Design and 📈 Digital Marketing. Together they let her take an idea from brand and interface to code, automation and market growth.'
            },
            action: { type: 'go', href: 'index.html#pilares', label: { es: 'Ver los pilares', en: 'See the pillars' } },
            chips: ['code', 'ai', 'design', 'marketing']
        },
        {
            id: 'ai',
            keys: ['ia', 'inteligencia artificial', 'machine learning', 'chatbot', 'chatbots', 'asistente', 'asistentes', 'ai', 'artificial intelligence', 'llm', 'gpt', 'claude'],
            answer: {
                es: 'En IA, Sahar dicta talleres de IA generativa para equipos de trabajo; el más reciente fue para el equipo de una firma de outsourcing contable y tributario que empezaba a usar ChatGPT Work. También automatiza y estandariza procesos, implementa chatbots de atención al cliente y diseña asistentes conversacionales como yo 🤖.',
                en: 'In AI, Sahar teaches generative AI workshops for teams; the most recent one was for the team of an accounting and tax outsourcing firm starting to use ChatGPT Work. She also automates and standardizes processes, builds customer service chatbots and designs conversational assistants like me 🤖.'
            },
            action: { type: 'go', href: 'index.html#pilares', label: { es: 'Ver los pilares', en: 'See the pillars' } },
            chips: ['services', 'projects']
        },
        {
            id: 'marketing',
            keys: ['marketing', 'mercadeo', 'seo', 'posicionamiento', 'campana', 'campanas', 'google analytics', 'analitica', 'community management', 'estrategia digital', 'campaign', 'campaigns', 'analytics', 'digital strategy', 'positioning'],
            answer: {
                es: 'En marketing digital, Sahar crea estrategias de marca y posicionamiento SEO, campañas digitales con analítica web (Google Analytics) y gestiona redes sociales y comunidades. Además completó en el SENA los cursos de Marketing Digital y de Propuestas Comerciales en Marketing Digital.',
                en: 'In digital marketing, Sahar builds brand strategies and SEO positioning, runs digital campaigns with web analytics (Google Analytics) and manages social media and communities. She also completed SENA courses in Digital Marketing and Digital Marketing Commercial Proposals.'
            },
            action: { type: 'go', href: 'index.html#pilares', label: { es: 'Ver los pilares', en: 'See the pillars' } },
            chips: ['services', 'design']
        },
        {
            id: 'volunteer',
            keys: ['voluntariado', 'voluntaria', 'casta latina', 'conexiones latinas', 'comunidad latina', 'volunteer', 'volunteering'],
            answer: {
                es: 'Sahar fue voluntaria en el evento Conexiones Latinas de Casta Latina, en Canadá (septiembre 2024) 🤝.',
                en: 'Sahar volunteered at the Conexiones Latinas event by Casta Latina in Canada (September 2024) 🤝.'
            },
            chips: ['about', 'experience']
        },
        {
            id: 'whoami',
            keys: ['quien eres', 'que eres', 'como te llamas', 'tu nombre', 'eres una ia', 'eres un robot', 'who are you', 'what are you', 'your name', 'are you a bot', 'are you an ai'],
            answer: {
                es: 'Soy {name}, la asistente virtual de este portafolio. Conozco todo lo que hay en la página y te guío por ella. Por ahora respondo con mi base de conocimiento local; pronto tendré un cerebro de IA más avanzado 🧠.',
                en: 'I\'m {name}, this portfolio\'s virtual assistant. I know everything on this site and guide you through it. For now I answer from my local knowledge base; a more advanced AI brain is coming soon 🧠.'
            },
            chips: ['about', 'projects']
        },
        {
            id: 'about',
            keys: ['quien es', 'quien es sahar', 'sobre sahar', 'sobre ella', 'sobre mi', 'acerca de', 'perfil', 'cuentame de ella', 'presentate', 'about', 'who is', 'her profile', 'tell me about her', 'background', 'trayectoria'],
            answer: {
                es: 'Sahar Gabriela Chain Mayorga es programadora y desarrolladora web bilingüe (español–inglés), con experiencia en diseño web, branding, community management y marketing digital. Combina programación (SQL, .NET, Python, PHP, Java, JavaScript) con diseño de marca para ofrecer soluciones completas en desarrollo, posicionamiento de marca y presencia digital.',
                en: 'Sahar Gabriela Chain Mayorga is a bilingual (Spanish–English) programmer and web developer with experience in web design, branding, community management and digital marketing. She combines programming (SQL, .NET, Python, PHP, Java, JavaScript) with brand design to deliver complete solutions in development, brand positioning and digital presence.'
            },
            action: { type: 'go', href: 'sobre-mi.html', label: { es: 'Ir a Sobre mí', en: 'Go to About' } },
            chips: ['education', 'experience', 'skills']
        },
        {
            id: 'education',
            keys: ['estudio', 'estudios', 'formacion', 'educacion', 'universidad', 'college', 'lambton', 'sena', 'titulo', 'carrera', 'education', 'degree', 'studied', 'school', 'academic'],
            answer: {
                es: 'Sahar es Computer Programmer de Lambton College, Ontario, Canadá (diciembre 2024). En el SENA completó los cursos de Marketing Digital y Desarrollo de Propuestas Comerciales en Marketing Digital (2026) y Producción de Imágenes Digitales (2018).',
                en: 'Sahar graduated as a Computer Programmer from Lambton College, Ontario, Canada (December 2024). At SENA she completed Digital Marketing and Commercial Proposals in Digital Marketing (2026), plus Digital Image Production (2018).'
            },
            action: { type: 'go', href: 'sobre-mi.html#trayectoria', label: { es: 'Ver formación', en: 'See education' } },
            chips: ['experience', 'skills']
        },
        {
            id: 'languages',
            keys: ['idioma', 'idiomas', 'ingles', 'espanol', 'habla', 'bilingue', 'language', 'languages', 'english', 'spanish', 'speak'],
            answer: {
                es: 'Sahar habla español nativo e inglés intermedio. Su formación en Canadá y su trabajo en Colombia le permiten moverse entre ambos mercados.',
                en: 'Sahar speaks native Spanish and intermediate English. Her training in Canada and her work in Colombia let her move between both markets.'
            },
            chips: ['about', 'contact']
        },
        {
            id: 'experience',
            keys: ['experiencia', 'trabajo', 'trabajado', 'empleo', 'empresa', 'empresas', 'laboral', 'cargo', 'disenos lasser', 'lasser', 'freelance', 'freelancer', 'experience', 'work', 'job', 'jobs', 'worked', 'career', 'company'],
            answer: {
                es: 'Su recorrido: 💼 Desarrolladora web, programadora y diseñadora de marca independiente en Colombia y Canadá (2021 – hoy): sitios .NET y PHP, APIs RESTful con Angular, bases de datos a medida, chatbots, branding y talleres de IA generativa. 🚀 Cofundadora de Únicos, agencia creativa en Bogotá (2019 – 2021), donde mejoró la organización de datos en 30%, la productividad en 35% y la interacción con clientes en 20%.',
                en: 'Her path: 💼 Independent web developer, programmer and brand designer in Colombia and Canada (2021 – present): .NET and PHP sites, RESTful APIs with Angular, custom databases, chatbots, branding and generative AI workshops. 🚀 Co-founder of Únicos, a creative agency in Bogotá (2019 – 2021), where she improved data organization by 30%, productivity by 35% and client interaction by 20%.'
            },
            action: { type: 'go', href: 'sobre-mi.html#trayectoria', label: { es: 'Ver experiencia', en: 'See experience' } },
            chips: ['skills', 'projects']
        },
        {
            id: 'skills',
            keys: ['habilidad', 'habilidades', 'tecnologia', 'tecnologias', 'stack', 'lenguaje', 'lenguajes', 'programa en', 'herramientas', 'domina', 'sabe', 'skills', 'skill', 'technologies', 'tech', 'languages programming', 'tools', 'know'],
            answer: {
                es: 'Su stack: ⚙️ Lenguajes: .NET, C#, PHP, Python, Java, SQL, TypeScript y JavaScript. 🧩 Frameworks: .NET Core, ASP.NET, Node.js, Angular, Bootstrap y WordPress. 🗄️ Bases de datos: SQL Server, MySQL y Oracle. ✅ Calidad: Jest, Git, GitHub Actions y bases de DevOps y Cloud. 🎨 Diseño: Illustrator y Canva. 📈 Marketing: SEO, Google Analytics y chatbots.',
                en: 'Her stack: ⚙️ Languages: .NET, C#, PHP, Python, Java, SQL, TypeScript and JavaScript. 🧩 Frameworks: .NET Core, ASP.NET, Node.js, Angular, Bootstrap and WordPress. 🗄️ Databases: SQL Server, MySQL and Oracle. ✅ Quality: Jest, Git, GitHub Actions plus DevOps and Cloud fundamentals. 🎨 Design: Illustrator and Canva. 📈 Marketing: SEO, Google Analytics and chatbots.'
            },
            action: { type: 'go', href: 'sobre-mi.html#habilidades', label: { es: 'Ver habilidades', en: 'See skills' } },
            chips: ['projects', 'code']
        },
        {
            id: 'services',
            keys: ['servicio', 'servicios', 'ofrece', 'que hace', 'puede hacer', 'contratar para', 'community manager', 'redes sociales', 'chatbot', 'automatizacion', 'consultoria', 'tienda online', 'ux', 'ui', 'piezas graficas', 'services', 'service', 'offer', 'what does she do', 'social media', 'automation', 'consulting'],
            answer: {
                es: 'Los servicios de Sahar están organizados según lo que necesitas: 🌐 tener presencia en internet (sitio web y tienda online), 🗂️ ordenar tu información (bases de datos y software a medida), 🧠 ahorrar tiempo con IA (automatización, chatbots y talleres de IA), 🎨 verte profesional (identidad de marca, piezas gráficas para redes y diseño UX/UI) y 📈 crecer en redes y en digital (gestión de redes sociales y estrategia digital). Cada proyecto se cotiza a la medida.',
                en: 'Sahar\'s services are organized by what you need: 🌐 being present online (website and online store), 🗂️ organizing your information (databases and custom software), 🧠 saving time with AI (automation, chatbots and AI workshops), 🎨 looking professional (brand identity, social media graphics and UX/UI design) and 📈 growing on social media and online (social media management and digital strategy). Every project is quoted to fit.'
            },
            action: { type: 'go', href: 'servicios.html', label: { es: 'Ver servicios', en: 'See services' } },
            chips: ['contact', 'projects']
        },
        {
            id: 'projects',
            keys: ['proyecto', 'proyectos', 'portafolio', 'portfolio', 'trabajos', 'muestra', 'ejemplos', 'casos', 'projects', 'project', 'work samples', 'case study', 'showcase'],
            answer: {
                es: 'Sahar tiene 11 proyectos: 🌐 desarrollo web (Sell Services, Sports Store, Little Stars), 🎨 branding (Zohar, ODEN, MetalTec, Únicos), 💻 programación (Smart Agriculture, Library Management, Jest CI) y 🧠 IA (AURA, la asistente que te está hablando). ¿Cuál área te interesa?',
                en: 'Sahar has 11 projects: 🌐 web development (Sell Services, Sports Store, Little Stars), 🎨 branding (Zohar, ODEN, MetalTec, Únicos), 💻 programming (Smart Agriculture, Library Management, Jest CI) and 🧠 AI (AURA, the assistant talking to you). Which area interests you?'
            },
            action: { type: 'go', href: 'proyectos.html', label: { es: 'Ir a proyectos', en: 'Go to projects' } },
            chips: ['web', 'design', 'code']
        },
        {
            id: 'web',
            keys: ['web', 'sitio', 'sitios', 'pagina web', 'paginas web', 'ecommerce', 'e-commerce', 'tienda', 'tiendas', 'website', 'websites', 'store', 'online shop'],
            answer: {
                es: 'En desarrollo web destacan: 🛒 Sell Services, una tienda en línea con registro de usuarios, catálogo, carrito y base de datos MySQL (PHP + MySQL); 🏀 Sports Store, tienda deportiva con catálogo dinámico; y 👶 Little Stars, tienda infantil con filtros por edad.',
                en: 'Web development highlights: 🛒 Sell Services, an online store with user accounts, catalog, cart and a MySQL database (PHP + MySQL); 🏀 Sports Store, a sports shop with a dynamic catalog; and 👶 Little Stars, a kids\' clothing store with age filters.'
            },
            projects: ['sell-services', 'sports-store', 'little-stars'],
            action: { type: 'go', href: 'proyectos.html?area=web', label: { es: 'Ver proyectos web', en: 'See web projects' } }
        },
        {
            id: 'design',
            keys: ['diseno', 'disenos', 'branding', 'marca', 'marcas', 'logo', 'logos', 'identidad', 'grafico', 'illustrator', 'design', 'brand', 'brands', 'identity', 'graphic'],
            answer: {
                es: 'En branding y diseño: 💎 Zohar, identidad de lujo para joyería; 🧭 ODEN, marca inmobiliaria con símbolo de brújula; 🔩 MetalTec, branding completo con web en WordPress; y ✨ Únicos, su propia agencia creativa.',
                en: 'Branding & design: 💎 Zohar, a luxury jewelry identity; 🧭 ODEN, a real estate brand with a compass symbol; 🔩 MetalTec, full branding plus a WordPress site; and ✨ Únicos, her own creative agency.'
            },
            projects: ['zohar', 'oden', 'metaltec', 'unicos'],
            action: { type: 'go', href: 'proyectos.html?area=design', label: { es: 'Ver proyectos de diseño', en: 'See design projects' } }
        },
        {
            id: 'code',
            keys: ['programacion', 'codigo', 'software', 'github', 'repositorio', 'repositorios', 'typescript', 'testing', 'pruebas', 'programming', 'code', 'repo', 'repos', 'tests'],
            answer: {
                es: 'En programación: 🌱 Smart Agriculture, agricultura de precisión con sensores IoT y riego automatizado; 📚 Library Management, gestión de biblioteca en TypeScript y Node.js con pruebas en Jest; y ✅ Jest CI, pruebas automáticas en cada push con GitHub Actions. Son proyectos académicos de Lambton College publicados en GitHub.',
                en: 'Programming: 🌱 Smart Agriculture, precision farming with IoT sensors and automated irrigation; 📚 Library Management, a TypeScript and Node.js library system tested with Jest; and ✅ Jest CI, automated tests on every push with GitHub Actions. They are Lambton College academic projects published on GitHub.'
            },
            projects: ['smart-agriculture', 'bookstore', 'jest-ci'],
            action: { type: 'go', href: 'proyectos.html?area=code', label: { es: 'Ver proyectos de programación', en: 'See programming projects' } }
        },
        {
            id: 'contact',
            keys: ['contacto', 'contactar', 'contactarla', 'correo', 'email', 'mail', 'telefono', 'whatsapp', 'escribirle', 'formulario', 'form', 'linkedin', 'escribirle', 'llamar', 'redes', 'contact', 'reach', 'phone', 'call', 'get in touch'],
            answer: {
                es: 'Puedes escribirle a Sahar por 💬 WhatsApp, por 📧 sahargabriela9@gmail.com o desde el formulario de la pestaña Contacto. Está disponible para proyectos freelance y responde en 24–48 horas.',
                en: 'You can reach Sahar on 💬 WhatsApp, at 📧 sahargabriela9@gmail.com or through the form on the Contact tab. She\'s available for freelance projects and replies within 24–48 hours.'
            },
            action: { type: 'go', href: 'contacto.html', label: { es: 'Ir a contacto', en: 'Go to contact' } },
            links: [
                { label: 'WhatsApp', href: 'https://wa.me/573204499948' },
                { label: 'Email', href: 'mailto:sahargabriela9@gmail.com' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sahar-gabriela-chain-mayorga-b76433289' },
                { label: 'GitHub', href: 'https://github.com/SaharLambton' }
            ]
        },
        {
            id: 'workshops',
            keys: ['taller', 'talleres', 'curso', 'cursos', 'capacitacion', 'capacitaciones', 'formacion en ia', 'ensenar ia', 'workshop', 'workshops', 'course', 'courses', 'training'],
            answer: {
                es: 'Sahar ofrece talleres y cursos de IA generativa para equipos de empresas: prácticos, adaptados a cada sector y con buenas prácticas de uso responsable. El más reciente fue para un equipo contable de 8 personas que empezaba a usar ChatGPT Work. Se cotizan según el tamaño del grupo y los temas.',
                en: 'Sahar offers generative AI workshops and courses for company teams: hands-on, tailored to each industry and including responsible-use best practices. The most recent one was for an 8-person accounting team starting to use ChatGPT Work. They are quoted based on group size and topics.'
            },
            action: { type: 'go', href: 'servicios.html#workshops', label: { es: 'Ver talleres', en: 'See workshops' } },
            chips: ['hire', 'ai']
        },
        {
            id: 'cv',
            keys: ['cv', 'hoja de vida', 'curriculum', 'curriculo', 'descargar cv', 'resume', 'resumé', 'download cv'],
            answer: {
                es: 'Claro 📄 Aquí puedes descargar el CV actualizado de Sahar.',
                en: 'Sure 📄 You can download Sahar\'s updated CV right here (in Spanish).'
            },
            links: [{ label: 'CV (PDF)', href: 'docs/CV_Sahar_Chain_Mayorga.pdf' }],
            chips: ['experience', 'contact']
        },
        {
            id: 'hire',
            weight: 1.3, // gana a otros temas en preguntas como "¿cuánto cuesta una página web?"
            keys: ['disponible', 'disponibilidad', 'contratar', 'contratarla', 'contrato', 'vacante', 'freelance disponible', 'cotizar', 'cotizacion', 'precio', 'precios', 'cuesta', 'cuanto cuesta', 'cuanto cobra', 'cobra', 'tarifa', 'tarifas', 'costo', 'costos', 'presupuesto', 'available', 'hire', 'hiring', 'availability', 'quote', 'rates', 'price', 'prices', 'cost', 'how much'],
            answer: {
                es: 'Sahar está abierta a nuevos proyectos, freelance o en empresa. No maneja precios fijos: cada proyecto se cotiza según lo que necesitas. Cuéntale tu idea y te envía una propuesta con alcance, tiempos y precio.',
                en: 'Sahar is open to new projects, freelance or in-house. There are no fixed prices: every project is quoted based on what you need. Tell her your idea and she\'ll send you a proposal with scope, timeline and price.'
            },
            action: { type: 'go', href: 'contacto.html', label: { es: 'Ir a contacto', en: 'Go to contact' } },
            links: [{ label: 'Email', href: 'mailto:sahargabriela9@gmail.com' }]
        },
        {
            id: 'location',
            keys: ['donde vive', 'ubicacion', 'ciudad', 'pais', 'de donde', 'canada', 'colombia', 'bogota', 'toronto', 'location', 'where', 'based', 'country', 'city'],
            answer: {
                es: 'Sahar vive en Bogotá, Colombia, y se formó en Ontario, Canadá. Trabaja con clientes de ambos países.',
                en: 'Sahar is based in Bogotá, Colombia, and trained in Ontario, Canada. She works with clients in both countries.'
            },
            chips: ['contact', 'languages']
        },
        {
            id: 'thanks',
            keys: ['gracias', 'genial', 'perfecto', 'excelente', 'chevere', 'buenisimo', 'thanks', 'thank you', 'great', 'awesome', 'cool', 'nice'],
            weight: 0.6,
            answer: {
                es: '¡Con gusto! ✨ Si quieres seguir explorando, aquí estoy.',
                en: 'My pleasure! ✨ I\'m here if you want to keep exploring.'
            }
        },
        {
            id: 'bye',
            keys: ['adios', 'chao', 'hasta luego', 'nos vemos', 'bye', 'goodbye', 'see you'],
            weight: 0.6,
            answer: {
                es: '¡Hasta pronto! 👋 Gracias por visitar el portafolio de Sahar.',
                en: 'See you soon! 👋 Thanks for visiting Sahar\'s portfolio.'
            }
        }
    ],

    /* ---------- Proyectos ----------
       pillars: áreas a las que pertenece (web, code, ai, design, marketing) → frecuencias de la pestaña Proyectos.
       card / video: imagen o video de la tarjeta (si no hay, se muestra un gráfico).
       short: resumen de la tarjeta · desc: lo que responde AURA.
       brand: color de la marca (tiñe la pantalla de la Bóveda) · kind: tipo de proyecto.
       Para agregar un proyecto, copia uno de estos bloques y ajústalo.
       ------------------------------------------------------------ */
    projects: [
        {
            id: 'sell-services', name: 'Sell Services', keys: ['sell services', 'sell service', 'productos graficos', 'graphic products'],
            brand: '#3ccfcf', kind: { es: 'Proyecto académico · Lambton College', en: 'Academic project · Lambton College' },
            pillars: ['web'], card: 'img/thumbs/services-card.webp', video: 'services.mp4',
            short: { es: 'Tienda en línea de servicios y productos gráficos con registro de usuarios, catálogo filtrable, carrito y base de datos MySQL.', en: 'Online store for graphic services and products with user accounts, filterable catalog, cart and a MySQL database.' },
            url: 'sell-services.html', thumb: 'img/thumbs/services.webp', area: 'web',
            tech: ['PHP', 'MySQL', 'JavaScript', 'jQuery'],
            desc: {
                es: 'Sell Services es una tienda en línea para vender servicios y productos gráficos personalizados: registro e inicio de sesión, catálogo filtrable con buscador, carrito y perfil editable, con los usuarios guardados en MySQL. Hecha con PHP, MySQL, JavaScript y jQuery en 2023.',
                en: 'Sell Services is an online store to sell custom graphic services and products: sign-up and login, filterable catalog with search, cart and editable profile, with users stored in MySQL. Built with PHP, MySQL, JavaScript and jQuery in 2023.'
            },
            tag: { es: 'E-commerce · PHP + MySQL', en: 'E-commerce · PHP + MySQL' }
        },
        {
            id: 'sports-store', name: 'Sports Store', keys: ['sports store', 'sport store', 'tienda deportiva', 'deportes', 'deportiva', 'sports'],
            brand: '#ff3b4e', kind: { es: 'Proyecto académico · Lambton College', en: 'Academic project · Lambton College' },
            pillars: ['web'], card: 'img/thumbs/sport-card.webp', video: 'sport.mp4',
            short: { es: 'Tienda deportiva con catálogo dinámico, programa de becas para jóvenes atletas y recursos con la API de YouTube.', en: 'Sports store with a dynamic catalog, a scholarship program for young athletes and YouTube API resources.' },
            url: 'sports-store.html', area: 'web',
            tech: ['HTML5', 'CSS3', 'Responsive Design', 'YouTube API'],
            desc: {
                es: 'Sports Store es el sitio de una tienda deportiva con catálogo dinámico, programa de becas para jóvenes atletas, formulario de contacto y recursos educativos con la API de YouTube.',
                en: 'Sports Store is a sports shop website with a dynamic catalog, a scholarship program for young athletes, a contact form and educational resources via the YouTube API.'
            }
        },
        {
            id: 'little-stars', name: 'Little Stars', keys: ['little stars', 'ropa infantil', 'ninos', 'kids', 'children'],
            brand: '#ffb3cf', kind: { es: 'Proyecto personal de práctica', en: 'Personal practice project' },
            pillars: ['web', 'design'], card: 'img/thumbs/littlestars-card.webp', video: 'store.mp4',
            short: { es: 'Tienda de ropa infantil responsive, con catálogo, filtros y categorías por edad.', en: 'Responsive kids\' clothing store with catalog, filters and age categories.' },
            url: 'little-stars.html', area: 'web',
            tech: ['HTML5', 'CSS3', 'Font Awesome', 'Responsive Design'],
            desc: {
                es: 'Little Stars es una tienda de ropa infantil con diseño moderno y responsive: hero section, catálogo con filtros y categorías por edad.',
                en: 'Little Stars is a kids\' clothing store with a modern, responsive design: hero section, catalog with filters and age categories.'
            }
        },
        {
            id: 'zohar', name: 'Zohar', keys: ['zohar', 'joyeria', 'lujo', 'jewelry', 'luxury'],
            brand: '#d7dce8', kind: { es: 'Cliente · Joyería de lujo', en: 'Client · Luxury jewelry' },
            pillars: ['design', 'marketing'], card: 'img/thumbs/zohar-card.webp', video: '',
            short: { es: 'Identidad visual completa para una marca de joyería de lujo: logo, manual, packaging y estrategia digital.', en: 'Complete visual identity for a luxury jewelry brand: logo, brand manual, packaging and digital strategy.' },
            url: 'Zohar.html', thumb: 'img/thumbs/zohar.webp', area: 'design',
            tech: ['Adobe Illustrator', 'Branding', 'Brand Manual'],
            desc: {
                es: 'Zohar es una identidad visual completa para una marca de joyería de lujo: logo, paleta de color, tipografía, manual de marca, packaging, papelería y estrategia digital.',
                en: 'Zohar is a complete visual identity for a luxury jewelry brand: logo, color palette, typography, brand manual, packaging, stationery and digital strategy.'
            },
            tag: { es: 'Branding de lujo', en: 'Luxury branding' }
        },
        {
            id: 'oden', name: 'ODEN', keys: ['oden', 'inmobiliaria', 'brujula', 'real estate', 'compass'],
            brand: '#f5a524', kind: { es: 'Cliente · Inmobiliaria', en: 'Client · Real estate' },
            pillars: ['design'], card: 'img/thumbs/oden-card.webp', video: '',
            short: { es: 'Identidad corporativa para una inmobiliaria, con un logo de brújula y paleta de grises y dorados.', en: 'Corporate identity for a real estate company, with a compass logo and a gray-and-gold palette.' },
            url: 'oden.html', area: 'design',
            tech: ['Adobe Illustrator', 'Branding', 'Logo Design'],
            desc: {
                es: 'ODEN es la identidad corporativa de una inmobiliaria: un logo con símbolo de brújula que representa orientación, paleta de grises y dorados y variaciones para aplicaciones digitales.',
                en: 'ODEN is the corporate identity for a real estate company: a compass-symbol logo representing guidance, a gray-and-gold palette and variations for digital use.'
            }
        },
        {
            id: 'metaltec', name: 'MetalTec Colombia', keys: ['metaltec', 'metal tec', 'metalurgica', 'metallurgical'],
            brand: '#ff5722', kind: { es: 'Cliente · Sector metalúrgico', en: 'Client · Metallurgical sector' },
            pillars: ['design', 'web', 'marketing'], card: 'img/thumbs/metaltec-card.webp', video: '',
            short: { es: 'Branding desde cero para una metalúrgica: logo, sitio en WordPress, material impreso y redes sociales.', en: 'End-to-end branding for a metallurgical company: logo, WordPress site, print material and social media.' },
            url: 'metaltec.html', thumb: 'img/thumbs/metaltec.webp', area: 'design',
            tech: ['Brand Design', 'WordPress', 'Adobe Illustrator'],
            desc: {
                es: 'MetalTec Colombia es un branding integral desde cero para una empresa metalúrgica: logo e isotipo, sitio web en WordPress, brochure y flyers, manual de identidad y redes sociales.',
                en: 'MetalTec Colombia is end-to-end branding for a metallurgical company: logo and isotype, a WordPress website, brochure and flyers, identity manual and social media.'
            },
            tag: { es: 'Branding + WordPress', en: 'Branding + WordPress' }
        },
        {
            id: 'unicos', name: 'Únicos', keys: ['unicos', 'agencia', 'agency', 'optica', 'vision center'],
            brand: '#e0505d', kind: { es: 'Agencia propia · Cofundadora', en: 'Own agency · Co-founder' },
            pillars: ['design', 'marketing', 'web'], card: 'img/thumbs/unicos-card.webp', video: '',
            short: { es: 'La agencia creativa que Sahar cofundó en Bogotá: diseño, marketing digital y desarrollo web para clientes.', en: 'The creative agency Sahar co-founded in Bogotá: design, digital marketing and web development for clients.' },
            url: 'unicos.html', area: 'design',
            tech: ['Illustrator', 'Photoshop', 'Branding', 'Marketing'],
            desc: {
                es: 'Únicos es la agencia creativa que Sahar cofundó en Bogotá (2019 – 2021). Allí lideró proyectos web y de diseño para clientes como MetalTec y Óptica Vision Center: identidad de marca, sitios en WordPress y a medida, material publicitario y estrategia digital.',
                en: 'Únicos is the creative agency Sahar co-founded in Bogotá (2019 – 2021). There she led web and design projects for clients like MetalTec and Vision Center Optical: brand identity, WordPress and custom sites, advertising material and digital strategy.'
            }
        },
        {
            id: 'smart-agriculture', name: 'Smart Agriculture', keys: ['smart agriculture', 'agricultura', 'agro', 'iot', 'sensores', 'riego', 'drones', 'farming', 'sensors', 'irrigation'],
            brand: '#7ed957', kind: { es: 'Proyecto académico · Lambton College', en: 'Academic project · Lambton College' },
            pillars: ['code'], card: 'img/thumbs/smart-agriculture-card.webp', video: '',
            short: { es: 'Agricultura de precisión: sensores ambientales, riego automático, detección de enfermedades en plantas y drones.', en: 'Precision farming: environmental sensors, automated irrigation, plant disease detection and drones.' },
            url: 'smart-agriculture.html', area: 'code',
            tech: ['TypeScript', 'Node.js', 'POO', 'npm'],
            desc: {
                es: 'Smart Agriculture es un modelo en TypeScript de una granja inteligente: sensores ambientales, riego automatizado según el clima, detección de enfermedades en plantas y drones. Lo hizo con Julián Casilimas en Lambton College (2024) y lo publicaron como paquete en npm.',
                en: 'Smart Agriculture is a TypeScript model of a smart farm: environmental sensors, weather-driven automated irrigation, plant disease detection and drones. She built it with Julián Casilimas at Lambton College (2024) and they published it as an npm package.'
            },
            tag: { es: 'IoT · TypeScript', en: 'IoT · TypeScript' }
        },
        {
            id: 'bookstore', name: 'Library Management', keys: ['library management', 'bookstore', 'biblioteca', 'libros', 'library', 'books'],
            brand: '#f0c419', kind: { es: 'Proyecto académico · Lambton College', en: 'Academic project · Lambton College' },
            pillars: ['code'], card: 'img/thumbs/library-card.webp', video: '',
            short: { es: 'Gestión de biblioteca con libros, clientes, préstamos y devoluciones, cubierta con pruebas unitarias.', en: 'Library management with books, customers, loans and returns, covered by unit tests.' },
            url: 'library-management.html', area: 'code',
            tech: ['TypeScript', 'Node.js', 'Jest', 'OOP'],
            desc: {
                es: 'Library Management es una aplicación de gestión de biblioteca en TypeScript y Node.js: libros, clientes, préstamos y devoluciones con validación de disponibilidad, todo cubierto con pruebas unitarias en Jest.',
                en: 'Library Management is a TypeScript and Node.js library app: books, customers, loans and returns with availability checks, fully covered by Jest unit tests.'
            }
        },
        {
            id: 'space-flight', name: 'Space Flight Booking', keys: ['space flight', 'vuelos espaciales', 'vuelo espacial', 'marte', 'mars', 'reservas', 'booking', 'docker', 'devops'],
            brand: '#8b7bff', kind: { es: 'Proyecto académico · Lambton College', en: 'Academic project · Lambton College' },
            pillars: ['code'], card: 'img/thumbs/space-flight-card.webp', video: '',
            short: { es: 'Reservas de vuelos a Marte con verificación médica, pagos, pruebas en Jest y despliegue con Docker.', en: 'Flight bookings to Mars with medical checks, payments, Jest tests and Docker deployment.' },
            url: 'space-flight-booking.html', area: 'code',
            tech: ['TypeScript', 'Jest', 'Docker', 'GitHub Actions'],
            desc: {
                es: 'Space Flight Booking es el backend de una agencia de vuelos a Marte: verifica que el pasajero sea mayor de edad y tenga certificado médico, controla los cupos, registra los pagos y permite cancelar. Incluye pruebas en Jest, un contenedor Docker y un pipeline de GitHub Actions que construye y publica la imagen en Docker Hub.',
                en: 'Space Flight Booking is the backend for an agency selling flights to Mars: it checks that passengers are adults with a medical certificate, controls seats, records payments and allows cancellations. It includes Jest tests, a Docker container and a GitHub Actions pipeline that builds and publishes the image to Docker Hub.'
            },
            tag: { es: 'DevOps · TypeScript', en: 'DevOps · TypeScript' }
        },
        {
            id: 'jest-ci', name: 'Jest CI', keys: ['jest ci', 'github actions', 'integracion continua', 'ci/cd', 'continuous integration', 'pipeline'],
            brand: '#c8486a', kind: { es: 'Proyecto académico · Lambton College', en: 'Academic project · Lambton College' },
            pillars: ['code'], card: 'img/thumbs/jestci-card.webp', video: '',
            short: { es: 'Integración continua: las pruebas con Jest se ejecutan solas en cada push con GitHub Actions.', en: 'Continuous integration: Jest tests run automatically on every push with GitHub Actions.' },
            url: 'jest-ci.html', area: 'code',
            tech: ['JavaScript', 'Jest', 'GitHub Actions'],
            desc: {
                es: 'Jest CI implementa integración continua para un proyecto JavaScript: pruebas con Jest que se ejecutan automáticamente en cada push gracias a GitHub Actions.',
                en: 'Jest CI sets up continuous integration for a JavaScript project: Jest tests run automatically on every push through GitHub Actions.'
            }
        },
        {
            id: 'ai-workshop', name: 'Taller de IA', keys: ['taller de ia', 'taller contable', 'contadores', 'contable', 'chatgpt work', 'ai workshop', 'accountants'],
            brand: '#ff7a2f', kind: { es: 'Cliente real · capacitación', en: 'Real client · training' },
            pillars: ['ai'], card: 'img/thumbs/taller-ia-card.webp', video: '',
            short: { es: 'Taller práctico de 2 horas para que un equipo contable de 8 personas adopte ChatGPT Work con buenas prácticas y cuidado de los datos.', en: 'A 2-hour hands-on workshop for an 8-person accounting team adopting ChatGPT Work with good practices and data care.' },
            url: 'taller-ia.html', area: 'ai',
            tech: ['IA generativa', 'ChatGPT Work', 'Prompting'],
            desc: {
                es: 'Sahar diseñó y dictó un taller de IA para una firma de outsourcing contable y tributario que iba a adoptar ChatGPT Work: 8 personas, la mitad sin experiencia con IA. Cubrió IA generativa y alucinaciones, privacidad de datos, GPTs personalizados y Proyectos, modelos y tokens, prompts y metaprompting, con dinámicas prácticas y un Kahoot final.',
                en: 'Sahar designed and delivered an AI workshop for an accounting and tax outsourcing firm adopting ChatGPT Work: 8 people, half with no AI experience. It covered generative AI and hallucinations, data privacy, custom GPTs and Projects, models and tokens, prompts and metaprompting, with hands-on activities and a final Kahoot.'
            },
            tag: { es: 'IA · Capacitación', en: 'AI · Training' }
        },
        {
            id: 'aura', name: 'AURA', keys: ['aura project', 'proyecto aura', 'asistente del portafolio', 'portfolio assistant'],
            brand: '#a970ff', kind: { es: 'Este portafolio · En línea', en: 'This portfolio · Online' },
            pillars: ['ai', 'code'], card: 'img/thumbs/aura-card.webp', video: '',
            short: { es: 'La asistente de este portafolio: chat bilingüe con base de conocimiento, voz y un orbe 3D en WebGL.', en: 'This portfolio\'s assistant: a bilingual chat with a knowledge base, voice and a 3D WebGL orb.' },
            url: 'aura.html', area: 'ai',
            tech: ['JavaScript', 'Three.js', 'Web Speech API'],
            desc: {
                es: 'AURA es la asistente de este portafolio: responde en español e inglés con una base de conocimiento propia, habla con la voz del navegador, entiende preguntas por micrófono y vive en un orbe 3D hecho con WebGL. Está preparada para conectarse a un modelo de IA.',
                en: 'AURA is this portfolio\'s assistant: she answers in Spanish and English from her own knowledge base, speaks with the browser\'s voice, understands questions through the microphone and lives in a 3D orb built with WebGL. She is ready to connect to an AI model.'
            },
            tag: { es: 'IA · Asistente conversacional', en: 'AI · Conversational assistant' }
        }
    ],

    /* Proyectos que aparecen en "Destacados" */
    featured: ['sell-services', 'zohar', 'smart-agriculture'],

    /* ---------- Tecnologías (para preguntas tipo "¿sabe Python?") ---------- */
    tech: {
        known: {
            'c#': 'C#', 'csharp': 'C#', '.net': '.NET', 'dotnet': '.NET', 'net core': '.NET Core', 'asp.net': 'ASP.NET',
            'python': 'Python', 'php': 'PHP', 'java': 'Java', 'sql': 'SQL', 'sql server': 'SQL Server', 'mysql': 'MySQL',
            'html': 'HTML5', 'css': 'CSS3', 'javascript': 'JavaScript', 'js': 'JavaScript', 'typescript': 'TypeScript', 'jquery': 'jQuery',
            'angular': 'Angular', 'bootstrap': 'Bootstrap', 'wordpress': 'WordPress', 'razor': 'Razor Pages', 'api': 'APIs RESTful', 'rest': 'APIs RESTful',
            'node': 'Node.js', 'nodejs': 'Node.js', 'jest': 'Jest', 'git': 'Git', 'illustrator': 'Adobe Illustrator', 'photoshop': 'Photoshop',
            'canva': 'Canva', 'oracle': 'Oracle', 'github': 'GitHub', 'github actions': 'GitHub Actions', 'devops': 'DevOps', 'cloud': 'Cloud Computing', 'seo': 'SEO', 'google analytics': 'Google Analytics', 'scrum': 'Scrum'
        },
        // Tecnologías que no están en su stack (para responder con honestidad)
        unknown: ['react', 'vue', 'svelte', 'next', 'nextjs', 'docker', 'kubernetes', 'aws', 'azure', 'kotlin', 'swift', 'flutter', 'rust', 'golang', 'ruby', 'rails', 'laravel', 'django', 'mongodb', 'firebase', 'unity'],
        yes: {
            es: 'Sí ✅ Sahar trabaja con {tech}. {extra}',
            en: 'Yes ✅ Sahar works with {tech}. {extra}'
        },
        no: {
            es: '{tech} no aparece en su stack actual, pero aprende rápido y domina tecnologías cercanas como JavaScript, TypeScript, Angular y .NET.',
            en: '{tech} isn\'t in her current stack, but she learns fast and masters related technologies like JavaScript, TypeScript, Angular and .NET.'
        },
        usedIn: { es: 'Lo usó en: {list}.', en: 'She used it in: {list}.' }
    }
};
