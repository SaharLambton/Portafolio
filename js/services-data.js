/* ==========================================================
   SERVICIOS · catálogo (lo usan la consola "Diseña tu misión" y el catálogo)
   pillar: code | ai | design | marketing
   ========================================================== */
window.SERVICES = [
    {
        id: 'web', pillar: 'code', icon: 'web',
        title: { es: 'Desarrollo web', en: 'Web development' },
        short: { es: 'Tu negocio abierto las 24 horas: sitios rápidos, responsivos y fáciles de administrar.', en: 'Your business open 24/7: fast, responsive sites that are easy to manage.' },
        ideal: { es: 'Emprendimientos, comercios y profesionales', en: 'Startups, shops and professionals' },
        items: [
            { es: 'Sitios en WordPress o a medida', en: 'WordPress or custom sites' },
            { es: 'Tiendas en línea y catálogos', en: 'Online stores and catalogs' },
            { es: 'Sitios bilingües', en: 'Bilingual websites' },
            { es: 'SEO técnico y velocidad', en: 'Technical SEO and speed' },
            { es: 'Integración con WhatsApp Business', en: 'WhatsApp Business integration' }
        ]
    },
    {
        id: 'software', pillar: 'code', icon: 'software',
        title: { es: 'Bases de datos y software', en: 'Databases and software' },
        short: { es: 'Tu información ordenada y tus procesos en un solo sistema.', en: 'Your information organized and your processes in a single system.' },
        ideal: { es: 'Empresas que manejan muchos datos o procesos', en: 'Companies handling lots of data or processes' },
        items: [
            { es: 'Bases de datos a la medida', en: 'Custom databases' },
            { es: 'Optimización y administración SQL', en: 'SQL optimization and administration' },
            { es: 'Software y sistemas de gestión', en: 'Software and management systems' },
            { es: 'APIs RESTful e integraciones', en: 'RESTful APIs and integrations' },
            { es: 'Migración y respaldo de datos', en: 'Data migration and backup' }
        ]
    },
    {
        id: 'automation', pillar: 'ai', icon: 'automation',
        title: { es: 'Automatización de procesos', en: 'Process automation' },
        short: { es: 'Deja que las tareas repetitivas se hagan solas.', en: 'Let repetitive tasks run on their own.' },
        ideal: { es: 'Equipos con tareas manuales que consumen horas', en: 'Teams with manual tasks that eat up hours' },
        items: [
            { es: 'Automatización de tareas repetitivas', en: 'Automation of repetitive tasks' },
            { es: 'Estandarización de procesos', en: 'Process standardization' },
            { es: 'Integración de herramientas de trabajo', en: 'Integration of work tools' },
            { es: 'Flujos de marketing y ventas', en: 'Marketing and sales workflows' }
        ]
    },
    {
        id: 'chatbots', pillar: 'ai', icon: 'chatbots',
        title: { es: 'Chatbots y asistentes con IA', en: 'AI chatbots and assistants' },
        short: { es: 'Atiende a tus clientes al instante, a cualquier hora.', en: 'Serve your customers instantly, at any hour.' },
        ideal: { es: 'Negocios que reciben muchas preguntas repetidas', en: 'Businesses that get many repeated questions' },
        items: [
            { es: 'Chatbots de atención al cliente', en: 'Customer service chatbots' },
            { es: 'Asistentes conversacionales como AURA', en: 'Conversational assistants like AURA' },
            { es: 'Respuestas automáticas en WhatsApp y redes', en: 'Automated replies on WhatsApp and social media' },
            { es: 'Preguntas frecuentes interactivas', en: 'Interactive FAQs' }
        ]
    },
    {
        id: 'workshops', pillar: 'ai', icon: 'workshops', badge: { es: 'NUEVO', en: 'NEW' },
        title: { es: 'Talleres y cursos de IA generativa', en: 'Generative AI workshops and courses' },
        short: { es: 'Tu equipo aprende a usar la IA en su trabajo diario, desde el primer día.', en: 'Your team learns to use AI in daily work, from day one.' },
        ideal: { es: 'Empresas que quieren adoptar la IA con su equipo', en: 'Companies that want to adopt AI with their team' },
        items: [
            { es: 'Talleres prácticos para equipos', en: 'Hands-on team workshops' },
            { es: 'Cursos de herramientas de IA generativa', en: 'Generative AI tool courses' },
            { es: 'Contenido adaptado a tu sector', en: 'Content tailored to your industry' },
            { es: 'Uso responsable de la IA', en: 'Responsible AI use' }
        ]
    },
    {
        id: 'branding', pillar: 'design', icon: 'branding',
        title: { es: 'Diseño y branding', en: 'Design and branding' },
        short: { es: 'Una identidad que te diferencia y genera confianza desde el primer vistazo.', en: 'An identity that sets you apart and builds trust at first glance.' },
        ideal: { es: 'Marcas nuevas o que necesitan renovarse', en: 'New brands or brands that need a refresh' },
        items: [
            { es: 'Identidad visual completa', en: 'Complete visual identity' },
            { es: 'Diseño de logotipo', en: 'Logo design' },
            { es: 'Paleta, tipografías y manual de marca', en: 'Palette, typography and brand manual' },
            { es: 'Plantillas para redes sociales', en: 'Social media templates' },
            { es: 'Material promocional digital e impreso', en: 'Digital and print promotional material' }
        ]
    },
    {
        id: 'community', pillar: 'marketing', icon: 'community',
        title: { es: 'Community management', en: 'Community management' },
        short: { es: 'Tus redes activas, con contenido y diseño propios, mientras tú te enfocas en tu negocio.', en: 'Your social media active with original content and design, while you focus on your business.' },
        ideal: { es: 'Marcas que quieren constancia en redes', en: 'Brands that want consistency on social media' },
        items: [
            { es: 'Gestión completa de redes sociales', en: 'Full social media management' },
            { es: 'Contenido en español e inglés', en: 'Content in Spanish and English' },
            { es: 'Diseño para cada publicación', en: 'Design for every post' },
            { es: 'Respuesta a comentarios y mensajes', en: 'Replies to comments and messages' },
            { es: 'Reportes mensuales', en: 'Monthly reports' }
        ]
    },
    {
        id: 'consulting', pillar: 'marketing', icon: 'consulting',
        title: { es: 'Consultoría y estrategia', en: 'Consulting and strategy' },
        short: { es: 'Un diagnóstico claro y un plan concreto para crecer en digital.', en: 'A clear diagnosis and a concrete plan to grow online.' },
        ideal: { es: 'Negocios que no saben por dónde empezar', en: 'Businesses that don\'t know where to start' },
        items: [
            { es: 'Auditoría de presencia digital', en: 'Digital presence audit' },
            { es: 'Estrategia de marca y crecimiento', en: 'Brand and growth strategy' },
            { es: 'SEO y campañas digitales', en: 'SEO and digital campaigns' },
            { es: 'Analítica web y KPIs', en: 'Web analytics and KPIs' }
        ]
    }
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
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'
};
