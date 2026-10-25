/* ==========================================================
   SERVICIOS · catálogo (lo usan la consola "Diseña tu misión" y el catálogo)
   pillar: code | ai | design | marketing
   ========================================================== */
window.SERVICES = [
    /* ----- Tener presencia en internet ----- */
    {
        id: 'web', need: 'presence', pillar: 'code', icon: 'web',
        title: { es: 'Sitio web', en: 'Website' },
        short: { es: 'Tu negocio abierto las 24 horas, con un sitio rápido y fácil de administrar.', en: 'Your business open 24/7, with a fast site that is easy to manage.' },
        ideal: { es: 'Emprendimientos, comercios y profesionales', en: 'Startups, shops and professionals' },
        items: [
            { es: 'Diseño a medida o en WordPress', en: 'Custom design or WordPress' },
            { es: 'Adaptado a celular, en español e inglés', en: 'Mobile-friendly, in Spanish and English' },
            { es: 'SEO técnico y carga rápida', en: 'Technical SEO and fast loading' },
            { es: 'Botón de WhatsApp Business', en: 'WhatsApp Business button' }
        ]
    },
    {
        id: 'store', need: 'presence', pillar: 'code', icon: 'store',
        title: { es: 'Tienda online', en: 'Online store' },
        short: { es: 'Vende por internet con catálogo, carrito y pagos en línea.', en: 'Sell online with a catalog, cart and online payments.' },
        ideal: { es: 'Negocios que venden productos o servicios', en: 'Businesses that sell products or services' },
        items: [
            { es: 'Catálogo de productos fácil de actualizar', en: 'Product catalog that is easy to update' },
            { es: 'Carrito de compras y pasarela de pagos', en: 'Shopping cart and payment gateway' },
            { es: 'Gestión de pedidos e inventario', en: 'Order and inventory management' },
            { es: 'Cuentas de cliente seguras', en: 'Secure customer accounts' }
        ]
    },
    /* ----- Ordenar mi información ----- */
    {
        id: 'databases', need: 'data', pillar: 'code', icon: 'software',
        title: { es: 'Bases de datos', en: 'Databases' },
        short: { es: 'Tu información ordenada, segura y fácil de consultar.', en: 'Your information organized, secure and easy to query.' },
        ideal: { es: 'Empresas que manejan mucha información en hojas de cálculo o sistemas antiguos', en: 'Companies handling lots of data in spreadsheets or legacy systems' },
        items: [
            { es: 'Diseño e implementación de bases de datos', en: 'Database design and implementation' },
            { es: 'Optimización y administración SQL', en: 'SQL optimization and administration' },
            { es: 'Migración y respaldo de datos', en: 'Data migration and backup' },
            { es: 'Consultas y reportes a la medida', en: 'Custom queries and reports' }
        ]
    },
    {
        id: 'software', need: 'data', pillar: 'code', icon: 'system',
        title: { es: 'Software a medida', en: 'Custom software' },
        short: { es: 'Un sistema hecho para la forma en que trabaja tu empresa.', en: 'A system built around the way your company works.' },
        ideal: { es: 'Empresas con procesos propios que ningún programa resuelve', en: 'Companies with their own processes no off-the-shelf tool solves' },
        items: [
            { es: 'Sistemas de gestión empresarial', en: 'Business management systems' },
            { es: 'Aplicaciones a la medida', en: 'Custom applications' },
            { es: 'APIs RESTful', en: 'RESTful APIs' },
            { es: 'Integración con los sistemas que ya usas', en: 'Integration with the systems you already use' }
        ]
    },
    /* ----- Ahorrar tiempo con IA ----- */
    {
        id: 'automation', need: 'ai', pillar: 'ai', icon: 'automation',
        title: { es: 'Automatización de procesos', en: 'Process automation' },
        short: { es: 'Las tareas repetitivas se hacen solas y tu equipo gana horas.', en: 'Repetitive tasks run on their own and your team wins back hours.' },
        ideal: { es: 'Equipos con tareas manuales que consumen horas', en: 'Teams with manual tasks that eat up hours' },
        items: [
            { es: 'Diagnóstico de qué se puede automatizar', en: 'Assessment of what can be automated' },
            { es: 'Flujos automáticos entre tus herramientas', en: 'Automated workflows between your tools' },
            { es: 'Estandarización de procesos', en: 'Process standardization' },
            { es: 'Automatizaciones de marketing y ventas', en: 'Marketing and sales automations' }
        ]
    },
    {
        id: 'chatbots', need: 'ai', pillar: 'ai', icon: 'chatbots',
        title: { es: 'Chatbots y asistentes con IA', en: 'AI chatbots and assistants' },
        short: { es: 'Atiende a tus clientes al instante, a cualquier hora.', en: 'Serve your customers instantly, at any hour.' },
        ideal: { es: 'Negocios que reciben muchas preguntas repetidas', en: 'Businesses that get many repeated questions' },
        items: [
            { es: 'Chatbot para tu sitio web', en: 'Chatbot for your website' },
            { es: 'Respuestas automáticas en WhatsApp y redes', en: 'Automated replies on WhatsApp and social media' },
            { es: 'Entrenado con la información de tu negocio', en: 'Trained on your business information' },
            { es: 'Asistentes con voz como AURA', en: 'Voice assistants like AURA' }
        ]
    },
    {
        id: 'workshops', need: 'ai', pillar: 'ai', icon: 'workshops', badge: { es: 'NUEVO', en: 'NEW' },
        title: { es: 'Talleres y cursos de IA', en: 'AI workshops and courses' },
        short: { es: 'Tu equipo aprende a usar la IA generativa en su trabajo diario.', en: 'Your team learns to use generative AI in daily work.' },
        ideal: { es: 'Empresas que quieren adoptar la IA con su equipo', en: 'Companies that want to adopt AI with their team' },
        items: [
            { es: 'Talleres prácticos para equipos', en: 'Hands-on team workshops' },
            { es: 'Cursos de herramientas de IA generativa', en: 'Generative AI tool courses' },
            { es: 'Ejemplos adaptados a tu sector', en: 'Examples tailored to your industry' },
            { es: 'Buenas prácticas y uso responsable', en: 'Best practices and responsible use' }
        ]
    },
    /* ----- Verme profesional ----- */
    {
        id: 'branding', need: 'brand', pillar: 'design', icon: 'branding',
        title: { es: 'Identidad de marca', en: 'Brand identity' },
        short: { es: 'La base visual que hace reconocible tu marca y genera confianza.', en: 'The visual foundation that makes your brand recognizable and trusted.' },
        ideal: { es: 'Marcas nuevas o que necesitan renovarse', en: 'New brands or brands that need a refresh' },
        items: [
            { es: 'Logotipo', en: 'Logo' },
            { es: 'Paleta de colores y tipografías', en: 'Color palette and typography' },
            { es: 'Manual de marca', en: 'Brand manual' },
            { es: 'Papelería y aplicaciones de marca', en: 'Stationery and brand applications' }
        ]
    },
    {
        id: 'graphic', need: 'brand', pillar: 'design', icon: 'graphic',
        title: { es: 'Piezas gráficas para redes', en: 'Social media graphics' },
        short: { es: 'Publicaciones y material con un diseño coherente en todos tus canales.', en: 'Posts and materials with a consistent design across all your channels.' },
        ideal: { es: 'Marcas que publican seguido y quieren verse consistentes', en: 'Brands that post often and want to look consistent' },
        items: [
            { es: 'Posts, historias y carruseles', en: 'Posts, stories and carousels' },
            { es: 'Plantillas editables con tu marca', en: 'Editable branded templates' },
            { es: 'Material promocional digital e impreso', en: 'Digital and print promotional material' },
            { es: 'Adaptación a cada red y formato', en: 'Adapted to each network and format' }
        ]
    },
    {
        id: 'uxui', need: 'brand', pillar: 'design', icon: 'uxui',
        title: { es: 'Diseño UX/UI', en: 'UX/UI design' },
        short: { es: 'Pantallas fáciles de usar, diseñadas antes de programar.', en: 'Easy-to-use screens, designed before any code is written.' },
        ideal: { es: 'Apps, plataformas y sitios nuevos', en: 'New apps, platforms and websites' },
        items: [
            { es: 'Flujos de usuario y arquitectura de la información', en: 'User flows and information architecture' },
            { es: 'Wireframes', en: 'Wireframes' },
            { es: 'Prototipo interactivo', en: 'Interactive prototype' },
            { es: 'Diseño de interfaz listo para desarrollo', en: 'Development-ready interface design' }
        ]
    },
    /* ----- Crecer en redes y en digital ----- */
    {
        id: 'community', need: 'grow', pillar: 'marketing', icon: 'community',
        title: { es: 'Gestión de redes sociales', en: 'Social media management' },
        short: { es: 'Tus redes activas y constantes mientras tú te enfocas en tu negocio.', en: 'Your social media active and consistent while you focus on your business.' },
        ideal: { es: 'Marcas que quieren constancia en redes', en: 'Brands that want consistency on social media' },
        items: [
            { es: 'Plan y calendario de contenido', en: 'Content plan and calendar' },
            { es: 'Publicaciones en español e inglés', en: 'Posts in Spanish and English' },
            { es: 'Respuesta a comentarios y mensajes', en: 'Replies to comments and messages' },
            { es: 'Reporte mensual de resultados', en: 'Monthly results report' }
        ]
    },
    {
        id: 'consulting', need: 'grow', pillar: 'marketing', icon: 'consulting',
        title: { es: 'Estrategia digital', en: 'Digital strategy' },
        short: { es: 'Un diagnóstico claro y un plan concreto para crecer en internet.', en: 'A clear diagnosis and a concrete plan to grow online.' },
        ideal: { es: 'Negocios que no saben por dónde empezar', en: 'Businesses that don\'t know where to start' },
        items: [
            { es: 'Auditoría de tu presencia digital', en: 'Audit of your digital presence' },
            { es: 'Plan de crecimiento y transformación digital', en: 'Growth and digital transformation plan' },
            { es: 'SEO y campañas digitales', en: 'SEO and digital campaigns' },
            { es: 'Medición de métricas y KPIs', en: 'Metrics and KPI tracking' }
        ]
    }
];

/* Necesidades del catálogo: cada una agrupa servicios y lleva el color de su pilar */
window.SERVICE_NEEDS = [
    { id: 'presence', pillar: 'code', icon: 'web', title: { es: 'Tener presencia en internet', en: 'Be present online' }, intro: { es: 'Que te encuentren y te compren a cualquier hora.', en: 'Get found and sell at any hour.' } },
    { id: 'data', pillar: 'code', icon: 'software', title: { es: 'Ordenar mi información', en: 'Organize my information' }, intro: { es: 'Tus datos y procesos en sistemas claros y seguros.', en: 'Your data and processes in clear, secure systems.' } },
    { id: 'ai', pillar: 'ai', icon: 'automation', title: { es: 'Ahorrar tiempo con IA', en: 'Save time with AI' }, intro: { es: 'Menos tareas manuales y clientes atendidos al instante.', en: 'Fewer manual tasks and customers served instantly.' } },
    { id: 'brand', pillar: 'design', icon: 'branding', title: { es: 'Verme profesional', en: 'Look professional' }, intro: { es: 'Una imagen coherente en tu marca, tus redes y tus pantallas.', en: 'A consistent image across your brand, social media and screens.' } },
    { id: 'grow', pillar: 'marketing', icon: 'grow', title: { es: 'Crecer en redes y en digital', en: 'Grow on social media and online' }, intro: { es: 'Constancia, estrategia y resultados que puedes medir.', en: 'Consistency, strategy and results you can measure.' } }
];

/* Íconos (trazos SVG de 24×24) */
window.SERVICE_ICONS = {
    web: '<path d="M3 5h18v14H3z"/><path d="M3 9h18"/><path d="M7 7h.01M10 7h.01"/><path d="m9 13-2 2 2 2M15 13l2 2-2 2"/>',
    software: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
    automation: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3.5"/>',
    chatbots: '<path d="M4 5h16v11H8l-4 4z"/><path d="M9 10h.01M12 10h.01M15 10h.01"/>',
    workshops: '<path d="M3 8l9-4 9 4-9 4z"/><path d="M7 10v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5"/><path d="M21 8v6"/>',
    branding: '<path d="M12 3l2.6 5.6L20 9.5l-4 4 1 5.5-5-2.7-5 2.7 1-5.5-4-4 5.4-.9z"/>',
    community: '<circle cx="8" cy="9" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 19c.8-3 2.8-4.5 5-4.5s4.2 1.5 5 4.5"/><path d="M14 18.5c.5-2 1.7-3 3-3s2.5 1 3 3"/>',
    consulting: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 15l3-4 3 2 5-6"/><path d="M16 7h3v3"/>',
    sell: '<path d="M3 4h2l2.4 11h11L21 7H7"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
    system: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/>',
    learn: '<path d="M4 5h7a3 3 0 0 1 3 3v11a2 2 0 0 0-2-2H4z"/><path d="M20 5h-4a3 3 0 0 0-3 3"/><path d="M20 5v12h-6"/>',
    grow: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    idea: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
    store: '<path d="M4 9l1-5h14l1 5"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/>',
    rocket: '<path d="M12 15l-3-3c1-4 4-8 10-9-1 6-5 9-9 10z"/><path d="M9 12l-4 1-2 3 4 1M12 15l-1 4 3 2 1-4"/>',
    building: '<path d="M4 21V4h10v17"/><path d="M14 9h6v12"/><path d="M8 8h2M8 12h2M8 16h2M17 13h.01M17 17h.01"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    graphic: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    uxui: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 6h6M8 10h8v5H8zM10 18h4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'
};
