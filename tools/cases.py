#!/usr/bin/env python3
"""Genera las páginas de cada proyecto (Zohar.html, oden.html, ...).

Cada proyecto comparte la estructura del sitio (barra, AURA, fondo de partículas)
pero tiene su propia identidad: colores de marca, tipografía, viñetas y un motivo
animado en la portada. Para cambiar un texto o una imagen, edita los datos de
PROJECTS y ejecuta:

    python3 tools/cases.py
"""
import html
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V = '20261025j'  # versión de los archivos CSS/JS (evita caché vieja)


def e(s):
    return html.escape(s, quote=True)


def bi(tag, cls, t, extra=''):
    """Elemento con texto bilingüe: t = (es, en)."""
    es, en = t
    c = f' class="{cls}"' if cls else ''
    return f'<{tag}{c}{extra} data-es="{e(es)}" data-en="{e(en)}">{e(es)}</{tag}>'


# ----------------------------------------------------------------------------
# Datos de los proyectos
# ----------------------------------------------------------------------------
PROJECTS = [
    {
        'id': 'sell-services', 'file': 'sell-services.html', 'name': 'Sell Services', 'pillar': 'web',
        'theme': {'brand': '#3ccfcf', 'brand_rgb': '60, 207, 207', 'brand2': '#7b61ff', 'brand2_rgb': '123, 97, 255',
                  'bg': '#050c10', 'display': "'Space Grotesk', sans-serif", 'body': "'Exo 2', sans-serif",
                  'fonts': 'Space+Grotesk:wght@500;700', 'motif': 'secure', 'bullet': '🔒'},
        'kicker': ('DESARROLLO WEB · E-COMMERCE', 'WEB DEVELOPMENT · E-COMMERCE'),
        'title': ('Sell Services and Graphic Products', 'Sell Services and Graphic Products'),
        'tagline': ('Plataforma e-commerce para vender servicios y productos gráficos, con seguridad multinivel.',
                    'E-commerce platform to sell graphic services and products, with multi-level security.'),
        'tags': ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'HTML5', 'CSS3'],
        'hero': {'video': 'services.mp4', 'poster': 'img/cases/img-services.webp'},
        'facts': [
            (('Tipo', 'Type'), ('Proyecto académico · Lambton College', 'Academic project · Lambton College')),
            (('Duración', 'Duration'), ('1 mes', '1 month')),
            (('Rol', 'Role'), ('Desarrolladora full stack', 'Full stack developer')),
            (('Stack', 'Stack'), ('PHP · MySQL · JavaScript · jQuery', 'PHP · MySQL · JavaScript · jQuery')),
        ],
        'summary': ('Una plataforma completa para comercializar productos y servicios gráficos personalizados (camisetas, cuadernos, termos), que conecta a diseñadores con clientes. Integra catálogo, carrito, pagos y un panel de administración, todo protegido con un sistema de seguridad de varias capas.',
                    'A complete platform to sell customized graphic products and services (t-shirts, notebooks, tumblers), connecting designers with customers. It brings together a catalog, cart, payments and an admin panel, all protected by a multi-layer security system.'),
        'gallery': [
            ('img/cases/img-services.webp', ('Página principal', 'Home page')),
            ('img/cases/img-services-login-y-registro.webp', ('Login y registro', 'Login and sign-up')),
            ('img/cases/img-services-login.webp', ('Inicio de sesión', 'Sign in')),
            ('img/cases/img-services-register.webp', ('Registro de usuarios', 'User registration')),
        ],
        'blocks': [
            {'title': ('Funcionalidades', 'Features'), 'items': [
                ('Registro y autenticación con encriptación multinivel', 'Sign-up and authentication with multi-level encryption'),
                ('Catálogo dinámico de productos personalizables', 'Dynamic catalog of customizable products'),
                ('Carrito de compras que se actualiza en tiempo real', 'Shopping cart that updates in real time'),
                ('Pasarela de pagos con procesamiento seguro', 'Payment gateway with secure processing'),
                ('Panel de administración de productos, pedidos y usuarios', 'Admin panel for products, orders and users'),
                ('Ofertas con temporizador y popup promocional', 'Offers with countdown timer and promotional popup')]},
            {'title': ('Arquitectura de seguridad', 'Security architecture'), 'items': [
                ('Contraseñas con bcrypt (password_hash)', 'Passwords hashed with bcrypt (password_hash)'),
                ('Consultas preparadas contra SQL Injection', 'Prepared statements against SQL injection'),
                ('Protección contra XSS y tokens CSRF', 'XSS protection and CSRF tokens'),
                ('Validación en frontend y backend', 'Frontend and backend validation'),
                ('Sesiones seguras con regeneración de ID', 'Secure sessions with ID regeneration')]},
            {'title': ('Para cada usuario', 'For each user'), 'items': [
                ('Clientes: catálogo, carrito persistente, pedidos y perfil', 'Customers: catalog, persistent cart, orders and profile'),
                ('Administradores: inventario, pedidos, usuarios y promociones', 'Admins: inventory, orders, users and promotions'),
                ('Pagos: confirmación automática y comprobantes', 'Payments: automatic confirmation and receipts')]},
        ],
        'challenges': [
            (('Proteger datos y transacciones', 'Protect data and transactions'),
             ('Seguridad en varias capas: encriptación de contraseñas, validación estricta de entradas y consultas preparadas en todo el sistema.',
              'Multi-layer security: password hashing, strict input validation and prepared statements across the whole system.')),
            (('Comprar sin recargar la página', 'Shopping without page reloads'),
             ('AJAX con jQuery para actualizar el carrito y procesar acciones al instante, con una experiencia mucho más fluida.',
              'AJAX with jQuery to update the cart and process actions instantly, for a much smoother experience.')),
        ],
        'results': [
            ('E-commerce funcional de punta a punta: catálogo, carrito, pagos y administración', 'End-to-end working e-commerce: catalog, cart, payments and admin'),
            ('Datos de usuarios protegidos con buenas prácticas de seguridad', 'User data protected with security best practices'),
            ('Experiencia de compra fluida y responsive', 'Smooth, responsive shopping experience'),
        ],
        'cta': (('¿Necesitas una tienda en línea segura?', 'Need a secure online store?'),
                ('Desarrollo plataformas e-commerce a la medida de tu negocio.', 'I build e-commerce platforms tailored to your business.')),
        'service': 'web',
    },
    {
        'id': 'sports-store', 'file': 'sports-store.html', 'name': 'Sports Store', 'pillar': 'web',
        'theme': {'brand': '#ff3b4e', 'brand_rgb': '255, 59, 78', 'brand2': '#4cc9f0', 'brand2_rgb': '76, 201, 240',
                  'bg': '#080b12', 'display': "'Bebas Neue', sans-serif", 'body': "'Exo 2', sans-serif",
                  'fonts': 'Bebas+Neue', 'motif': 'sport', 'bullet': '⚡'},
        'kicker': ('DESARROLLO WEB · SITIO', 'WEB DEVELOPMENT · WEBSITE'),
        'title': ('Sports Store', 'Sports Store'),
        'tagline': ('Tienda deportiva con propósito: catálogo, becas para jóvenes atletas y recursos educativos.',
                    'A sports store with purpose: catalog, scholarships for young athletes and educational resources.'),
        'tags': ['HTML5', 'CSS3', 'Responsive', 'YouTube API', 'UI/UX'],
        'hero': {'video': 'sport.mp4', 'poster': 'img/cases/img-sport.webp'},
        'facts': [
            (('Tipo', 'Type'), ('Proyecto académico · Lambton College', 'Academic project · Lambton College')),
            (('Duración', 'Duration'), ('20 días', '20 days')),
            (('Rol', 'Role'), ('Desarrolladora frontend', 'Frontend developer')),
            (('Stack', 'Stack'), ('HTML5 · CSS3 · YouTube', 'HTML5 · CSS3 · YouTube')),
        ],
        'summary': ('Un sitio completo para una tienda de artículos de los deportes más populares de Canadá. Va más allá del comercio: incluye un programa de becas para jóvenes atletas y videos educativos para padres sobre los beneficios del deporte, con un fuerte enfoque de responsabilidad social.',
                    "A complete website for a store selling gear for Canada's most popular sports. It goes beyond commerce: it includes a scholarship program for young athletes and educational videos for parents about the benefits of sport, with a strong social responsibility focus."),
        'gallery': [('img/cases/img-sport.webp', ('Página principal', 'Home page'))],
        'blocks': [
            {'title': ('Secciones', 'Sections'), 'items': [
                ('Inicio con hero impactante y navegación clara', 'Home with a bold hero and clear navigation'),
                ('Catálogo de hockey, béisbol, basketball y más', 'Catalog for hockey, baseball, basketball and more'),
                ('Nosotros: misión, valores y compromiso juvenil', 'About: mission, values and youth commitment'),
                ('Contacto con formulario validado y tiendas en el GTA', 'Contact with a validated form and stores in the GTA')]},
            {'title': ('Impacto social', 'Social impact'), 'items': [
                ('Programa de becas con formulario de solicitud', 'Scholarship program with application form'),
                ('Carrusel de videos educativos de YouTube', 'Carousel of educational YouTube videos'),
                ('Noticias, nuevas becas y términos en PDF', 'News, new scholarships and terms in PDF')]},
            {'title': ('Técnica', 'Technique'), 'items': [
                ('HTML5 semántico para accesibilidad y SEO', 'Semantic HTML5 for accessibility and SEO'),
                ('Flexbox, Grid, animaciones y efectos hover', 'Flexbox, Grid, animations and hover effects'),
                ('Diseño mobile-first con media queries', 'Mobile-first design with media queries'),
                ('Iframes de YouTube responsivos', 'Responsive YouTube iframes')]},
        ],
        'results': [
            ('Sitio de 4 páginas completo y responsive', 'Complete, responsive 4-page website'),
            ('Comercio y responsabilidad social en una misma marca', 'Commerce and social responsibility in a single brand'),
            ('Contenido educativo integrado para las familias', 'Educational content built in for families'),
        ],
        'cta': (('¿Necesitas un sitio web profesional?', 'Need a professional website?'),
                ('Creo sitios responsive y funcionales para tu negocio.', 'I build responsive, functional websites for your business.')),
        'service': 'web',
    },
    {
        'id': 'little-stars', 'file': 'little-stars.html', 'name': 'Little Stars', 'pillar': 'web',
        'theme': {'brand': '#ffb3cf', 'brand_rgb': '255, 179, 207', 'brand2': '#9ad8f5', 'brand2_rgb': '154, 216, 245',
                  'bg': '#0c0e1e', 'display': "'Quicksand', sans-serif", 'body': "'Quicksand', sans-serif",
                  'fonts': 'Quicksand:wght@500;600;700', 'motif': 'stars', 'bullet': '★'},
        'kicker': ('DESARROLLO WEB · DISEÑO', 'WEB DEVELOPMENT · DESIGN'),
        'title': ('Little Stars', 'Little Stars'),
        'tagline': ('Tienda de ropa infantil con un diseño suave, amigable y totalmente responsive.',
                    "Kids' clothing store with a soft, friendly and fully responsive design."),
        'tags': ['HTML5', 'CSS3', 'Font Awesome', 'Responsive', 'UI/UX'],
        'hero': {'video': 'store.mp4', 'poster': 'img/cases/img-little-stars.webp'},
        'facts': [
            (('Tipo', 'Type'), ('Proyecto personal de práctica', 'Personal practice project')),
            (('Duración', 'Duration'), ('2 días', '2 days')),
            (('Rol', 'Role'), ('Desarrolladora frontend', 'Frontend developer')),
            (('Stack', 'Stack'), ('HTML5 · CSS3 · Font Awesome', 'HTML5 · CSS3 · Font Awesome')),
        ],
        'summary': ('Un sitio para una tienda ficticia de ropa infantil, creado para practicar maquetación y diseño responsive. Simula una experiencia real de e-commerce con énfasis en la estética y la usabilidad: colores pastel, tarjetas de producto y navegación por edades.',
                    "A website for a fictional kids' clothing store, built to practice layout and responsive design. It simulates a real e-commerce experience with a focus on aesthetics and usability: pastel colors, product cards and browsing by age."),
        'gallery': [
            ('img/cases/img-little-stars.webp', ('Página principal', 'Home page')),
            ('img/cases/img-little-stars-categorias.webp', ('Categorías populares', 'Popular categories')),
            ('img/cases/img-little-stars-shop.webp', ('Página de tienda', 'Shop page')),
        ],
        'blocks': [
            {'title': ('Lo que incluye', "What's included"), 'items': [
                ('Hero con llamado a la acción', 'Hero with call to action'),
                ('Categorías: niñas, niños y bebés', 'Categories: girls, boys and babies'),
                ('Tienda con grid de productos y buscador', 'Shop with product grid and search'),
                ('Filtros por categoría y talla', 'Filters by category and size'),
                ('Sección "Por qué elegirnos" con íconos', '"Why choose us" section with icons')]},
            {'title': ('Lo que practiqué', 'What I practiced'), 'items': [
                ('CSS Grid y Flexbox', 'CSS Grid and Flexbox'),
                ('Componentes reutilizables: tarjetas y botones', 'Reusable components: cards and buttons'),
                ('Diseño mobile-first', 'Mobile-first design'),
                ('HTML semántico y accesible', 'Semantic, accessible HTML')]},
            {'title': ('Próximos pasos', 'Next steps'), 'items': [
                ('Filtros dinámicos con JavaScript', 'Dynamic filters with JavaScript'),
                ('Carrito con almacenamiento local', 'Cart with local storage'),
                ('Backend y base de datos de productos', 'Backend and product database'),
                ('Pasarela de pagos', 'Payment gateway')]},
        ],
        'results': [
            ('Interfaz de e-commerce limpia y moderna en solo 2 días', 'Clean, modern e-commerce interface in just 2 days'),
            ('Paleta suave pensada para un público infantil', 'Soft palette designed for a children audience'),
            ('Base lista para crecer con funcionalidades reales', 'A solid base ready to grow with real features'),
        ],
        'cta': (('¿Necesitas un diseño web atractivo?', 'Need an attractive web design?'),
                ('Creo interfaces modernas y responsive para tu negocio.', 'I create modern, responsive interfaces for your business.')),
        'service': 'web',
    },
    {
        'id': 'zohar', 'file': 'Zohar.html', 'name': 'Zohar', 'pillar': 'design',
        'theme': {'brand': '#d7dce8', 'brand_rgb': '215, 220, 232', 'brand2': '#5b6fd6', 'brand2_rgb': '91, 111, 214',
                  'bg': '#0a0d1b', 'display': "'Cinzel', serif", 'body': "'Montserrat', sans-serif",
                  'fonts': 'Cinzel:wght@500;700&family=Montserrat:wght@400;500;600', 'motif': 'waves', 'bullet': '◇'},
        'kicker': ('DISEÑO · BRANDING DE LUJO', 'DESIGN · LUXURY BRANDING'),
        'title': ('Zohar', 'Zohar'),
        'tagline': ('Identidad de marca para joyería de lujo: del concepto a la implementación visual completa.',
                    'Brand identity for luxury jewelry: from concept to complete visual implementation.'),
        'tags': ['Branding', 'Logo', 'Manual de marca', 'Packaging', 'Estrategia digital'],
        'hero': {'img': 'img/cases/zohar-zohar-fondo-oscuro.webp', 'alt': 'Logo de Zohar en plata sobre azul profundo'},
        'facts': [
            (('Cliente', 'Client'), ('Marca de joyería de lujo', 'Luxury jewelry brand')),
            (('Duración', 'Duration'), ('6 semanas', '6 weeks')),
            (('Rol', 'Role'), ('Diseñadora de marca', 'Brand designer')),
            (('Herramientas', 'Tools'), ('Illustrator · Photoshop', 'Illustrator · Photoshop')),
        ],
        'summary': ('Identidad visual completa para Zohar, una marca de joyería que busca trascender lo convencional con piezas exclusivas y personalizadas. El proyecto abarcó desde la filosofía de marca hasta el logo, el manual, las aplicaciones y la estrategia de comunicación.',
                    'Complete visual identity for Zohar, a jewelry brand that seeks to transcend the conventional with exclusive, personalized pieces. The project covered everything from brand philosophy to logo, manual, applications and communication strategy.'),
        'concept': {
            'title': ('"Zohar" significa esplendor', '"Zohar" means splendor'),
            'quote': ('Conectamos emociones, creamos relaciones. Tu lujo, tu historia.', 'We connect emotions, we build relationships. Your luxury, your story.'),
            'paras': [
                ('El logo encapsula el esplendor con un diseño minimalista: sobre un azul profundo, como el océano en calma, aparecen suaves olas que aportan movimiento y fluidez.',
                 'The logo captures splendor through a minimalist design: on a deep blue, like a calm ocean, soft waves bring movement and fluidity.'),
                ('El nombre resplandece en plata con una tipografía estilizada: letras de base cuadrada con curvas que evocan la elegancia y las ondas del mar.',
                 'The name shines in silver with a stylized typeface: square-based letters with curves that evoke elegance and the waves of the sea.')]},
        'gallery': [
            ('img/cases/zohar-recurso-11.webp', ('Logo principal', 'Main logo')),
            ('img/cases/zohar-logo-oscuro.webp', ('Logo alternativo', 'Alternate logo')),
            ('img/cases/zohar-recurso-5.webp', ('Packaging de lujo', 'Luxury packaging')),
            ('img/cases/zohar-recurso-9.webp', ('Tarjetas de presentación', 'Business cards')),
            ('img/cases/zohar-recurso-10.webp', ('Shopping bags', 'Shopping bags')),
            ('img/cases/zohar-recurso-4.webp', ('Señalética de tienda', 'Store signage')),
            ('img/cases/zohar-recurso-7.webp', ('Señalética de tienda', 'Store signage')),
            ('img/cases/zohar-recurso-8.webp', ('Etiquetas de lujo', 'Luxury tags')),
        ],
        'palette': [('Azul oscuro', 'Dark blue', '#0A0D1B'), ('Azul', 'Blue', '#171A32'), ('Plata', 'Silver', '#C0C0C0'), ('Gris', 'Gray', '#6D6D6C')],
        'type': [('Cinzel', "'Cinzel', serif", 'ZOHAR', ('Títulos y logo: elegante y distintiva.', 'Headings and logo: elegant and distinctive.')),
                 ('Montserrat', "'Montserrat', sans-serif", 'Zohar Jewelry', ('Textos: moderna y legible.', 'Body text: modern and legible.'))],
        'blocks': [
            {'title': ('Estrategia de marca', 'Brand strategy'), 'items': [
                ('Misión: joyería que cuenta historias y conecta emociones', 'Mission: jewelry that tells stories and connects emotions'),
                ('Visión: ser referente mundial de la joyería de lujo', 'Vision: to become a global benchmark in luxury jewelry'),
                ('Público: profesionales, amantes de la moda y regaladores conscientes', 'Audience: professionals, fashion lovers and thoughtful gift-givers')]},
            {'title': ('Estrategia digital', 'Digital strategy'), 'items': [
                ('Instagram y Facebook con contenido visual premium', 'Instagram and Facebook with premium visual content'),
                ('Contenido de usuarios con hashtag de marca', 'User content with a brand hashtag'),
                ('Historias del proceso artesanal de cada pieza', 'Stories about the craft behind each piece'),
                ('Publicidad segmentada y KPIs de ventas e interacción', 'Targeted ads and sales and engagement KPIs')]},
            {'title': ('Entregables', 'Deliverables'), 'items': [
                ('Logo en AI, EPS, SVG y PNG', 'Logo in AI, EPS, SVG and PNG'),
                ('Manual de marca en PDF', 'Brand manual in PDF'),
                ('Mockups de packaging, papelería y señalética', 'Packaging, stationery and signage mockups'),
                ('Plantillas para redes y material promocional', 'Templates for social media and promotional material'),
                ('Paleta en HEX, RGB, CMYK y Pantone', 'Palette in HEX, RGB, CMYK and Pantone')]},
        ],
        'results': [
            ('Identidad cohesiva que refleja lujo y autenticidad', 'A cohesive identity that reflects luxury and authenticity'),
            ('Manual de marca profesional para todas las aplicaciones', 'A professional brand manual for every application'),
            ('Sistema visual flexible para múltiples medios', 'A flexible visual system for multiple media'),
            ('Diferenciación clara en el mercado de joyería de lujo', 'Clear differentiation in the luxury jewelry market'),
        ],
        'cta': (('¿Necesitas una identidad de marca de lujo?', 'Need a luxury brand identity?'),
                ('Te ayudo a crear una marca memorable y elegante como Zohar.', 'I can help you create a memorable, elegant brand like Zohar.')),
        'service': 'branding',
    },
    {
        'id': 'oden', 'file': 'oden.html', 'name': 'ODEN', 'pillar': 'design',
        'theme': {'brand': '#f5a524', 'brand_rgb': '245, 165, 36', 'brand2': '#a3a2a2', 'brand2_rgb': '163, 162, 162',
                  'bg': '#111110', 'display': "'Josefin Sans', sans-serif", 'body': "'Exo 2', sans-serif",
                  'fonts': 'Josefin+Sans:wght@400;600;700', 'motif': 'compass', 'bullet': '➤'},
        'kicker': ('DISEÑO · BRANDING CORPORATIVO', 'DESIGN · CORPORATE BRANDING'),
        'title': ('ODEN', 'ODEN'),
        'tagline': ('Identidad visual para una inmobiliaria: guiando a las personas hacia su hogar ideal.',
                    'Visual identity for a real estate company: guiding people to their ideal home.'),
        'tags': ['Branding', 'Logo', 'Identidad visual', 'Inmobiliaria'],
        'hero': {'img': 'img/cases/oden-recurso-13.webp', 'alt': 'Logo de ODEN con símbolo de brújula'},
        'facts': [
            (('Cliente', 'Client'), ('Empresa inmobiliaria', 'Real estate company')),
            (('Duración', 'Duration'), ('1 mes', '1 month')),
            (('Rol', 'Role'), ('Diseñadora de marca', 'Brand designer')),
            (('Herramientas', 'Tools'), ('Adobe Illustrator', 'Adobe Illustrator')),
        ],
        'summary': ('Identidad visual completa para ODEN, una inmobiliaria que quiere ser la guía confiable de quienes buscan su hogar. El reto: un logo memorable que transmita orientación, confianza y profesionalismo.',
                    'Complete visual identity for ODEN, a real estate company that wants to be the trusted guide for people looking for a home. The challenge: a memorable logo that conveys guidance, trust and professionalism.'),
        'concept': {
            'title': ('Guiando hacia tu hogar', 'Guiding you home'),
            'quote': ('La brújula siempre señala el norte.', 'The compass always points north.'),
            'paras': [
                ('El logo integra una brújula estilizada que simboliza la capacidad de la empresa para orientar a sus clientes en una de las decisiones más importantes de su vida.',
                 "The logo features a stylized compass that symbolizes the company's ability to guide clients through one of the most important decisions of their lives."),
                ('El nombre ODEN nace de los socios fundadores. La paleta combina grises profesionales con acentos dorados que aportan calidez y confianza.',
                 'The name ODEN comes from the founding partners. The palette combines professional grays with gold accents that bring warmth and trust.')]},
        'gallery': [
            ('img/cases/oden-recurso-6.webp', ('Logo principal en plata', 'Main logo in silver')),
            ('img/cases/oden-recurso-5.webp', ('Logo dorado', 'Gold logo')),
            ('img/cases/oden-mesa-de-trabajo-1.webp', ('Branding integral', 'Full branding')),
            ('img/cases/oden-iconos-app.webp', ('Íconos para apps', 'App icons')),
            ('img/cases/oden-patron-de-marca.webp', ('Patrón de marca', 'Brand pattern')),
            ('img/cases/oden-recurso-9.webp', ('Banner publicitario', 'Advertising banner')),
            ('img/cases/oden-recurso-10.webp', ('Banner publicitario', 'Advertising banner')),
            ('img/cases/oden-recurso-11.webp', ('Banner publicitario', 'Advertising banner')),
            ('img/cases/oden-recurso-12.webp', ('Banner publicitario', 'Advertising banner')),
        ],
        'palette': [('Gris claro', 'Light gray', '#D3D3D3'), ('Gris', 'Gray', '#A3A2A2'), ('Negro', 'Black', '#1D1D1B'), ('Pizarra', 'Slate', '#4D4C4C'),
                    ('Dorado oscuro', 'Dark gold', '#AE7D12'), ('Oro', 'Gold', '#D69427'), ('Dorado brillante', 'Bright gold', '#F59B1A'), ('Dorado claro', 'Light gold', '#F7C257')],
        'type': [('The Munday', "'Josefin Sans', sans-serif", 'ODEN', ('Logotipo: minimalista, con terminaciones cuadradas y curvas sutiles.', 'Logotype: minimalist, with square terminals and subtle curves.'))],
        'blocks': [
            {'title': ('Simbolismo de la brújula', 'Compass symbolism'), 'items': [
                ('Orientación: guiar en la dirección correcta', 'Guidance: pointing in the right direction'),
                ('Confianza: un instrumento confiable', 'Trust: a reliable instrument'),
                ('Claridad: certeza en decisiones importantes', 'Clarity: certainty in big decisions'),
                ('Destino: el camino hacia el hogar perfecto', 'Destination: the road to the perfect home')]},
            {'title': ('Público objetivo', 'Target audience'), 'items': [
                ('Jóvenes profesionales y su primera vivienda', 'Young professionals and their first home'),
                ('Inversionistas inmobiliarios', 'Real estate investors'),
                ('Familias que buscan más espacio', 'Families looking for more space')]},
            {'title': ('Entregables', 'Deliverables'), 'items': [
                ('Logo en plata, dorado, blanco y negro', 'Logo in silver, gold, white and black'),
                ('Versiones horizontal, vertical y símbolo', 'Horizontal, vertical and symbol versions'),
                ('Íconos para apps y redes sociales', 'Icons for apps and social media'),
                ('Patrones de marca y banners', 'Brand patterns and banners'),
                ('Archivos fuente editables', 'Editable source files')]},
        ],
        'process': [
            (('Investigación', 'Research'), ('Sector, competencia y valores de marca.', 'Industry, competitors and brand values.')),
            (('Concepto', 'Concept'), ('La brújula como guía hacia el hogar.', 'The compass as a guide home.')),
            (('Diseño', 'Design'), ('Bocetos, logo, tipografía y color.', 'Sketches, logo, typography and color.')),
            (('Variaciones', 'Variations'), ('Versiones cromáticas y formatos.', 'Color versions and formats.')),
            (('Entrega', 'Delivery'), ('Archivos listos para implementar.', 'Files ready to implement.')),
        ],
        'results': [
            ('Identidad memorable que comunica orientación y confianza', 'A memorable identity that conveys guidance and trust'),
            ('Logo versátil con múltiples variaciones', 'A versatile logo with multiple variations'),
            ('Símbolo icónico y fácil de reconocer', 'An iconic, easily recognizable symbol'),
        ],
        'cta': (('¿Necesitas una identidad visual para tu empresa?', 'Need a visual identity for your company?'),
                ('Creo logos memorables y profesionales como el de ODEN.', 'I create memorable, professional logos like ODEN.')),
        'service': 'branding',
    },
    {
        'id': 'metaltec', 'file': 'metaltec.html', 'name': 'MetalTec Colombia', 'pillar': 'design',
        'theme': {'brand': '#ff5722', 'brand_rgb': '255, 87, 34', 'brand2': '#7f97a8', 'brand2_rgb': '127, 151, 168',
                  'bg': '#0d1114', 'display': "'Oswald', sans-serif", 'body': "'Exo 2', sans-serif",
                  'fonts': 'Oswald:wght@500;600;700', 'motif': 'iso', 'bullet': '⬢'},
        'kicker': ('DISEÑO · WEB · REDES', 'DESIGN · WEB · SOCIAL'),
        'title': ('MetalTec Colombia', 'MetalTec Colombia'),
        'tagline': ('Branding integral desde cero para una metalúrgica: identidad, sitio web y redes sociales.',
                    'End-to-end branding from scratch for a metallurgical company: identity, website and social media.'),
        'tags': ['Brand design', 'Logo', 'WordPress', 'Illustrator', 'Photoshop', 'Social media'],
        'hero': {'img': 'img/cases/unicos-metaltec.webp', 'alt': 'Logo de MetalTec Colombia', 'light': True},
        'facts': [
            (('Cliente', 'Client'), ('Empresa metalúrgica (B2B)', 'Metallurgical company (B2B)')),
            (('Duración', 'Duration'), ('3 a 4 meses', '3 to 4 months')),
            (('Rol', 'Role'), ('Líder de proyecto y directora creativa', 'Project lead and creative director')),
            (('Herramientas', 'Tools'), ('Illustrator · Photoshop · WordPress', 'Illustrator · Photoshop · WordPress')),
        ],
        'summary': ('MetalTec Colombia diseña, fabrica y mantiene maquinaria de trituración. Creé su marca desde cero: logo e isotipo, brochure y flyers, sitio web corporativo en WordPress y presencia en redes sociales. Un proyecto integral, de la idea a la implementación en todas las plataformas.',
                    'MetalTec Colombia designs, builds and maintains crushing machinery. I created their brand from scratch: logo and isotype, brochure and flyers, a corporate WordPress website and social media presence. An end-to-end project, from idea to implementation on every platform.'),
        'concept': {
            'title': ('Una "M" hecha de vigas', 'An "M" made of beams'),
            'quote': ('Solidez, innovación y precisión técnica.', 'Solidity, innovation and technical precision.'),
            'paras': [
                ('El isotipo es una "M" estilizada que alude a las vigas y estructuras metálicas, en perspectiva isométrica para comunicar tridimensionalidad, solidez y precisión.',
                 'The isotype is a stylized "M" that evokes beams and metal structures, in isometric perspective to convey three-dimensionality, solidity and precision.'),
                ('El naranja transmite energía e innovación; el gris aporta solidez y confiabilidad. Juntos equilibran la tecnología con la experiencia industrial.',
                 'Orange conveys energy and innovation; gray brings solidity and reliability. Together they balance technology with industrial experience.')]},
        'gallery': [
            ('img/cases/unicos-metaltec.webp', ('Logo principal', 'Main logo')),
            ('img/cases/unicos-iso-metaltec.webp', ('Isotipo', 'Isotype')),
            ('img/cases/unicos-brochure-metaltec.webp', ('Brochure corporativo', 'Corporate brochure')),
            ('img/cases/unicos-flyer-metaltec.webp', ('Flyer promocional', 'Promotional flyer')),
        ],
        'palette': [('Naranja', 'Orange', '#FF5722'), ('Gris MetalTec', 'MetalTec gray', '#4A5F6D')],
        'blocks': [
            {'title': ('Identidad visual', 'Visual identity'), 'items': [
                ('Logo con tipografía corporativa', 'Logo with corporate typography'),
                ('Isotipo "M" en perspectiva isométrica', 'Isometric "M" isotype'),
                ('Versiones a color, blanco y negro', 'Color, black and white versions'),
                ('Manual de identidad visual', 'Visual identity manual')]},
            {'title': ('Desarrollo web', 'Web development'), 'items': [
                ('Sitio corporativo en WordPress', 'Corporate WordPress website'),
                ('Diseño responsive', 'Responsive design'),
                ('Inicio, servicios, nosotros, proyectos y contacto', 'Home, services, about, projects and contact'),
                ('Formulario de contacto y SEO básico', 'Contact form and basic SEO')]},
            {'title': ('Impresos y redes', 'Print and social'), 'items': [
                ('Brochure plegable de servicios', 'Folded services brochure'),
                ('Flyers con fotografía industrial', 'Flyers with industrial photography'),
                ('Perfiles de Facebook e Instagram', 'Facebook and Instagram profiles'),
                ('Plantillas y kit gráfico para publicaciones', 'Templates and graphics kit for posts')]},
        ],
        'process': [
            (('Investigación', 'Research'), ('Sector metalúrgico, competencia y público B2B.', 'Metallurgical sector, competitors and B2B audience.')),
            (('Concepto visual', 'Visual concept'), ('Bocetos del isotipo y paleta.', 'Isotype sketches and palette.')),
            (('Diseño y desarrollo', 'Design and build'), ('Manual, impresos, web y redes.', 'Manual, print, web and social.')),
            (('Implementación', 'Launch'), ('Producción, lanzamiento y capacitación.', 'Production, launch and training.')),
        ],
        'results': [
            ('Imagen corporativa sólida que genera confianza en el sector B2B', 'A solid corporate image that builds trust in the B2B sector'),
            ('Presencia digital completa: web y redes activas', 'Complete digital presence: website and active social media'),
            ('Material comercial para presentaciones y ferias', 'Sales material for presentations and trade shows'),
            ('Posicionamiento moderno en un sector tradicional', 'Modern positioning in a traditional sector'),
        ],
        'cta': (('¿Necesitas crear la identidad de tu marca?', 'Need to create your brand identity?'),
                ('Desarrollo tu branding completo: logo, web y presencia digital.', 'I build your complete branding: logo, website and digital presence.')),
        'service': 'branding',
    },
    {
        'id': 'unicos', 'file': 'unicos.html', 'name': 'Únicos', 'pillar': 'design',
        'theme': {'brand': '#e0505d', 'brand_rgb': '224, 80, 93', 'brand2': '#c9a49f', 'brand2_rgb': '201, 164, 159',
                  'bg': '#130d0d', 'display': "'Poppins', sans-serif", 'body': "'Exo 2', sans-serif",
                  'fonts': 'Poppins:wght@600;700;800', 'motif': 'splash', 'bullet': '●'},
        'kicker': ('DISEÑO · MARKETING · WEB', 'DESIGN · MARKETING · WEB'),
        'title': ('Únicos', 'Únicos'),
        'tagline': ('La agencia creativa que cofundé: marketing, diseño gráfico y desarrollo web que rompe moldes.',
                    'The creative agency I co-founded: marketing, graphic design and web development that breaks the mold.'),
        'tags': ['Branding', 'Diseño gráfico', 'Marketing digital', 'Desarrollo web', 'Publicidad'],
        'hero': {'img': 'img/cases/unicos-logo-unicos.webp', 'alt': 'Logo de Únicos MKT Agencia Creativa', 'light': True},
        'facts': [
            (('Tipo', 'Type'), ('Agencia propia (cofundadora)', 'Own agency (co-founder)')),
            (('Periodo', 'Period'), ('2019 – 2021 · Bogotá', '2019 – 2021 · Bogotá')),
            (('Rol', 'Role'), ('Cofundadora y diseñadora principal', 'Co-founder and lead designer')),
            (('Herramientas', 'Tools'), ('Illustrator · Photoshop · InDesign', 'Illustrator · Photoshop · InDesign')),
        ],
        'summary': ('Únicos MKT fue la agencia creativa que cofundé en Bogotá. Creé su identidad de marca y lideré proyectos para clientes muy distintos: logos, material publicitario, pendones, estampados, diseño digital y sitios web para empresas B2B, B2C y emprendimientos.',
                    "Únicos MKT was the creative agency I co-founded in Bogotá. I created its brand identity and led projects for very different clients: logos, advertising material, banners, custom prints, digital design and websites for B2B, B2C companies and startups."),
        'concept': {
            'title': ('Rompiendo los moldes', 'Breaking the mold'),
            'quote': ('Creatividad sin límites, soluciones únicas para cada cliente.', 'Limitless creativity, unique solutions for every client.'),
            'paras': [
                ('El logo es una mancha roja vibrante que simboliza la creatividad en su forma más pura: la explosión de ideas y el pensamiento fuera de lo convencional.',
                 'The logo is a vibrant red splash that symbolizes creativity in its purest form: an explosion of ideas and unconventional thinking.'),
                ('La tipografía combina "únicos" con "MKT" en un café oscuro moderno, junto al descriptor "Agencia creativa".',
                 'The typography pairs "únicos" with "MKT" in a modern dark brown, alongside the "Creative agency" descriptor.')]},
        'gallery': [
            ('img/cases/unicos-logo-unicos.webp', ('Identidad de Únicos', 'Únicos identity')),
            ('img/cases/unicos-metaltec.webp', ('MetalTec · identidad corporativa', 'MetalTec · corporate identity')),
            ('img/cases/unicos-volantes-unicos.webp', ('Volante promocional · 40% de descuento', 'Promotional flyer · 40% off')),
            ('img/cases/unicos-optica-unicos.webp', ('Óptica Vision Center · volante estilo cómic', 'Vision Center Optical · comic-style flyer')),
        ],
        'palette': [('Rojo suave', 'Soft red', '#D4424F'), ('Café suave', 'Soft brown', '#5A4240'), ('Blanco', 'White', '#FFFFFF')],
        'blocks': [
            {'title': ('Servicios de la agencia', 'Agency services'), 'items': [
                ('Identidad corporativa y manuales de marca', 'Corporate identity and brand manuals'),
                ('Volantes, pendones, catálogos y brochures', 'Flyers, banners, catalogs and brochures'),
                ('Plantillas para redes, banners y newsletters', 'Social templates, banners and newsletters'),
                ('Estampados para camisetas, bolsos y merchandising', 'Prints for t-shirts, bags and merchandise'),
                ('Sitios web, landing pages y tiendas', 'Websites, landing pages and stores'),
                ('Estrategia de contenido y campañas', 'Content strategy and campaigns')]},
            {'title': ('Casos destacados', 'Featured cases'), 'items': [
                ('Óptica Vision Center: un superhéroe de cómic para la "súper visión"', 'Vision Center Optical: a comic superhero for "super vision"'),
                ('Volante morado y dorado con precios antes/después', 'Purple and gold flyer with before/after prices'),
                ('MetalTec: branding integral para el sector industrial', 'MetalTec: complete branding for the industrial sector')]},
            {'title': ('Clientes atendidos', 'Clients served'), 'items': [
                ('Empresas B2B: branding e identidad', 'B2B companies: branding and identity'),
                ('Negocios B2C: publicidad y marketing digital', 'B2C businesses: advertising and digital marketing'),
                ('Emprendimientos: marcas desde cero', 'Startups: brands from scratch'),
                ('Empresas establecidas: renovación de imagen', 'Established companies: image refresh')]},
        ],
        'results': [
            ('Identidad sólida y diferenciada para la agencia', 'A solid, differentiated identity for the agency'),
            ('Portafolio diverso para múltiples sectores', 'A diverse portfolio across multiple sectors'),
            ('+20% de interacción con clientes gracias a las campañas', '+20% client interaction thanks to the campaigns'),
            ('Experiencia completa gestionando una agencia creativa', 'Complete experience running a creative agency'),
        ],
        'cta': (('¿Necesitas diseño y marketing creativo?', 'Need creative design and marketing?'),
                ('Creo diseños únicos que hacen destacar a tu marca.', 'I create unique designs that make your brand stand out.')),
        'service': 'branding',
    },
]

# Pilares: etiqueta y página de proyectos filtrada
PILLAR = {'web': ('Desarrollo web', 'Web development'), 'code': ('Programación', 'Programming'), 'design': ('Diseño', 'Design'), 'ai': ('IA', 'AI'), 'marketing': ('Marketing', 'Marketing')}

# Motivos decorativos de la portada (SVG/CSS, sin imágenes externas)
MOTIF = {
    'waves': '<svg class="motif motif--waves" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">'
             + ''.join(f'<path d="M0 {200 + i * 26} C 200 {150 + i * 26}, 400 {250 + i * 26}, 600 {200 + i * 26} S 1000 {150 + i * 26}, 1200 {200 + i * 26}" style="--i:{i}"/>' for i in range(6))
             + '</svg>',
    'compass': '<svg class="motif motif--compass" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="92"/><circle cx="100" cy="100" r="74"/>'
               + ''.join(f'<line x1="100" y1="6" x2="100" y2="{18 if i % 2 else 26}" transform="rotate({i * 15} 100 100)"/>' for i in range(24))
               + '<g class="motif__needle"><path d="M100 30 L112 100 L100 170 L88 100 Z"/><path class="n" d="M100 30 L112 100 L88 100 Z"/></g><circle cx="100" cy="100" r="5"/></svg>',
    'iso': '<div class="motif motif--iso" aria-hidden="true"></div>',
    'splash': '<div class="motif motif--splash" aria-hidden="true"><i></i><i></i><i></i></div>',
    'stars': '<div class="motif motif--stars" aria-hidden="true">' + ''.join(f'<i style="--x:{(i * 37) % 100}%;--y:{(i * 53) % 100}%;--d:{(i % 7) * 0.4}s;--s:{6 + (i % 5) * 3}px"></i>' for i in range(28)) + '</div>',
    'sport': '<div class="motif motif--sport" aria-hidden="true"><i></i><i></i><i></i><i></i></div>',
    'secure': '<div class="motif motif--secure" aria-hidden="true"><svg viewBox="0 0 120 140"><path d="M60 6 L110 26 V66 C110 100 88 122 60 134 C32 122 10 100 10 66 V26 Z"/><rect x="38" y="62" width="44" height="34" rx="5"/><path d="M46 62 V50 a14 14 0 0 1 28 0 V62"/><circle cx="60" cy="78" r="4"/></svg>'
              + ''.join(f'<span style="--i:{i}">{h}</span>' for i, h in enumerate(['$2y$10$Qe7…', 'SELECT ? FROM', 'csrf_token', 'password_hash()', 'HTTPS ✓', 'session_regenerate_id()']))
              + '</div>',
}


def page(p, prev, nxt):
    t = p['theme']
    lang_title = f"{p['name']} · Sahar Chain"
    fonts = f"https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Orbitron:wght@500;700;800&family={t['fonts']}&display=swap"
    style = (f"--brand:{t['brand']};--brand-rgb:{t['brand_rgb']};--brand2:{t['brand2']};--brand2-rgb:{t['brand2_rgb']};"
             f"--case-bg:{t['bg']};--case-display:{t['display']};--case-body:{t['body']};--fx-a:{t['brand']};--fx-b:{t['brand2']};--bullet:'{t['bullet']}'")
    pill_es, pill_en = PILLAR[p['pillar']]

    # portada
    h = p['hero']
    if 'video' in h:
        media = f'<video src="{h["video"]}" poster="{h["poster"]}" autoplay muted loop playsinline aria-label="Demo de {e(p["name"])}"></video>'
    else:
        light = ' class="is-light"' if h.get('light') else ''
        media = f'<img src="{h["img"]}" alt="{e(h["alt"])}"{light}>'
    tags = ''.join(f'<li>{e(x)}</li>' for x in p['tags'])
    facts = ''.join(f'<div class="case-fact">{bi("dt", "", k)}{bi("dd", "", v)}</div>' for k, v in p['facts'])

    out = []
    out.append(f'''
        <section class="case-hero">
            {MOTIF[t['motif']]}
            <div class="case-hero__copy">
                <a class="case-back" href="proyectos.html?area={p['pillar']}" data-es="← Proyectos de {e(pill_es.lower())}" data-en="← {e(pill_en)} projects">← Proyectos de {e(pill_es.lower())}</a>
                {bi('p', 'case-kicker', p['kicker'])}
                <h1 class="case-title">{e(p['title'][0])}</h1>
                {bi('p', 'case-tagline', p['tagline'])}
                <ul class="case-tags">{tags}</ul>
            </div>
            <figure class="case-hero__media">{media}</figure>
        </section>
        <dl class="case-facts">{facts}</dl>

        <section class="case-section case-summary">
            {bi('p', 'case-overline', ('// RESUMEN', '// OVERVIEW'))}
            {bi('p', 'case-summary__text', p['summary'])}
        </section>''')

    if p.get('concept'):
        c = p['concept']
        paras = ''.join(bi('p', 'case-concept__text', x) for x in c['paras'])
        out.append(f'''
        <section class="case-section case-concept">
            {bi('p', 'case-overline', ('// CONCEPTO', '// CONCEPT'))}
            {bi('h2', 'case-h2', c['title'])}
            <blockquote class="case-quote">{bi('span', '', c['quote'])}</blockquote>
            <div class="case-concept__cols">{paras}</div>
        </section>''')

    items = ''.join(f'<li><button type="button" class="case-shot" data-full="{src}"><img src="{src}" alt="{e(cap[0])}" loading="lazy">{bi("span", "case-shot__cap", cap)}</button></li>' for src, cap in p['gallery'])
    out.append(f'''
        <section class="case-section">
            {bi('p', 'case-overline', ('// GALERÍA', '// GALLERY'))}
            {bi('h2', 'case-h2', ('El proyecto en imágenes', 'The project in pictures'))}
            <ul class="case-gallery case-gallery--{min(len(p['gallery']), 4)}">{items}</ul>
        </section>''')

    if p.get('palette') or p.get('type'):
        sw = ''.join(f'<li><button type="button" class="swatch" data-hex="{hx}" style="--sw:{hx}"><span class="swatch__chip"></span><span class="swatch__name" data-es="{e(es)}" data-en="{e(en)}">{e(es)}</span><span class="swatch__hex">{hx}</span></button></li>' for es, en, hx in p.get('palette', []))
        ty = ''.join(f'<div class="type-card"><p class="type-card__sample" style="font-family:{ff}">{e(sample)}</p><p class="type-card__name">{e(name)}</p>{bi("p", "type-card__desc", d)}</div>' for name, ff, sample, d in p.get('type', []))
        out.append(f'''
        <section class="case-section case-brand">
            {bi('p', 'case-overline', ('// SISTEMA VISUAL', '// VISUAL SYSTEM'))}
            {bi('h2', 'case-h2', ('Color y tipografía', 'Color and typography'))}
            {('<ul class="case-palette">' + sw + '</ul>' + bi('p', 'case-hint', ('Toca un color para copiar su código.', 'Tap a color to copy its code.'))) if sw else ''}
            {('<div class="case-type">' + ty + '</div>') if ty else ''}
        </section>''')

    blocks = ''.join(f'<article class="case-block">{bi("h3", "case-block__title", b["title"])}<ul class="case-list">{"".join(bi("li", "", x) for x in b["items"])}</ul></article>' for b in p['blocks'])
    out.append(f'''
        <section class="case-section">
            {bi('p', 'case-overline', ('// DETALLES', '// DETAILS'))}
            {bi('h2', 'case-h2', ('Qué se construyó', 'What was built'))}
            <div class="case-blocks">{blocks}</div>
        </section>''')

    if p.get('challenges'):
        ch = ''.join(f'<article class="case-challenge">{bi("h3", "case-challenge__title", a)}{bi("p", "case-challenge__text", b)}</article>' for a, b in p['challenges'])
        out.append(f'''
        <section class="case-section">
            {bi('p', 'case-overline', ('// RETOS', '// CHALLENGES'))}
            {bi('h2', 'case-h2', ('Retos y soluciones', 'Challenges and solutions'))}
            <div class="case-challenges">{ch}</div>
        </section>''')

    if p.get('process'):
        st = ''.join(f'<li class="case-step"><span class="case-step__num">0{i + 1}</span>{bi("h3", "case-step__title", a)}{bi("p", "case-step__text", b)}</li>' for i, (a, b) in enumerate(p['process']))
        out.append(f'''
        <section class="case-section">
            {bi('p', 'case-overline', ('// PROCESO', '// PROCESS'))}
            {bi('h2', 'case-h2', ('Cómo lo hice', 'How I did it'))}
            <ol class="case-steps">{st}</ol>
        </section>''')

    res = ''.join(bi('li', '', x) for x in p['results'])
    out.append(f'''
        <section class="case-section case-results">
            {bi('p', 'case-overline', ('// RESULTADOS', '// RESULTS'))}
            {bi('h2', 'case-h2', ('Resultados e impacto', 'Results and impact'))}
            <ul class="case-results__list">{res}</ul>
        </section>

        <section class="case-cta">
            {bi('p', 'case-cta__title', p['cta'][0])}
            {bi('p', 'case-cta__lead', p['cta'][1])}
            <div class="case-cta__actions">
                <a class="case-btn case-btn--primary" href="contacto.html?servicio={p['service']}" data-es="Pedir cotización" data-en="Request a quote">Pedir cotización</a>
                <a class="case-btn" href="servicios.html#{p['service']}" data-es="Ver el servicio" data-en="See the service">Ver el servicio</a>
            </div>
        </section>

        <nav class="case-nav" aria-label="Más proyectos">
            <a class="case-nav__link" href="{prev['file']}"><span data-es="← Anterior" data-en="← Previous">← Anterior</span><b>{e(prev['name'])}</b></a>
            <a class="case-nav__all" href="proyectos.html" data-es="Todos los proyectos" data-en="All projects">Todos los proyectos</a>
            <a class="case-nav__link case-nav__link--next" href="{nxt['file']}"><span data-es="Siguiente →" data-en="Next →">Siguiente →</span><b>{e(nxt['name'])}</b></a>
        </nav>''')

    desc = e(p['tagline'][0])
    return f'''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{e(lang_title)}</title>
    <meta name="description" content="{desc}">
    <meta name="theme-color" content="{t['bg']}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="{fonts}" rel="stylesheet">
    <link rel="stylesheet" href="css/aura.css?v={V}">
    <link rel="stylesheet" href="css/site.css?v={V}">
    <link rel="stylesheet" href="css/case.css?v={V}">
</head>
<!-- Página generada con tools/cases.py: edita los datos allí y vuelve a ejecutarlo -->
<body data-page="case" data-project="{p['id']}" class="case case--{t['motif']}" style="{style}">
    <header class="site-header">
        <div class="aura-topbar" data-site-header></div>
    </header>

    <main class="page case-page">{''.join(out)}
    </main>

    <div class="case-lightbox" id="caseLightbox" hidden>
        <button type="button" class="case-lightbox__close" data-es-label="Cerrar" data-en-label="Close" aria-label="Cerrar">×</button>
        <button type="button" class="case-lightbox__nav case-lightbox__nav--prev" aria-label="Anterior">‹</button>
        <figure><img alt=""><figcaption></figcaption></figure>
        <button type="button" class="case-lightbox__nav case-lightbox__nav--next" aria-label="Siguiente">›</button>
    </div>

    <footer class="site-footer" data-site-footer></footer>

    <script src="js/aura/knowledge.js?v={V}"></script>
    <script src="js/bg.js?v={V}"></script>
    <script src="js/site.js?v={V}"></script>
    <script src="js/aura/assistant.js?v={V}"></script>
    <script src="js/case.js?v={V}"></script>
</body>
</html>
'''


if __name__ == '__main__':
    n = len(PROJECTS)
    for i, p in enumerate(PROJECTS):
        html_out = page(p, PROJECTS[(i - 1) % n], PROJECTS[(i + 1) % n])
        with open(os.path.join(ROOT, p['file']), 'w', encoding='utf-8') as f:
            f.write(html_out)
        print('✓', p['file'])
