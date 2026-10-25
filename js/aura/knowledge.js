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
            'Sahar es programadora, diseñadora y desarrolladora web, formada en Lambton College (Toronto) y con más de 5 años creando experiencias digitales.',
            'Aquí puedes explorar sus proyectos de desarrollo web, branding y programación, su stack tecnológico, su experiencia y cómo contactarla.',
            '¿Por dónde quieres empezar? Toca una opción o escríbeme tu pregunta.'
        ],
        en: [
            'Hi! 👋 Welcome to Sahar Chain\'s digital portfolio. I\'m {name}, her intelligent assistant.',
            'Sahar is a programmer, designer and web developer, trained at Lambton College (Toronto) with 5+ years crafting digital experiences.',
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
            pillars: { es: 'Sus pilares', en: 'Her pillars' }
        }
    },

    /* ---------- Intenciones ----------
       keys: palabras o frases que activan la respuesta (sin tildes, en minúscula).
       action: qué hace la interfaz (ir a una sección o abrir una página).
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
                es: 'El trabajo de Sahar se sostiene en tres pilares: 💻 Programación, 🧠 Inteligencia Artificial y 🎨 Diseño. Juntos le permiten llevar una idea desde la marca y la interfaz hasta el código y la automatización.',
                en: 'Sahar\'s work stands on three pillars: 💻 Programming, 🧠 Artificial Intelligence and 🎨 Design. Together they let her take an idea from brand and interface all the way to code and automation.'
            },
            action: { type: 'scroll', target: '#pilares', label: { es: 'Ver los pilares', en: 'See the pillars' } },
            chips: ['code', 'ai', 'design']
        },
        {
            id: 'ai',
            keys: ['ia', 'inteligencia artificial', 'machine learning', 'chatbot', 'chatbots', 'asistente', 'asistentes', 'ai', 'artificial intelligence', 'llm', 'gpt', 'claude'],
            answer: {
                es: 'En IA, Sahar se especializó en inteligencia artificial en Lambton College. Ha implementado chatbots con IA que redujeron los tiempos de respuesta en un 40%, automatiza procesos y diseña asistentes conversacionales como yo 🤖.',
                en: 'In AI, Sahar specialized in artificial intelligence at Lambton College. She has built AI chatbots that cut response times by 40%, automates processes and designs conversational assistants like me 🤖.'
            },
            action: { type: 'scroll', target: '#pilares', label: { es: 'Ver los pilares', en: 'See the pillars' } },
            chips: ['services', 'projects']
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
                es: 'Sahar Gabriela Chain Mayorga es programadora, diseñadora y desarrolladora web bilingüe. Combina programación (SQL, .NET, Python, PHP, Java, JavaScript) con marketing digital, branding y community management. Tiene más de 5 años como freelance y 4 años liderando proyectos en empresas.',
                en: 'Sahar Gabriela Chain Mayorga is a bilingual programmer, designer and web developer. She blends programming (SQL, .NET, Python, PHP, Java, JavaScript) with digital marketing, branding and community management. She has 5+ years of freelance work and 4 years leading projects at companies.'
            },
            action: { type: 'scroll', target: '#sobre-mi', label: { es: 'Ir a Sobre mí', en: 'Go to About' } },
            chips: ['education', 'experience', 'skills']
        },
        {
            id: 'education',
            keys: ['estudio', 'estudios', 'formacion', 'educacion', 'universidad', 'college', 'lambton', 'sena', 'titulo', 'carrera', 'education', 'degree', 'studied', 'school', 'academic'],
            answer: {
                es: 'Sahar estudió Computer Programmer en Lambton College, Toronto (2025), con especialización en desarrollo de software, bases de datos e inteligencia artificial. Antes se formó en Producción de Imágenes Digitales en el SENA, Colombia (2018).',
                en: 'Sahar studied Computer Programmer at Lambton College, Toronto (2025), specializing in software development, databases and artificial intelligence. Before that she trained in Digital Image Production at SENA, Colombia (2018).'
            },
            action: { type: 'scroll', target: '#sobre-mi', label: { es: 'Ver formación', en: 'See education' } },
            chips: ['experience', 'skills']
        },
        {
            id: 'languages',
            keys: ['idioma', 'idiomas', 'ingles', 'espanol', 'habla', 'bilingue', 'language', 'languages', 'english', 'spanish', 'speak'],
            answer: {
                es: 'Sahar es bilingüe: español nativo e inglés intermedio-avanzado. Su formación canadiense y su experiencia en Colombia le permiten moverse con facilidad entre ambos mercados.',
                en: 'Sahar is bilingual: native Spanish and intermediate-advanced English. Her Canadian training and Colombian work experience let her move easily between both markets.'
            },
            chips: ['about', 'contact']
        },
        {
            id: 'experience',
            keys: ['experiencia', 'trabajo', 'trabajado', 'empleo', 'empresa', 'empresas', 'laboral', 'cargo', 'disenos lasser', 'lasser', 'freelance', 'freelancer', 'experience', 'work', 'job', 'jobs', 'worked', 'career', 'company'],
            answer: {
                es: 'Su recorrido: 💼 Freelancer en desarrollo web, programación y community management (2020 – hoy). 🎨 Diseñadora gráfica y especialista en desarrollo digital en Diseños Lasser, Bogotá (2019 – 2023). 📣 Gestora de marca y comunicación independiente (2020 – 2025). Entre sus logros: +40% de eficiencia con bases de datos a medida y +30% de engagement en redes.',
                en: 'Her path: 💼 Freelance web developer, programmer and community manager (2020 – present). 🎨 Graphic designer & digital development specialist at Diseños Lasser, Bogotá (2019 – 2023). 📣 Independent brand & communications manager (2020 – 2025). Highlights: +40% efficiency with custom databases and +30% social engagement.'
            },
            action: { type: 'scroll', target: '#experiencia', label: { es: 'Ver experiencia', en: 'See experience' } },
            chips: ['skills', 'projects']
        },
        {
            id: 'skills',
            keys: ['habilidad', 'habilidades', 'tecnologia', 'tecnologias', 'stack', 'lenguaje', 'lenguajes', 'programa en', 'herramientas', 'domina', 'sabe', 'skills', 'skill', 'technologies', 'tech', 'languages programming', 'tools', 'know'],
            answer: {
                es: 'Su stack: ⚙️ Backend y datos: C#, .NET, VB.NET, Python, PHP, Java, SQL Server y MySQL. 🖥️ Frontend: HTML5, CSS3, JavaScript, TypeScript, jQuery, Angular y Bootstrap. 🧩 Frameworks: .NET Core, ASP.NET, Razor Pages, APIs RESTful y WordPress. 🎨 Diseño: Illustrator, Figma y Canva. 📈 Marketing: SEO, Google Analytics y chatbots.',
                en: 'Her stack: ⚙️ Backend & data: C#, .NET, VB.NET, Python, PHP, Java, SQL Server and MySQL. 🖥️ Frontend: HTML5, CSS3, JavaScript, TypeScript, jQuery, Angular and Bootstrap. 🧩 Frameworks: .NET Core, ASP.NET, Razor Pages, RESTful APIs and WordPress. 🎨 Design: Illustrator, Figma and Canva. 📈 Marketing: SEO, Google Analytics and chatbots.'
            },
            action: { type: 'scroll', target: '#habilidades', label: { es: 'Ver habilidades', en: 'See skills' } },
            chips: ['projects', 'code']
        },
        {
            id: 'services',
            keys: ['servicio', 'servicios', 'ofrece', 'que hace', 'puede hacer', 'contratar para', 'community manager', 'redes sociales', 'chatbot', 'automatizacion', 'consultoria', 'services', 'service', 'offer', 'what does she do', 'social media', 'automation', 'consulting'],
            answer: {
                es: 'Sahar ofrece: 🌐 desarrollo web (WordPress y a medida), 🤖 chatbots con IA y automatizaciones, 📱 community management y marketing, 🎨 branding e identidad visual, 💾 bases de datos y software a medida, y 📊 consultoría en transformación digital.',
                en: 'Sahar offers: 🌐 web development (WordPress and custom), 🤖 AI chatbots and automations, 📱 community management and marketing, 🎨 branding and visual identity, 💾 databases and custom software, and 📊 digital transformation consulting.'
            },
            action: { type: 'scroll', target: '#servicios', label: { es: 'Ver servicios', en: 'See services' } },
            chips: ['contact', 'projects']
        },
        {
            id: 'projects',
            keys: ['proyecto', 'proyectos', 'portafolio', 'portfolio', 'trabajos', 'muestra', 'ejemplos', 'casos', 'projects', 'project', 'work samples', 'case study', 'showcase'],
            answer: {
                es: 'Sahar tiene 10 proyectos en tres áreas: 🌐 desarrollo web (Sell Services, Sports Store, Little Stars), 🎨 branding (Zohar, ODEN, MetalTec, Únicos) y 💻 programación (Smart Agriculture, Bookstore, Jest CI y más). ¿Cuál área te interesa?',
                en: 'Sahar has 10 projects across three areas: 🌐 web development (Sell Services, Sports Store, Little Stars), 🎨 branding (Zohar, ODEN, MetalTec, Únicos) and 💻 programming (Smart Agriculture, Bookstore, Jest CI and more). Which area interests you?'
            },
            action: { type: 'scroll', target: '#proyectos', label: { es: 'Ir a proyectos', en: 'Go to projects' } },
            chips: ['web', 'design', 'code']
        },
        {
            id: 'web',
            keys: ['web', 'sitio', 'sitios', 'pagina web', 'paginas web', 'ecommerce', 'e-commerce', 'tienda', 'tiendas', 'website', 'websites', 'store', 'online shop'],
            answer: {
                es: 'En desarrollo web destacan: 🛒 Sell Services, un e-commerce con autenticación encriptada, carrito y pasarela de pagos (PHP + MySQL); 🏀 Sports Store, tienda deportiva con catálogo dinámico; y 👶 Little Stars, tienda infantil con filtros por edad.',
                en: 'Web development highlights: 🛒 Sell Services, an e-commerce with encrypted auth, cart and payment gateway (PHP + MySQL); 🏀 Sports Store, a sports shop with a dynamic catalog; and 👶 Little Stars, a kids\' clothing store with age filters.'
            },
            projects: ['sell-services', 'sports-store', 'little-stars']
        },
        {
            id: 'design',
            keys: ['diseno', 'disenos', 'branding', 'marca', 'marcas', 'logo', 'logos', 'identidad', 'grafico', 'illustrator', 'design', 'brand', 'brands', 'identity', 'graphic'],
            answer: {
                es: 'En branding y diseño: 💎 Zohar, identidad de lujo para joyería; 🧭 ODEN, marca inmobiliaria con símbolo de brújula; 🔩 MetalTec, branding completo con web en WordPress; y ✨ Únicos, su propia agencia creativa.',
                en: 'Branding & design: 💎 Zohar, a luxury jewelry identity; 🧭 ODEN, a real estate brand with a compass symbol; 🔩 MetalTec, full branding plus a WordPress site; and ✨ Únicos, her own creative agency.'
            },
            projects: ['zohar', 'oden', 'metaltec', 'unicos']
        },
        {
            id: 'code',
            keys: ['programacion', 'codigo', 'software', 'github', 'repositorio', 'repositorios', 'typescript', 'testing', 'pruebas', 'programming', 'code', 'repo', 'repos', 'tests'],
            answer: {
                es: 'En programación: 🌱 Smart Agriculture, agricultura de precisión con sensores IoT y riego automatizado; 📚 Bookstore, gestión de biblioteca en TypeScript con pruebas en Jest; ✅ Jest CI con GitHub Actions; y proyectos académicos de TypeScript y POO.',
                en: 'Programming: 🌱 Smart Agriculture, precision farming with IoT sensors and automated irrigation; 📚 Bookstore, a TypeScript library system tested with Jest; ✅ Jest CI with GitHub Actions; and academic TypeScript/OOP projects.'
            },
            projects: ['smart-agriculture', 'bookstore', 'jest-ci']
        },
        {
            id: 'contact',
            keys: ['contacto', 'contactar', 'contactarla', 'correo', 'email', 'mail', 'telefono', 'whatsapp', 'linkedin', 'escribirle', 'llamar', 'redes', 'contact', 'reach', 'phone', 'call', 'get in touch'],
            answer: {
                es: 'Puedes escribirle a 📧 sahargabriela9@gmail.com, buscarla en 💼 LinkedIn (Sahar Gabriela Chain Mayorga) o ver su código en 💻 github.com/SaharLambton.',
                en: 'You can email her at 📧 sahargabriela9@gmail.com, find her on 💼 LinkedIn (Sahar Gabriela Chain Mayorga) or check her code at 💻 github.com/SaharLambton.'
            },
            action: { type: 'scroll', target: '#contacto', label: { es: 'Ir a contacto', en: 'Go to contact' } },
            links: [
                { label: 'Email', href: 'mailto:sahargabriela9@gmail.com' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sahar-gabriela-chain-mayorga-b76433289' },
                { label: 'GitHub', href: 'https://github.com/SaharLambton' }
            ]
        },
        {
            id: 'hire',
            keys: ['disponible', 'disponibilidad', 'contratar', 'contratarla', 'contrato', 'vacante', 'freelance disponible', 'cotizar', 'cotizacion', 'precio', 'available', 'hire', 'hiring', 'availability', 'quote', 'rates', 'price'],
            answer: {
                es: 'Sahar está abierta a nuevos proyectos y oportunidades, tanto freelance como en empresa. Lo mejor es escribirle contándole tu idea: 📧 sahargabriela9@gmail.com.',
                en: 'Sahar is open to new projects and opportunities, freelance or in-house. The best way is to email her about your idea: 📧 sahargabriela9@gmail.com.'
            },
            action: { type: 'scroll', target: '#contacto', label: { es: 'Ir a contacto', en: 'Go to contact' } },
            links: [{ label: 'Email', href: 'mailto:sahargabriela9@gmail.com' }]
        },
        {
            id: 'location',
            keys: ['donde vive', 'ubicacion', 'ciudad', 'pais', 'de donde', 'canada', 'colombia', 'bogota', 'toronto', 'location', 'where', 'based', 'country', 'city'],
            answer: {
                es: 'Sahar se formó en Toronto, Canadá, y tiene una amplia trayectoria en Bogotá, Colombia. Trabaja de forma remota con clientes de ambos países.',
                en: 'Sahar trained in Toronto, Canada, and has a long track record in Bogotá, Colombia. She works remotely with clients in both countries.'
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

    /* ---------- Proyectos ---------- */
    projects: [
        {
            id: 'sell-services', name: 'Sell Services', keys: ['sell services', 'sell service', 'productos graficos', 'graphic products'],
            url: 'sell-services.html', thumb: 'img/thumbs/services.webp', area: 'web',
            tech: ['PHP', 'MySQL', 'JavaScript', 'jQuery'],
            desc: {
                es: 'Sell Services es una plataforma e-commerce completa para vender servicios y productos gráficos: autenticación con encriptación multinivel, carrito de compras, pasarela de pagos y gestión de productos. Hecha con PHP, MySQL, JavaScript y jQuery.',
                en: 'Sell Services is a complete e-commerce platform for graphic services and products: multi-level encrypted authentication, shopping cart, payment gateway and product management. Built with PHP, MySQL, JavaScript and jQuery.'
            },
            tag: { es: 'E-commerce · PHP + MySQL', en: 'E-commerce · PHP + MySQL' }
        },
        {
            id: 'sports-store', name: 'Sports Store', keys: ['sports store', 'sport store', 'tienda deportiva', 'deportes', 'deportiva', 'sports'],
            url: 'sports-store.html', area: 'web',
            tech: ['HTML5', 'CSS3', 'Responsive Design', 'YouTube API'],
            desc: {
                es: 'Sports Store es el sitio de una tienda deportiva con catálogo dinámico, programa de becas para jóvenes atletas, formulario de contacto y recursos educativos con la API de YouTube.',
                en: 'Sports Store is a sports shop website with a dynamic catalog, a scholarship program for young athletes, a contact form and educational resources via the YouTube API.'
            }
        },
        {
            id: 'little-stars', name: 'Little Stars', keys: ['little stars', 'ropa infantil', 'ninos', 'kids', 'children'],
            url: 'little-stars.html', area: 'web',
            tech: ['HTML5', 'CSS3', 'Font Awesome', 'Responsive Design'],
            desc: {
                es: 'Little Stars es una tienda de ropa infantil con diseño moderno y responsive: hero section, catálogo con filtros y categorías por edad.',
                en: 'Little Stars is a kids\' clothing store with a modern, responsive design: hero section, catalog with filters and age categories.'
            }
        },
        {
            id: 'zohar', name: 'Zohar', keys: ['zohar', 'joyeria', 'lujo', 'jewelry', 'luxury'],
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
            url: 'oden.html', area: 'design',
            tech: ['Adobe Illustrator', 'Branding', 'Logo Design'],
            desc: {
                es: 'ODEN es la identidad corporativa de una inmobiliaria: un logo con símbolo de brújula que representa orientación, paleta de grises y dorados y variaciones para aplicaciones digitales.',
                en: 'ODEN is the corporate identity for a real estate company: a compass-symbol logo representing guidance, a gray-and-gold palette and variations for digital use.'
            }
        },
        {
            id: 'metaltec', name: 'MetalTec Colombia', keys: ['metaltec', 'metal tec', 'metalurgica', 'metallurgical'],
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
            url: 'unicos.html', area: 'design',
            tech: ['Illustrator', 'Photoshop', 'Branding', 'Marketing'],
            desc: {
                es: 'Únicos es la agencia creativa de Sahar: diseño gráfico, marketing digital y desarrollo web para clientes como MetalTec y Óptica Vision Center, con material publicitario y estrategia digital.',
                en: 'Únicos is Sahar\'s own creative agency: graphic design, digital marketing and web development for clients like MetalTec and Vision Center Optical, including advertising material and digital strategy.'
            }
        },
        {
            id: 'smart-agriculture', name: 'Smart Agriculture', keys: ['smart agriculture', 'agricultura', 'agro', 'iot', 'sensores', 'riego', 'drones', 'farming', 'sensors', 'irrigation'],
            url: 'https://github.com/SaharLambton/Smart-Agriculture', external: true, area: 'code',
            tech: ['TypeScript', 'Node.js', 'IoT'],
            desc: {
                es: 'Smart Agriculture es un sistema de agricultura de precisión: monitoreo de sensores ambientales, riego automatizado según datos meteorológicos, detección de enfermedades en plantas e integración con drones. Hecho en TypeScript y Node.js.',
                en: 'Smart Agriculture is a precision farming system: environmental sensor monitoring, weather-driven automated irrigation, plant disease detection and drone integration. Built with TypeScript and Node.js.'
            },
            tag: { es: 'IoT · TypeScript', en: 'IoT · TypeScript' }
        },
        {
            id: 'bookstore', name: 'Bookstore', keys: ['bookstore', 'biblioteca', 'libros', 'library', 'books'],
            url: 'https://github.com/SaharLambton/Assigment3', external: true, area: 'code',
            tech: ['TypeScript', 'Jest', 'OOP'],
            desc: {
                es: 'Bookstore es un sistema de gestión de biblioteca en TypeScript: libros, clientes, préstamos y devoluciones con validación de disponibilidad, todo cubierto con pruebas unitarias en Jest.',
                en: 'Bookstore is a TypeScript library management system: books, customers, loans and returns with availability checks, fully covered by Jest unit tests.'
            }
        },
        {
            id: 'jest-ci', name: 'Jest CI', keys: ['jest ci', 'github actions', 'integracion continua', 'ci/cd', 'continuous integration', 'pipeline'],
            url: 'https://github.com/SaharLambton/Assigment4', external: true, area: 'code',
            tech: ['JavaScript', 'Jest', 'GitHub Actions'],
            desc: {
                es: 'Jest CI implementa integración continua para un proyecto JavaScript: pruebas con Jest que se ejecutan automáticamente en cada push gracias a GitHub Actions.',
                en: 'Jest CI sets up continuous integration for a JavaScript project: Jest tests run automatically on every push through GitHub Actions.'
            }
        }
    ],

    /* Proyectos que aparecen en "Destacados" */
    featured: ['sell-services', 'zohar', 'smart-agriculture'],

    /* ---------- Tecnologías (para preguntas tipo "¿sabe Python?") ---------- */
    tech: {
        known: {
            'c#': 'C#', 'csharp': 'C#', '.net': '.NET', 'dotnet': '.NET', 'net core': '.NET Core', 'asp.net': 'ASP.NET', 'vb.net': 'VB.NET',
            'python': 'Python', 'php': 'PHP', 'java': 'Java', 'sql': 'SQL', 'sql server': 'SQL Server', 'mysql': 'MySQL',
            'html': 'HTML5', 'css': 'CSS3', 'javascript': 'JavaScript', 'js': 'JavaScript', 'typescript': 'TypeScript', 'jquery': 'jQuery',
            'angular': 'Angular', 'bootstrap': 'Bootstrap', 'wordpress': 'WordPress', 'wix': 'Wix', 'razor': 'Razor Pages', 'api': 'APIs RESTful', 'rest': 'APIs RESTful',
            'node': 'Node.js', 'nodejs': 'Node.js', 'jest': 'Jest', 'git': 'Git', 'figma': 'Figma', 'illustrator': 'Adobe Illustrator', 'photoshop': 'Photoshop',
            'canva': 'Canva', 'seo': 'SEO', 'google analytics': 'Google Analytics', 'scrum': 'Scrum'
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
