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
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V = '20261026a'  # versión de los archivos CSS/JS (evita caché vieja)


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
CODE_AGRO = '''class IrrigationController {
    constructor(
        private sensor: Sensor,
        private weatherForecast: WeatherForecast,
        private irrigationSystem: IrrigationSystem
    ) {}

    decideIrrigation(sensorData: number): void {
        if (this.weatherForecast.checkWeatherForecast()) {
            console.log("Weather conditions are suitable for irrigation.");
            this.startIrrigation();
        } else {
            console.log("Irrigation not needed based on weather forecast.");
        }
    }
}'''
CODE_BOOK = '''borrowBook(customerId: number, bookId: number): string {
    const customer = this.findCustomerById(customerId);
    const book = this.findBookById(bookId);

    if (customer && book && book.available) {
      customer.borrowBook(bookId);
      book.toggleAvailability();
      return `${customer.name} successfully borrowed "${book.title}".`;
    }
    return `Borrowing failed.`;
}'''
CODE_SPACE = '''export class BookingService {
    private bookings: Booking[] = [];

    createBooking(customer: Customer, flight: Flight): Booking {
        if (flight.capacity <= 0) {
            throw new Error("No seats available on this flight.");
        }
        const newBooking = new Booking(
            this.bookings.length + 1, customer, flight, "pending"
        );
        flight.capacity--;
        this.bookings.push(newBooking);
        return newBooking;
    }
}'''

PROJECTS = [
    {
        'id': 'sell-services', 'file': 'sell-services.html', 'name': 'Sell Services', 'pillar': 'web',
        'theme': {'brand': '#3ccfcf', 'brand_rgb': '60, 207, 207', 'brand2': '#7b61ff', 'brand2_rgb': '123, 97, 255',
                  'bg': '#050c10', 'display': "'Space Grotesk', sans-serif", 'body': "'Exo 2', sans-serif",
                  'fonts': 'Space+Grotesk:wght@500;700', 'motif': 'secure', 'bullet': '🔒'},
        'kicker': ('DESARROLLO WEB · E-COMMERCE', 'WEB DEVELOPMENT · E-COMMERCE'),
        'title': ('Sell Services and Graphic Products', 'Sell Services and Graphic Products'),
        'tagline': ('Tienda en línea para vender servicios y productos gráficos personalizados, con registro de usuarios, catálogo y carrito.',
                    'Online store to sell custom graphic services and products, with user accounts, catalog and cart.'),
        'tags': ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'HTML5', 'CSS3', 'XAMPP'],
        'hero': {'video': 'services.mp4', 'poster': 'img/cases/img-services.webp'},
        'links': [(('Ver código en GitHub', 'See code on GitHub'), 'https://github.com/SaharLambton/sell-services')],
        'facts': [
            (('Tipo', 'Type'), ('Proyecto académico · Lambton College', 'Academic project · Lambton College')),
            (('Año', 'Year'), ('2023 · actualizado en 2026', '2023 · updated in 2026')),
            (('Rol', 'Role'), ('Desarrolladora full stack', 'Full stack developer')),
            (('Stack', 'Stack'), ('PHP · MySQL · JavaScript · jQuery', 'PHP · MySQL · JavaScript · jQuery')),
        ],
        'summary': ('Una tienda en línea para vender servicios y productos gráficos personalizados, como camisetas, cuadernos y termos. El visitante se registra, inicia sesión con su correo o su apodo, explora el catálogo, agrega productos al carrito y puede editar su perfil. Los usuarios se guardan en una base de datos MySQL conectada con PHP, que corre en local con XAMPP.',
                    'An online store to sell custom graphic services and products, such as t-shirts, notebooks and tumblers. Visitors sign up, log in with their email or nickname, browse the catalog, add products to the cart and can edit their profile. Users are stored in a MySQL database connected with PHP, running locally with XAMPP.'),
        'gallery': [
            ('img/cases/img-services.webp', ('Página principal', 'Home page')),
            ('img/cases/img-services-login-y-registro.webp', ('Login y registro', 'Login and sign-up')),
            ('img/cases/img-services-login.webp', ('Inicio de sesión', 'Sign in')),
            ('img/cases/img-services-register.webp', ('Registro de usuarios', 'User registration')),
        ],
        'blocks': [
            {'title': ('Funcionalidades', 'Features'), 'items': [
                ('Registro e inicio de sesión con correo o apodo', 'Sign-up and login with email or nickname'),
                ('Oferta emergente con cuenta regresiva en la página de inicio', 'Pop-up offer with a countdown on the home page'),
                ('Catálogo filtrable con buscador: servicios, productos, camisetas y cuadernos', 'Filterable catalog with search: services, products, shirts and notebooks'),
                ('Carrito con contador y total en tiempo real', 'Cart with live count and total'),
                ('Perfil de usuario editable, guardado en la base de datos', 'Editable user profile, saved to the database')]},
            {'title': ('Backend y base de datos', 'Backend and database'), 'items': [
                ('PHP conectado a MySQL (MariaDB) en XAMPP', 'PHP connected to MySQL (MariaDB) on XAMPP'),
                ('Tabla de usuarios con correo y apodo únicos', 'Users table with unique email and nickname'),
                ('Validación en el navegador con jQuery y en el servidor con PHP', 'Validation in the browser with jQuery and on the server with PHP'),
                ('Tienda y perfil protegidos: solo con sesión iniciada', 'Store and profile protected: logged-in users only')]},
            {'title': ('Actualización de seguridad (2026)', 'Security update (2026)'), 'items': [
                ('Contraseñas cifradas con password_hash', 'Passwords hashed with password_hash'),
                ('Sentencias preparadas contra la inyección SQL', 'Prepared statements against SQL injection'),
                ('Salidas escapadas contra XSS y regeneración de la sesión', 'Escaped output against XSS and session regeneration'),
                ('Probado de punta a punta: registro, login, carrito, perfil y cierre de sesión', 'Tested end to end: sign-up, login, cart, profile and logout')]},
        ],
        'challenges': [
            (('Que la tienda recuerde quién eres', 'Making the store remember you'),
             ('Usé sesiones de PHP: al iniciar sesión se guardan los datos del usuario, y así su nombre y su perfil lo acompañan de la tienda a la configuración.',
              'I used PHP sessions: on login the user data is stored, so their name and profile follow them from the store to the settings page.')),
            (('Revisar mi propio código', 'Reviewing my own code'),
             ('Al publicarlo revisé el proyecto de 2023: las contraseñas estaban en texto plano y las consultas se armaban a mano. Las cambié por password_hash y sentencias preparadas, y probé que un intento de inyección SQL ya no entra.',
              'When publishing it I reviewed the 2023 project: passwords were stored in plain text and queries were built by hand. I switched to password_hash and prepared statements, and tested that an SQL injection attempt no longer gets in.')),
            (('Editar solo lo que cambia', 'Editing only what changes'),
             ('El formulario de perfil arma la actualización únicamente con los campos que el usuario llenó, para no borrar el resto de sus datos.',
              'The profile form builds the update only from the fields the user filled in, so the rest of their data is not erased.')),
        ],
        'results': [
            ('Flujo completo: registro, login, catálogo, carrito y perfil', 'Complete flow: sign-up, login, catalog, cart and profile'),
            ('Base de datos MySQL conectada con PHP', 'MySQL database connected with PHP'),
            ('Código publicado en GitHub con instrucciones para XAMPP y un usuario de prueba', 'Code published on GitHub with XAMPP instructions and a demo user'),
            ('Siguiente paso: catálogo y pedidos en la base de datos y una pasarela de pagos real', 'Next step: catalog and orders in the database and a real payment gateway'),
        ],
        'cta': (('¿Necesitas una tienda en línea?', 'Need an online store?'),
                ('Desarrollo tiendas a la medida de tu negocio, listas para vender.', 'I build stores tailored to your business, ready to sell.')),
        'service': 'store',
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
        'service': 'store',
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
        'tagline': ('Identidad de marca integral para una firma de joyería de lujo: de la estrategia al sistema visual completo.',
                    'End-to-end brand identity for a luxury jewelry house: from strategy to a complete visual system.'),
        'tags': ['Estrategia de marca', 'Identidad visual', 'Guía de marca', 'Packaging', 'Estrategia digital'],
        'hero': {'img': 'img/cases/zohar-zohar-fondo-oscuro.webp', 'alt': 'Logo de Zohar en plata sobre azul profundo'},
        'facts': [
            (('Cliente', 'Client'), ('Cliente real · joyería de lujo', 'Real client · luxury jewelry')),
            (('Duración', 'Duration'), ('6 semanas', '6 weeks')),
            (('Rol', 'Role'), ('Estratega y diseñadora de marca', 'Brand strategist and designer')),
            (('Herramientas', 'Tools'), ('Illustrator · Photoshop', 'Illustrator · Photoshop')),
        ],
        'summary': ('Zohar es una marca de joyería que busca trascender lo convencional con piezas exclusivas y personalizadas. El encargo consistió en construir su identidad desde la estrategia: definir su filosofía, su misión y su visión, identificar a quién se dirige y cómo debe comunicarse, para luego traducir esas decisiones en un sistema visual coherente. El resultado es una guía de marca que reúne el logotipo y sus versiones, la paleta, la tipografía, las aplicaciones y los lineamientos para el entorno digital.',
                    'Zohar is a jewelry brand that seeks to go beyond the conventional with exclusive, personalized pieces. The brief was to build its identity from strategy: define its philosophy, mission and vision, identify who it speaks to and how it should communicate, and then translate those decisions into a coherent visual system. The result is a brand guide covering the logo and its versions, palette, typography, applications and guidelines for the digital space.'),
        'concept': {
            'title': ('"Zohar" significa esplendor', '"Zohar" means splendor'),
            'quote': ('Conectamos emociones, creamos relaciones. Tu lujo, tu historia. Descubre la autenticidad en cada joya.', 'We connect emotions, we build relationships. Your luxury, your story. Discover the authenticity in every jewel.'),
            'paras': [
                ('El logotipo expresa la idea de esplendor a través de un diseño minimalista y elegante. Sobre un azul profundo, que evoca el océano en calma, unas olas suaves aportan movimiento y fluidez.',
                 'The logo expresses the idea of splendor through a minimalist, elegant design. On a deep blue that evokes a calm ocean, soft waves bring movement and fluidity.'),
                ('El nombre resplandece en plata, con letras de base cuadrada y curvas sutiles que equilibran la sofisticación geométrica con la naturaleza fluida del agua. La versión oscura, en tonos azules degradados, amplía los usos de la marca sin perder esa conexión con el mar.',
                 'The name shines in silver, with square-based letters and subtle curves that balance geometric sophistication with the fluid nature of water. The dark version, in graded blues, widens the brand\'s uses without losing that connection with the sea.')]},
        'sections': [
            {'kind': 'pair', 'over': ('// PROPÓSITO', '// PURPOSE'), 'title': ('Misión y visión', 'Mission and vision'),
             'items': [
                (('Misión', 'Mission'), ('En Zohar, nuestra misión es trascender la joyería convencional para ofrecer experiencias auténticas y exclusivas. Nos dedicamos a la creación de piezas de lujo que no solo adornan, sino que también cuentan historias, conectan emociones y fortalecen relaciones. Con un compromiso inquebrantable con la artesanía excepcional, buscamos ser la elección predilecta de quienes buscan el esplendor en cada detalle.',
                                         'At Zohar, our mission is to go beyond conventional jewelry to offer authentic, exclusive experiences. We create luxury pieces that do more than adorn: they tell stories, connect emotions and strengthen relationships. With an unwavering commitment to exceptional craftsmanship, we aim to be the first choice for those who seek splendor in every detail.')),
                (('Visión', 'Vision'), ('Nuestra visión es convertirnos en un referente mundial de la joyería de lujo que va más allá de la estética y brinda una experiencia de vida. Aspiramos a ser reconocidos no solo por la calidad y exclusividad de nuestras piezas, sino también por la conexión genuina que creamos con cada cliente. Imaginamos un mundo donde cada joya Zohar sea un símbolo de autenticidad, elegancia y un recordatorio constante del esplendor que todos llevamos dentro.',
                                        'Our vision is to become a global benchmark in luxury jewelry that goes beyond aesthetics and offers a life experience. We aspire to be recognized not only for the quality and exclusivity of our pieces, but also for the genuine connection we create with every client. We imagine a world where every Zohar jewel is a symbol of authenticity, elegance and a constant reminder of the splendor we all carry within.')),
             ]},
            {'kind': 'cards', 'over': ('// PÚBLICO OBJETIVO', '// TARGET AUDIENCE'), 'title': ('A quién se dirige la marca', 'Who the brand speaks to'),
             'intro': ('Un público diverso en edad y género que comparte el aprecio por la autenticidad, la exclusividad y la elegancia, y que busca en la joyería algo más que un accesorio: una experiencia con significado.',
                       'An audience diverse in age and gender that shares an appreciation for authenticity, exclusivity and elegance, and looks for more than an accessory in jewelry: a meaningful experience.'),
             'items': [
                (('Jóvenes profesionales en ascenso', 'Young rising professionals'), ('Personas exitosas que se inician en el mundo de las piezas de alto valor y personalizadas, y buscan expresar sus logros de manera única.', 'Successful people entering the world of high-value, personalized pieces, looking to express their achievements in a unique way.')),
                (('Amantes de la moda y el estilo', 'Fashion and style lovers'), ('Personas con un gusto refinado que buscan joyas capaces de complementar y realzar su estilo personal.', 'People with refined taste looking for jewelry that complements and enhances their personal style.')),
                (('Clientes experimentados de joyería de lujo', 'Experienced luxury jewelry clients'), ('Quienes ya conocen la experiencia del lujo y eligen marcas que ofrezcan autenticidad y una conexión emocional más allá del producto.', 'Those who already know the luxury experience and choose brands that offer authenticity and an emotional connection beyond the product.')),
                (('Regaladores conscientes', 'Thoughtful gift-givers'), ('Personas que buscan regalos significativos y personalizados para ocasiones especiales, y valoran la exclusividad y la calidad de cada pieza.', 'People looking for meaningful, personalized gifts for special occasions, who value the exclusivity and quality of each piece.')),
                (('Seguidores de tendencias', 'Trend followers'), ('Personas atentas a las últimas tendencias en joyería que desean piezas a la vanguardia del estilo.', 'People who follow the latest jewelry trends and want pieces at the forefront of style.')),
             ]},
            {'kind': 'cards', 'over': ('// ESTRATEGIA DIGITAL', '// DIGITAL STRATEGY'), 'title': ('Cómo se comunica la marca', 'How the brand communicates'),
             'intro': ('La estrategia busca generar reconocimiento, compromiso y conversión, y posicionar a Zohar como una marca líder en joyería de lujo a través de una comunidad auténtica.',
                       'The strategy aims to build awareness, engagement and conversion, positioning Zohar as a leading luxury jewelry brand through an authentic community.'),
             'items': [
                (('Presencia online', 'Online presence'), ('Un sitio web elegante y fácil de navegar, con secciones que cuentan la historia de cada joya y destacan la artesanía y la exclusividad.', 'An elegant, easy-to-navigate website with sections that tell the story of each piece and highlight craftsmanship and exclusivity.')),
                (('Redes sociales', 'Social media'), ('Instagram, Pinterest y Facebook como vitrinas visuales: publicaciones que capturan la esencia de la marca e imágenes de clientes reales compartiendo su experiencia.', 'Instagram, Pinterest and Facebook as visual showcases: posts that capture the brand\'s essence and images of real clients sharing their experience.')),
                (('Marketing de contenidos', 'Content marketing'), ('Historias sobre el proceso de creación, la artesanía detrás de cada pieza y momentos detrás de cámaras que construyen una conexión emocional con la audiencia.', 'Stories about the creative process, the craftsmanship behind each piece and behind-the-scenes moments that build an emotional connection with the audience.')),
                (('Publicidad y participación', 'Advertising and engagement'), ('Anuncios segmentados para públicos interesados en joyería, moda y estilo de vida exclusivo, junto con encuestas, desafíos y concursos que impulsan la participación.', 'Targeted ads for audiences interested in jewelry, fashion and exclusive lifestyles, along with polls, challenges and contests that drive engagement.')),
                (('Empaque y presentación', 'Packaging and presentation'), ('Envolturas que reflejan la calidad y exclusividad de las joyas y convierten la entrega en una experiencia memorable.', 'Packaging that reflects the quality and exclusivity of the jewelry and turns delivery into a memorable experience.')),
                (('Medición y mejora continua', 'Measurement and continuous improvement'), ('Seguimiento de ventas, interacción en redes, alcance y satisfacción del cliente para ajustar la estrategia según la respuesta del mercado.', 'Tracking sales, social engagement, reach and customer satisfaction to adjust the strategy to the market\'s response.')),
             ]},
        ],
        'gallery': [
            ('img/cases/zohar-guia-portada.webp', ('Guía de marca · portada', 'Brand guide · cover')),
            ('img/cases/zohar-recurso-11.webp', ('Logo principal', 'Main logo')),
            ('img/cases/zohar-guia-identidad.webp', ('Guía · identidad visual y mensaje', 'Guide · visual identity and message')),
            ('img/cases/zohar-guia-color.webp', ('Guía · paleta de colores', 'Guide · color palette')),
            ('img/cases/zohar-guia-tipografia.webp', ('Guía · tipografía', 'Guide · typography')),
            ('img/cases/zohar-guia-mision.webp', ('Guía · misión y visión', 'Guide · mission and vision')),
            ('img/cases/zohar-guia-publico.webp', ('Guía · público objetivo', 'Guide · target audience')),
            ('img/cases/zohar-guia-estrategia.webp', ('Guía · estrategia digital', 'Guide · digital strategy')),
            ('img/cases/zohar-logo-oscuro.webp', ('Logo alternativo', 'Alternate logo')),
            ('img/cases/zohar-recurso-5.webp', ('Packaging de lujo', 'Luxury packaging')),
            ('img/cases/zohar-recurso-9.webp', ('Tarjetas de presentación', 'Business cards')),
            ('img/cases/zohar-recurso-10.webp', ('Shopping bags', 'Shopping bags')),
            ('img/cases/zohar-recurso-4.webp', ('Señalética de tienda', 'Store signage')),
            ('img/cases/zohar-recurso-7.webp', ('Señalética de tienda', 'Store signage')),
            ('img/cases/zohar-recurso-8.webp', ('Etiquetas de lujo', 'Luxury tags')),
        ],
        'palette': [('Azul oscuro', 'Dark blue', '#0A0D1B'), ('Azul', 'Blue', '#171A32'), ('Gris oscuro', 'Dark gray', '#3C3C3B'), ('Gris claro', 'Light gray', '#6D6D6C')],
        'type': [('Cinzel Medium', "'Cinzel', serif", 'ZOHAR', ('Logo y títulos: elegante, de inspiración clásica.', 'Logo and headings: elegant, classically inspired.')),
                 ('Montserrat Regular', "'Montserrat', sans-serif", 'Zohar Jewelry', ('Tipografía secundaria: moderna y legible para los textos.', 'Secondary typeface: modern and legible for body text.'))],
        'blocks': [
            {'title': ('Sistema visual', 'Visual system'), 'items': [
                ('Logotipo principal en plata sobre azul profundo', 'Main logo in silver on deep blue'),
                ('Versión alternativa en azul degradado para fondos claros', 'Alternate version in graded blue for light backgrounds'),
                ('Paleta de cuatro colores inspirada en el océano', 'A four-color palette inspired by the ocean'),
                ('Cinzel Medium para el logotipo y Montserrat para los textos', 'Cinzel Medium for the logo and Montserrat for body text')]},
            {'title': ('Aplicaciones de marca', 'Brand applications'), 'items': [
                ('Estuches y empaques de lujo', 'Luxury cases and packaging'),
                ('Bolsas de compra y etiquetas', 'Shopping bags and tags'),
                ('Tarjetas de presentación', 'Business cards'),
                ('Señalética para el punto de venta', 'Point-of-sale signage')]},
            {'title': ('Entregables', 'Deliverables'), 'items': [
                ('Guía de marca: identidad, aplicaciones, color, tipografía, misión, público, estrategia digital y redes', 'Brand guide: identity, applications, color, typography, mission, audience, digital strategy and social media'),
                ('Logotipo en AI, EPS, SVG y PNG', 'Logo in AI, EPS, SVG and PNG'),
                ('Paleta en HEX, RGB, CMYK y Pantone', 'Palette in HEX, RGB, CMYK and Pantone'),
                ('Mockups de empaques, papelería y señalética', 'Packaging, stationery and signage mockups'),
                ('Plantillas para redes sociales y material promocional', 'Social media templates and promotional material')]},
        ],
        'results': [
            ('Una identidad coherente que transmite lujo, elegancia y autenticidad', 'A coherent identity that conveys luxury, elegance and authenticity'),
            ('Una guía de marca que asegura el uso consistente en cada punto de contacto', 'A brand guide that ensures consistent use at every touchpoint'),
            ('Un sistema visual flexible para medios impresos y digitales', 'A flexible visual system for print and digital media'),
            ('Una propuesta diferenciada dentro del mercado de la joyería de lujo', 'A differentiated proposition in the luxury jewelry market'),
        ],
        'cta': (('¿Tu marca necesita una identidad a la altura de su producto?', 'Does your brand need an identity that matches its product?'),
                ('Diseño identidades estratégicas que comunican valor desde el primer contacto y te diferencian de tu competencia.', 'I design strategic identities that communicate value from the first touchpoint and set you apart from your competitors.')),
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
            (('Cliente', 'Client'), ('Cliente real · inmobiliaria', 'Real client · real estate')),
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
            (('Época', 'Period'), ('Durante Únicos · 2019 – 2021', 'During Únicos · 2019 – 2021')),
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
        'tagline': ('Agencia creativa de marketing, diseño y desarrollo web que cofundé para ayudar a empresas y emprendimientos a construir una marca sólida y visible.',
                    'A marketing, design and web development agency I co-founded to help companies and startups build a strong, visible brand.'),
        'tags': ['Branding', 'Diseño gráfico', 'Marketing digital', 'Desarrollo web', 'Publicidad', 'Merchandising'],
        'hero': {'img': 'img/cases/unicos-logo-unicos.webp', 'alt': 'Logo de Únicos MKT Agencia Creativa', 'light': True},
        'facts': [
            (('Tipo', 'Type'), ('Agencia propia, cofundada con un socio', 'Own agency, co-founded with a partner')),
            (('Periodo', 'Period'), ('2019 – 2021', '2019 – 2021')),
            (('Rol', 'Role'), ('Cofundadora · diseño y desarrollo web', 'Co-founder · design and web development')),
            (('Herramientas', 'Tools'), ('Illustrator · Photoshop · InDesign · WordPress', 'Illustrator · Photoshop · InDesign · WordPress')),
        ],
        'summary': ('Únicos MKT fue una agencia creativa que fundé junto a un socio entre 2019 y 2021. Nuestra propuesta era ofrecer un servicio integral —estrategia, identidad visual, publicidad, contenido digital y desarrollo web— para que cada cliente proyectara una imagen coherente y profesional en todos sus canales, sin tener que coordinar varios proveedores. Ambos participábamos en la conceptualización y el diseño de cada proyecto; yo lideraba además el área de desarrollo web y las herramientas digitales con las que gestionábamos clientes y campañas. En 2021, cada socio decidió emprender un camino profesional distinto —en mi caso, continuar mi formación en programación en Canadá—, por lo que cerramos la agencia de común acuerdo.',
                    'Únicos MKT was a creative agency I founded with a partner, active from 2019 to 2021. Our proposition was an all-in-one service—strategy, visual identity, advertising, digital content and web development—so each client could project a coherent, professional image across every channel without coordinating several providers. We both took part in conceptualizing and designing every project; I also led web development and the digital tools we used to manage clients and campaigns. In 2021 each partner chose a different professional path—in my case, continuing my programming education in Canada—so we closed the agency by mutual agreement.'),
        'concept': {
            'title': ('Rompiendo los moldes', 'Breaking the mold'),
            'quote': ('Creatividad sin límites, soluciones únicas para cada cliente.', 'Limitless creativity, unique solutions for every client.'),
            'paras': [
                ('La identidad de la agencia se construyó alrededor de una mancha roja vibrante: un símbolo de la creatividad en su forma más pura, de la explosión de ideas y del pensamiento fuera de lo convencional que queríamos llevar a cada proyecto.',
                 'The agency\'s identity was built around a vibrant red splash: a symbol of creativity in its purest form, of bursting ideas and of the unconventional thinking we wanted to bring to every project.'),
                ('La tipografía combina "únicos" con "MKT" en un café oscuro moderno, junto al descriptor "Agencia creativa", para transmitir cercanía y profesionalismo a la vez.',
                 'The typography pairs "únicos" with "MKT" in a modern dark brown, alongside the "Creative agency" descriptor, to convey approachability and professionalism at the same time.')]},
        'sections': [
            {'kind': 'cards', 'over': ('// ÁREAS DE SERVICIO', '// SERVICE AREAS'), 'title': ('Lo que ofrecía la agencia', 'What the agency offered'),
             'intro': ('Un mismo equipo acompañaba a cada cliente desde la creación de su marca hasta su presencia en medios impresos y digitales, lo que garantizaba coherencia en todos los puntos de contacto.',
                       'One team supported each client from creating their brand to their presence in print and digital media, ensuring consistency at every touchpoint.'),
             'items': [
                (('Identidad corporativa', 'Corporate identity'), ('Creación y renovación de marcas: logotipo y sus versiones, paleta de color, tipografía y manual de marca para asegurar un uso consistente en cualquier aplicación.', 'Creating and refreshing brands: logo and its versions, color palette, typography and a brand manual to ensure consistent use in any application.')),
                (('Diseño publicitario e impresos', 'Advertising and print design'), ('Volantes, pendones, catálogos, brochures y piezas promocionales pensadas para captar la atención y comunicar ofertas con claridad.', 'Flyers, banners, catalogs, brochures and promotional pieces designed to capture attention and communicate offers clearly.')),
                (('Marketing digital y contenido', 'Digital marketing and content'), ('Estrategia de contenido, plantillas para redes sociales, banners y newsletters que mantenían la identidad de cada marca en sus canales digitales.', 'Content strategy, social media templates, banners and newsletters that kept each brand\'s identity consistent across its digital channels.')),
                (('Desarrollo web', 'Web development'), ('Sitios corporativos y landing pages en WordPress y con código a medida, adaptados a celulares y alineados con la identidad visual del cliente.', 'Corporate websites and landing pages in WordPress and custom code, mobile-friendly and aligned with the client\'s visual identity.')),
                (('Merchandising y estampados', 'Merchandise and custom prints'), ('Diseño de estampados para camisetas, bolsos y artículos promocionales que llevaban la marca más allá de la pantalla.', 'Print designs for t-shirts, bags and promotional items that took the brand beyond the screen.')),
                (('Tecnología y procesos', 'Technology and processes'), ('Bases de datos para gestionar clientes y campañas, y herramientas de automatización que hicieron más eficiente la operación interna de la agencia.', 'Databases to manage clients and campaigns, and automation tools that made the agency\'s internal operations more efficient.')),
             ]},
        ],
        'mission_img': 'img/cases/unicos-optica-unicos.webp',
        # en Únicos la galería es un archivo de evidencias agrupado por marca
        'evidence': {
            'note': ('Una parte del archivo de esos años no se conservó. Estas son las piezas recuperadas, que dan cuenta del alcance y la variedad del trabajo realizado.',
                     'Part of the archive from those years was not preserved. These are the recovered pieces, which show the scope and variety of the work done.'),
            'groups': [
                (('Mayorga iStudio', 'Mayorga iStudio'), ('Identidad visual: logo, construcción, elementos, tipografía, colores, usos y portada.', 'Visual identity: logo, construction, elements, typography, colors, uses and cover.'),
                 [('img/cases/unicos-mayorga-1.webp', ('Logo', 'Logo')), ('img/cases/unicos-mayorga-2.webp', ('Construcción del logo', 'Logo construction')),
                  ('img/cases/unicos-mayorga-3.webp', ('Elementos y tipografía', 'Elements and typography')), ('img/cases/unicos-mayorga-4.webp', ('Colores y usos', 'Colors and uses')),
                  ('img/cases/unicos-mayorga-5.webp', ('Portada y degradados', 'Cover and gradients'))]),
                (('Neofity', 'Neofity'), ('Manual de marca: colores, fuentes, recursos, logos, usos e ideas de aplicación.', 'Brand manual: colors, fonts, resources, logos, uses and application ideas.'),
                 [('img/cases/unicos-neofity-1.webp', ('Colores y fuentes', 'Colors and fonts')), ('img/cases/unicos-neofity-2.webp', ('Logos y usos', 'Logos and uses')),
                  ('img/cases/unicos-neofity-3.webp', ('Ideas de aplicación', 'Application ideas')), ('img/cases/unicos-neofity-4.webp', ('Usos no autorizados', 'Unauthorized uses'))]),
                (('Unikai Creativa', 'Unikai Creativa'), ('Logo con sus versiones, banner, plantillas de folleto, publicaciones e ilustración.', 'Logo and its versions, banner, brochure templates, posts and illustration.'),
                 [('img/cases/unicos-unikai-logos.webp', ('Logo y versiones', 'Logo and versions')), ('img/cases/unicos-unikai-banner.webp', ('Banner', 'Banner')),
                  ('img/cases/unicos-unikai-flyers.webp', ('Plantillas de folleto', 'Brochure templates')), ('img/cases/unicos-unikai-frases.webp', ('Publicaciones', 'Posts')),
                  ('img/cases/unicos-unikai-ilustracion.webp', ('Ilustración', 'Illustration'))]),
                (('MetalTec Colombia', 'MetalTec Colombia'), ('Branding integral: logo, isotipo, brochure y flyers.', 'End-to-end branding: logo, isotype, brochure and flyers.'),
                 [('img/cases/unicos-metaltec.webp', ('Logo', 'Logo')), ('img/cases/unicos-iso-metaltec.webp', ('Isotipo', 'Isotype')),
                  ('img/cases/unicos-brochure-metaltec.webp', ('Brochure', 'Brochure')), ('img/cases/unicos-flyer-metaltec.webp', ('Flyer', 'Flyer'))], 'metaltec.html'),
                (('Publicidad para clientes', 'Advertising for clients'), ('Volantes, banners y piezas promocionales.', 'Flyers, banners and promotional pieces.'),
                 [('img/cases/unicos-optica-unicos.webp', ('Volante estilo cómic para una óptica', 'Comic-style flyer for an optical store')),
                  ('img/cases/unicos-volantes-unicos.webp', ('Volante de descuento', 'Discount flyer')),
                  ('img/cases/unicos-farmacia-banner.webp', ('Banner para farmacia', 'Pharmacy banner'))]),
                (('Logotipos', 'Logos'), ('Otras marcas creadas en la agencia.', 'Other brands created at the agency.'),
                 [('img/cases/unicos-logo-m.webp', ('Logo con planeta y órbita', 'Logo with planet and orbit'))]),
            ]},
        'gallery': [],
        'palette': [('Rojo suave', 'Soft red', '#D4424F'), ('Café suave', 'Soft brown', '#5A4240'), ('Blanco', 'White', '#FFFFFF')],
        'blocks': [
            {'title': ('Resultados medibles', 'Measurable results'), 'items': [
                ('+30% en la organización de los datos de clientes y campañas', '+30% in the organization of client and campaign data'),
                ('+35% de productividad con herramientas de automatización', '+35% productivity with automation tools'),
                ('+20% de interacción con clientes gracias a las campañas', '+20% client interaction thanks to the campaigns')]},
            {'title': ('Clientes', 'Clients'), 'items': [
                ('Empresas B2B que necesitaban una identidad corporativa sólida', 'B2B companies that needed a solid corporate identity'),
                ('Negocios B2C que buscaban atraer y fidelizar clientes', 'B2C businesses looking to attract and retain customers'),
                ('Emprendimientos que creaban su marca desde cero', 'Startups building their brand from scratch'),
                ('Empresas establecidas que renovaban su imagen', 'Established companies refreshing their image')]},
            {'title': ('Forma de trabajo', 'How we worked'), 'items': [
                ('Un equipo de dos socios con participación directa en cada proyecto', 'A two-partner team directly involved in every project'),
                ('Diseño compartido y liderazgo propio en el área web', 'Shared design work and my own leadership of the web area'),
                ('Atención cercana y soluciones a la medida de cada cliente', 'Close attention and tailored solutions for every client')]},
        ],
        'results': [
            ('Una identidad sólida y diferenciada para la propia agencia', 'A solid, differentiated identity for the agency itself'),
            ('Un portafolio diverso para clientes de múltiples sectores', 'A diverse portfolio for clients across many industries'),
            ('+20% de interacción con clientes gracias a las campañas', '+20% client interaction thanks to the campaigns'),
            ('Experiencia integral en la creación y gestión de una agencia', 'End-to-end experience founding and running an agency'),
        ],
        'cta': (('¿Buscas un aliado creativo para tu marca?', 'Looking for a creative partner for your brand?'),
                ('Integro diseño, marketing y tecnología para que tu marca se vea profesional y llegue a más clientes.', 'I combine design, marketing and technology so your brand looks professional and reaches more customers.')),
        'service': 'branding',
    },
    {
        'id': 'smart-agriculture', 'file': 'smart-agriculture.html', 'name': 'Smart Agriculture', 'pillar': 'code',
        'theme': {'brand': '#7ed957', 'brand_rgb': '126, 217, 87', 'brand2': '#f2c94c', 'brand2_rgb': '242, 201, 76',
                  'bg': '#060f08', 'display': "'Space Grotesk', sans-serif", 'body': "'Exo 2', sans-serif",
                  'fonts': 'Space+Grotesk:wght@500;700', 'motif': 'field', 'bullet': '❖'},
        'kicker': ('PROGRAMACIÓN · TYPESCRIPT · NPM', 'PROGRAMMING · TYPESCRIPT · NPM'),
        'title': ('Smart Agriculture', 'Smart Agriculture'),
        'tagline': ('Un modelo en TypeScript para una granja inteligente: sensores, riego según el clima, drones y detección de enfermedades.',
                    'A TypeScript model for a smart farm: sensors, weather-based irrigation, drones and disease detection.'),
        'tags': ['TypeScript', 'Node.js', 'POO', 'npm'],
        'hero': {'code': {'file': 'smartAgriculture.ts', 'src': CODE_AGRO}, 'card': 'img/thumbs/smart-agriculture-card.webp'},
        'links': [(('Ver código en GitHub', 'See code on GitHub'), 'https://github.com/SaharLambton/Smart-Agriculture'),
                  (('Ver paquete en npm', 'See npm package'), 'https://www.npmjs.com/package/@julianlambton/smart-agriculture')],
        'facts': [
            (('Tipo', 'Type'), ('Proyecto académico · Lambton College', 'Academic project · Lambton College')),
            (('Año', 'Year'), ('2024', '2024')),
            (('Equipo', 'Team'), ('Con Julián Casilimas', 'With Julián Casilimas')),
            (('Entrega', 'Delivery'), ('Paquete publicado en npm', 'Package published on npm')),
        ],
        'summary': ('Un modelo orientado a objetos de una granja inteligente. Cada parte del campo es una clase: un sensor que mide la humedad, un pronóstico del clima, un sistema de riego, drones y un detector de enfermedades. Un controlador combina esos datos para decidir cuándo regar. El proyecto se publicó como paquete en npm, así que cualquiera puede instalarlo.',
                    'An object-oriented model of a smart farm. Each part of the field is a class: a moisture sensor, a weather forecast, an irrigation system, drones and a disease detector. A controller combines that data to decide when to irrigate. The project was published as an npm package, so anyone can install it.'),
        'gallery': [],
        'blocks': [
            {'title': ('Componentes del sistema', 'System components'), 'items': [
                ('Sensor: lee el tipo, la ubicación y el valor medido', 'Sensor: reads type, location and measured value'),
                ('Pronóstico del clima que decide si conviene regar', 'Weather forecast that decides whether to irrigate'),
                ('Controlador de riego que une sensor, clima y sistema de riego', 'Irrigation controller that joins sensor, weather and irrigation system'),
                ('Drones que se envían a cada zona del campo', 'Drones sent to each area of the field'),
                ('Detector de enfermedades en las plantas', 'Plant disease detector')]},
            {'title': ('Lo que practiqué', 'What I practiced'), 'items': [
                ('Clases con propiedades públicas y privadas en TypeScript', 'Classes with public and private properties in TypeScript'),
                ('Inyección de dependencias en el controlador', 'Dependency injection in the controller'),
                ('Compilación de TypeScript a JavaScript con tsc', 'Compiling TypeScript to JavaScript with tsc'),
                ('Publicación de un paquete en npm con sus tipos', 'Publishing an npm package with its types')]},
        ],
        'process': [
            (('Modelado', 'Modeling'), ('Qué elementos tiene un campo inteligente.', 'Which elements a smart field has.')),
            (('Clases', 'Classes'), ('Un componente por clase en TypeScript.', 'One component per TypeScript class.')),
            (('Lógica de riego', 'Irrigation logic'), ('El controlador decide con sensor y clima.', 'The controller decides from sensor and weather.')),
            (('Publicación', 'Publishing'), ('Compilado y publicado en npm.', 'Compiled and published on npm.')),
        ],
        'terminal': {'over': ('// EJECUCIÓN', '// RUN'), 'title': ('Así responde el sistema', 'How the system responds'), 'shell': 'bash',
                     'lines': ['$ npm install @julianlambton/smart-agriculture', '$ npm start', '',
                               'Sensor ID 2: Moisture at Field 5 reads value: 50', 'Checking weather forecast...',
                               'Weather conditions are suitable for irrigation.', 'Irrigation system started.',
                               'Drone Model X flying to Field 5', 'Disease Detector Detector Y is scanning for diseases...'],
                     'note': ('Salida del programa de ejemplo que trae el paquete.', 'Output of the sample program included in the package.')},
        'results': [
            ('Paquete publicado en npm, listo para instalar', 'Package published on npm, ready to install'),
            ('Arquitectura modular: cada componente se cambia sin tocar los demás', 'Modular architecture: each component can change without touching the rest'),
            ('Trabajo en equipo con control de versiones en GitHub', 'Teamwork with version control on GitHub'),
        ],
        'cta': (('¿Necesitas un sistema a la medida?', 'Need a custom system?'),
                ('Diseño software ordenado y fácil de mantener para tu empresa.', 'I design organized, easy-to-maintain software for your company.')),
        'service': 'software',
    },
    {
        'id': 'bookstore', 'file': 'library-management.html', 'name': 'Library Management', 'pillar': 'code',
        'theme': {'brand': '#f0c419', 'brand_rgb': '240, 196, 25', 'brand2': '#c97b4a', 'brand2_rgb': '201, 123, 74',
                  'bg': '#0f0c07', 'display': "'Libre Baskerville', serif", 'body': "'Exo 2', sans-serif",
                  'fonts': 'Libre+Baskerville:wght@400;700', 'motif': 'books', 'bullet': '▸'},
        'kicker': ('PROGRAMACIÓN · TYPESCRIPT · PRUEBAS', 'PROGRAMMING · TYPESCRIPT · TESTING'),
        'title': ('Library Management', 'Library Management'),
        'tagline': ('Gestión de una biblioteca en TypeScript: libros, clientes, préstamos y devoluciones, todo probado con Jest.',
                    'Library management in TypeScript: books, customers, loans and returns, all tested with Jest.'),
        'tags': ['TypeScript', 'Node.js', 'Jest', 'ts-jest', 'GitHub Actions', 'POO'],
        'hero': {'code': {'file': 'src/services/Bookstore.ts', 'src': CODE_BOOK}, 'card': 'img/thumbs/library-card.webp'},
        'links': [(('Ver código en GitHub', 'See code on GitHub'), 'https://github.com/SaharLambton/Assigment3')],
        'facts': [
            (('Tipo', 'Type'), ('Proyecto académico · Lambton College', 'Academic project · Lambton College')),
            (('Año', 'Year'), ('2024', '2024')),
            (('Rol', 'Role'), ('Desarrolladora', 'Developer')),
            (('Calidad', 'Quality'), ('Pruebas en Jest + integración continua', 'Jest tests + continuous integration')),
        ],
        'summary': ('Una aplicación que simula la gestión de una biblioteca. Permite registrar libros y clientes, prestar un libro solo si está disponible y devolverlo solo si ese cliente lo tiene. Cada operación está cubierta con pruebas unitarias en Jest que se ejecutan solas en GitHub cada vez que se sube un cambio.',
                    'An app that simulates managing a library. It registers books and customers, lends a book only if it is available and takes it back only if that customer has it. Every operation is covered by Jest unit tests that run automatically on GitHub whenever a change is pushed.'),
        'gallery': [],
        'blocks': [
            {'title': ('Funcionalidades', 'Features'), 'items': [
                ('Registro de libros y clientes', 'Book and customer registration'),
                ('Búsqueda por ID', 'Lookup by ID'),
                ('Préstamo solo si el libro está disponible', 'Loans only when the book is available'),
                ('Devolución solo si el cliente tiene el libro', 'Returns only if the customer has the book'),
                ('Mensajes claros de éxito o error', 'Clear success or error messages')]},
            {'title': ('Arquitectura', 'Architecture'), 'items': [
                ('Modelos: Book y Customer', 'Models: Book and Customer'),
                ('Servicio Bookstore con toda la lógica', 'Bookstore service with all the logic'),
                ('TypeScript compilado a JavaScript en dist/', 'TypeScript compiled to JavaScript in dist/')]},
            {'title': ('Calidad', 'Quality'), 'items': [
                ('Pruebas de agregar, prestar y devolver libros', 'Tests for adding, borrowing and returning books'),
                ('Reporte de cobertura con Jest', 'Coverage report with Jest'),
                ('GitHub Actions en cada push y pull request a main', 'GitHub Actions on every push and pull request to main'),
                ('Caché de dependencias y reporte guardado como artefacto', 'Dependency cache and report saved as an artifact')]},
        ],
        'terminal': {'over': ('// PRUEBAS', '// TESTS'), 'title': ('Todas las pruebas en verde', 'All tests green'), 'shell': 'npm test',
                     'lines': ['$ npm test', '', ' PASS  src/tests/addBook.test.ts', ' PASS  src/tests/borrowBook.test.ts', ' PASS  src/tests/returnBook.test.ts',
                               ' PASS  dist/tests/addBook.test.js', ' PASS  dist/tests/borrowBook.test.js', ' PASS  dist/tests/returnBook.test.js', '',
                               'Test Suites: 6 passed, 6 total', 'Tests:       6 passed, 6 total'],
                     'note': ('Resultado guardado en el repositorio (results.txt): se prueba el código TypeScript y el JavaScript compilado.', 'Result saved in the repository (results.txt): both the TypeScript code and the compiled JavaScript are tested.')},
        'results': [
            ('Lógica de préstamos sin estados imposibles', 'Loan logic with no impossible states'),
            ('Pruebas automáticas en cada cambio', 'Automatic tests on every change'),
            ('Código organizado en modelos y servicios', 'Code organized into models and services'),
        ],
        'cta': (('¿Necesitas un sistema confiable para tu negocio?', 'Need a reliable system for your business?'),
                ('Desarrollo software con pruebas para que funcione siempre.', 'I build tested software so it always works.')),
        'service': 'software',
    },
    {
        'id': 'space-flight', 'file': 'space-flight-booking.html', 'name': 'Space Flight Booking', 'pillar': 'code',
        'theme': {'brand': '#8b7bff', 'brand_rgb': '139, 123, 255', 'brand2': '#ff7ac6', 'brand2_rgb': '255, 122, 198',
                  'bg': '#05040f', 'display': "'Audiowide', sans-serif", 'body': "'Exo 2', sans-serif",
                  'fonts': 'Audiowide', 'motif': 'orbit', 'bullet': '✦'},
        'kicker': ('PROGRAMACIÓN · TYPESCRIPT · DEVOPS', 'PROGRAMMING · TYPESCRIPT · DEVOPS'),
        'title': ('Space Flight Booking', 'Space Flight Booking'),
        'tagline': ('Reservas de vuelos a Marte con verificación médica, pagos, pruebas automáticas y despliegue con Docker.',
                    'Flight bookings to Mars with medical checks, payments, automated tests and Docker deployment.'),
        'tags': ['TypeScript', 'Node.js', 'Jest', 'Docker', 'GitHub Actions'],
        'hero': {'code': {'file': 'src/services/BookingService.ts', 'src': CODE_SPACE}, 'card': 'img/thumbs/space-flight-card.webp'},
        'links': [(('Ver código en GitHub', 'See code on GitHub'), 'https://github.com/SaharLambton/Assigment1')],
        'facts': [
            (('Tipo', 'Type'), ('Proyecto académico · Lambton College', 'Academic project · Lambton College')),
            (('Año', 'Year'), ('2024', '2024')),
            (('Rol', 'Role'), ('Desarrolladora backend', 'Backend developer')),
            (('Stack', 'Stack'), ('TypeScript · Jest · Docker', 'TypeScript · Jest · Docker')),
        ],
        'summary': ('El backend de una agencia que vende vuelos a Marte. Antes de reservar, el sistema verifica que el pasajero sea mayor de edad y tenga certificado médico; si hay cupo, crea la reserva, descuenta el asiento y registra el pago. Además de la lógica, el proyecto prepara todo el ciclo DevOps: pruebas automáticas, un contenedor Docker y un pipeline que construye y publica la imagen.',
                    'The backend for an agency that sells flights to Mars. Before booking, the system checks that the passenger is an adult with a medical certificate; if there are seats, it creates the booking, takes the seat and records the payment. Beyond the logic, the project sets up the whole DevOps cycle: automated tests, a Docker container and a pipeline that builds and publishes the image.'),
        'gallery': [],
        'blocks': [
            {'title': ('Lógica de negocio', 'Business logic'), 'items': [
                ('Verificación médica: mayor de 18 y con certificado', 'Medical check: over 18 with a certificate'),
                ('Reservas con control de cupos', 'Bookings with seat control'),
                ('Al cancelar, el asiento se libera', 'Cancelling frees the seat'),
                ('Pagos registrados por reserva', 'Payments recorded per booking'),
                ('Estados con enums: confirmada, pendiente, cancelada', 'States with enums: confirmed, pending, cancelled')]},
            {'title': ('Calidad', 'Quality'), 'items': [
                ('Pruebas en Jest para reservas, pagos y verificación médica', 'Jest tests for bookings, payments and medical checks'),
                ('Registro de eventos con fecha y hora', 'Event logging with date and time'),
                ('Entidades y servicios separados', 'Separate entities and services')]},
            {'title': ('DevOps', 'DevOps'), 'items': [
                ('Dockerfile que compila TypeScript y arranca la app', 'Dockerfile that compiles TypeScript and starts the app'),
                ('Pipeline en GitHub Actions sobre la rama develop', 'GitHub Actions pipeline on the develop branch'),
                ('Instala, prueba y compila en cada push', 'Installs, tests and builds on every push'),
                ('Publica la imagen en Docker Hub con credenciales en secrets', 'Publishes the image to Docker Hub with credentials in secrets')]},
        ],
        'process': [
            (('Push', 'Push'), ('Un cambio llega a la rama develop.', 'A change lands on the develop branch.')),
            (('Pruebas', 'Tests'), ('npm ci y Jest.', 'npm ci and Jest.')),
            (('Build', 'Build'), ('TypeScript compilado.', 'TypeScript compiled.')),
            (('Docker', 'Docker'), ('Se construye la imagen.', 'The image is built.')),
            (('Docker Hub', 'Docker Hub'), ('La imagen se publica.', 'The image is published.')),
        ],
        'results': [
            ('Flujo completo de reserva: verificación, cupo y pago', 'Complete booking flow: check, seat and payment'),
            ('Aplicación lista para correr en cualquier servidor con Docker', 'App ready to run on any server with Docker'),
            ('Pipeline de integración y despliegue continuo', 'Continuous integration and deployment pipeline'),
        ],
        'cta': (('¿Necesitas un sistema de reservas o pagos?', 'Need a booking or payment system?'),
                ('Desarrollo backends a la medida, listos para producción.', 'I build custom backends, ready for production.')),
        'service': 'software',
    },
    {
        'id': 'jest-ci', 'file': 'jest-ci.html', 'name': 'Jest CI', 'pillar': 'code',
        'theme': {'brand': '#ff5d73', 'brand_rgb': '255, 93, 115', 'brand2': '#2f81f7', 'brand2_rgb': '47, 129, 247',
                  'bg': '#0a0c11', 'display': "'Space Mono', monospace", 'body': "'Exo 2', sans-serif",
                  'fonts': 'Space+Mono:wght@400;700', 'motif': 'pipeline', 'bullet': '✓'},
        'kicker': ('PROGRAMACIÓN · DEVOPS · CI', 'PROGRAMMING · DEVOPS · CI'),
        'title': ('Jest CI', 'Jest CI'),
        'tagline': ('Integración continua: cada cambio que llega a main ejecuta las pruebas solo, con GitHub Actions.',
                    'Continuous integration: every change pushed to main runs the tests on its own, with GitHub Actions.'),
        'tags': ['JavaScript', 'Node.js', 'Jest', 'GitHub Actions', 'YAML'],
        'hero': {'img': 'img/cases/jestci-actions.webp', 'alt': 'Historial de ejecuciones del workflow Jest CI en GitHub Actions'},
        'links': [(('Ver código en GitHub', 'See code on GitHub'), 'https://github.com/SaharLambton/Assigment4')],
        'facts': [
            (('Tipo', 'Type'), ('Curso DevOps Tools and Practices · Lambton College', 'DevOps Tools and Practices course · Lambton College')),
            (('Año', 'Year'), ('2024', '2024')),
            (('Rol', 'Role'), ('Desarrolladora', 'Developer')),
            (('Herramientas', 'Tools'), ('Jest · GitHub Actions · Node.js 16', 'Jest · GitHub Actions · Node.js 16')),
        ],
        'summary': ('Configuré la integración continua de un proyecto JavaScript: cada vez que un cambio llega a la rama main, GitHub Actions prepara un servidor, instala el proyecto y ejecuta las pruebas con Jest. El historial muestra el proceso real: los primeros intentos fallaron, encontré la causa y desde entonces cada cambio se prueba solo.',
                    'I set up continuous integration for a JavaScript project: whenever a change lands on the main branch, GitHub Actions prepares a server, installs the project and runs the Jest tests. The history shows the real process: the first attempts failed, I found the cause, and since then every change is tested automatically.'),
        'gallery': [
            ('img/cases/jestci-actions.webp', ('Ejecuciones del workflow en GitHub Actions', 'Workflow runs in GitHub Actions')),
            ('img/cases/jestci-terminal.webp', ('Pruebas en la terminal', 'Tests in the terminal')),
        ],
        'blocks': [
            {'title': ('El pipeline', 'The pipeline'), 'items': [
                ('Se activa con cada push a main', 'Runs on every push to main'),
                ('Servidor Ubuntu con Node.js 16', 'Ubuntu server with Node.js 16'),
                ('Instala dependencias y da permisos a Jest', 'Installs dependencies and gives Jest permissions'),
                ('Ejecuta las pruebas y avisa si todo pasó', 'Runs the tests and reports when everything passes')]},
            {'title': ('Documentación', 'Documentation'), 'items': [
                ('README paso a paso para repetir la configuración', 'Step-by-step README to repeat the setup'),
                ('Capturas del workflow y de la consola', 'Screenshots of the workflow and the console'),
                ('Ideas de mejora: más pruebas y notificaciones', 'Improvement ideas: more tests and notifications')]},
        ],
        'challenges': [
            (('Las pruebas fallaban en GitHub pero no en mi computador', 'Tests failed on GitHub but not on my computer'),
             ('El ejecutable de Jest no tenía permisos en el servidor de GitHub Actions. Agregué un paso que se los da (chmod +x) antes de correr las pruebas, y el workflow pasó a verde.',
              "Jest's executable had no permissions on the GitHub Actions server. I added a step that grants them (chmod +x) before running the tests, and the workflow turned green.")),
        ],
        'terminal': {'over': ('// PRUEBAS', '// TESTS'), 'title': ('Las mismas pruebas, en local y en la nube', 'The same tests, locally and in the cloud'), 'shell': 'powershell',
                     'lines': ['$ npm test', '', '> assigment4@1.0.0 test', '> jest', '', ' PASS  __tests__/example.test.js',
                               '   ✓ adds 1 + 2 to equal 3 (4 ms)', '   ✓ subtracts 5 - 2 to equal 3 (1 ms)', '',
                               'Test Suites: 1 passed, 1 total', 'Tests:       2 passed, 2 total']},
        'results': [
            ('7 ejecuciones del workflow; desde la corrección, todas en verde', '7 workflow runs; since the fix, all green'),
            ('Cada cambio se prueba solo, sin pasos manuales', 'Every change is tested on its own, with no manual steps'),
            ('Base lista para sumar más pruebas y alertas', 'A base ready for more tests and alerts'),
        ],
        'cta': (('¿Quieres que tu equipo deje de probar a mano?', 'Want your team to stop testing by hand?'),
                ('Automatizo pruebas y despliegues para que cada cambio sea seguro.', 'I automate tests and deployments so every change is safe.')),
        'service': 'automation',
    },
    {
        'id': 'ai-workshop', 'file': 'taller-ia.html', 'name': 'Taller de IA · Intel Tax', 'pillar': 'ai',
        'theme': {'brand': '#ff7a2f', 'brand_rgb': '255, 122, 47', 'brand2': '#3b82f6', 'brand2_rgb': '59, 130, 246',
                  'bg': '#07101c', 'display': "'DM Serif Display', serif", 'body': "'Exo 2', sans-serif",
                  'fonts': 'DM+Serif+Display', 'motif': 'bubbles', 'bullet': '●'},
        'kicker': ('IA · TALLER PRÁCTICO · CAPACITACIÓN', 'AI · HANDS-ON WORKSHOP · TRAINING'),
        'title': ('IA para el ejercicio contable', 'AI for accounting practice'),
        'tagline': ('Capacitación práctica para que el equipo de Intel Tax Outsourcing SAS adoptara ChatGPT Work con criterio profesional, buenas prácticas y protección de la información.',
                    'Hands-on training so the Intel Tax Outsourcing SAS team could adopt ChatGPT Work with professional judgment, good practices and information protection.'),
        'tags': ['IA generativa', 'ChatGPT Work', 'Prompting', 'Privacidad de datos', 'GPTs personalizados', 'Capacitación'],
        'hero': {'img': 'img/cases/taller-portada.webp', 'alt': 'Portada del taller Inteligencia artificial para el ejercicio contable'},
        'facts': [
            (('Cliente', 'Client'), ('Intel Tax Outsourcing SAS', 'Intel Tax Outsourcing SAS')),
            (('Fecha', 'Date'), ('29 de septiembre de 2026', 'September 29, 2026')),
            (('Formato', 'Format'), ('Virtual · 2 horas', 'Online · 2 hours')),
            (('Participantes', 'Participants'), ('8 profesionales contables', '8 accounting professionals')),
        ],
        'summary': ('Intel Tax Outsourcing SAS, firma de outsourcing contable y tributario, decidió adoptar ChatGPT Work como herramienta corporativa y necesitaba que todo su equipo partiera de la misma base: de sus ocho integrantes, cuatro ya utilizaban IA y cuatro aún no la habían incorporado a su trabajo. A partir de un diagnóstico de sus necesidades diseñé una propuesta a la medida y un taller teórico-práctico centrado en el uso responsable de la herramienta, con especial énfasis en la protección de la información financiera y tributaria de sus clientes.',
                    'Intel Tax Outsourcing SAS, an accounting and tax outsourcing firm, decided to adopt ChatGPT Work as a corporate tool and needed its whole team to start from the same base: of its eight members, four already used AI and four had not yet brought it into their work. Based on an assessment of their needs, I designed a tailored proposal and a theory-and-practice workshop focused on the responsible use of the tool, with special emphasis on protecting their clients\' financial and tax information.'),
        'concept': {
            'title': ('La IA propone. El contador decide.', 'AI proposes. The accountant decides.'),
            'quote': ('Usa la IA, siempre con criterio de contador.', 'Use AI, always with an accountant\'s judgment.'),
            'paras': [
                ('El taller combina explicaciones breves con dinámicas aplicadas al día a día contable, para que cada concepto se practique en el momento y se traduzca en hábitos de trabajo concretos.',
                 'The workshop pairs short explanations with activities drawn from day-to-day accounting work, so each concept is practiced on the spot and turns into concrete work habits.'),
                ('Los ejercicios se diferencian por nivel: quienes se inician aprenden los fundamentos desde cero y quienes ya usan la herramienta profundizan y sistematizan sus buenas prácticas, todo dentro de la misma sesión.',
                 'Exercises are split by level: beginners learn the fundamentals from scratch while experienced users go deeper and systematize their good practices, all within the same session.')]},
        'gallery': [
            ('img/cases/taller-portada.webp', ('Portada del taller', 'Workshop cover')),
            ('img/cases/taller-agenda.webp', ('Agenda de la sesión', 'Session agenda')),
            ('img/cases/taller-agentes.webp', ('Agentes INTEL diseñados para la firma', 'INTEL agents designed for the firm')),
            ('img/cases/taller-kahoot.webp', ('Evaluación final tipo Kahoot', 'Kahoot-style final assessment')),
        ],
        'sections': [
            {'kind': 'cards', 'over': ('// AGENTES INTEL', '// INTEL AGENTS'), 'title': ('Asistentes de IA a la medida de la firma', 'AI assistants tailored to the firm'),
             'intro': ('Como complemento del taller diseñé seis GPTs personalizados, configurados con instrucciones específicas para las áreas de la firma. Permiten resolver tareas frecuentes sin repetir el contexto en cada conversación y mantienen siempre la revisión final en manos del profesional.',
                       'To complement the workshop I designed six custom GPTs, configured with specific instructions for the firm\'s areas. They handle frequent tasks without repeating context in every conversation and always leave the final review to the professional.'),
             'items': [
                (('Tributario', 'Tax'), ('Apoyo en liquidaciones, conceptos y análisis de riesgo fiscal.', 'Support with tax filings, opinions and fiscal risk analysis.')),
                (('Cierre contable', 'Accounting close'), ('Listas de verificación de cierre, revisión de saldos y ajustes.', 'Closing checklists, balance reviews and adjustments.')),
                (('Nómina', 'Payroll'), ('Novedades de nómina, liquidaciones y planilla de seguridad social (PILA).', 'Payroll changes, settlements and social security filings (PILA).')),
                (('Auditoría', 'Audit'), ('Diseño de pruebas, registro de hallazgos y seguimiento.', 'Test design, findings log and follow-up.')),
                (('Gerencial', 'Management'), ('Indicadores, escenarios y análisis de capacidad del equipo.', 'KPIs, scenarios and team capacity analysis.')),
                (('Prompt Maestro', 'Prompt Master'), ('Ayuda a construir y mejorar las instrucciones que el equipo le da a la IA.', 'Helps build and improve the instructions the team gives the AI.')),
             ]},
        ],
        'blocks': [
            {'title': ('Contenido', 'Content'), 'items': [
                ('Fundamentos de la IA generativa y sus límites', 'Generative AI fundamentals and their limits'),
                ('Protección de datos y privacidad en un entorno corporativo', 'Data protection and privacy in a corporate environment'),
                ('Funcionalidades clave: chat, GPTs personalizados y Proyectos', 'Key features: chat, custom GPTs and Projects'),
                ('Selección de modelos y uso eficiente de la herramienta', 'Model selection and efficient use of the tool'),
                ('Redacción de prompts efectivos y metaprompting', 'Writing effective prompts and metaprompting')]},
            {'title': ('Metodología', 'Methodology'), 'items': [
                ('Diagnóstico previo con el equipo y propuesta a la medida', 'Prior assessment with the team and a tailored proposal'),
                ('Sesión teórico-práctica con ejemplos del sector contable', 'Theory-and-practice session with accounting examples'),
                ('Ejercicios diferenciados según el nivel de cada participante', 'Exercises tailored to each participant\'s level'),
                ('Dinámicas grupales y evaluación final gamificada', 'Group activities and a gamified final assessment')]},
            {'title': ('Entregables', 'Deliverables'), 'items': [
                ('Propuesta de capacitación a la medida', 'Tailored training proposal'),
                ('Presentación y material de apoyo para cada asistente', 'Presentation and support material for each attendee'),
                ('Guía de ejercicios prácticos', 'Practical exercise guide'),
                ('Lineamientos de uso para el periodo de prueba de la herramienta', 'Usage guidelines for the tool\'s trial period'),
                ('Seis agentes de IA personalizados para las áreas de la firma', 'Six custom AI agents for the firm\'s areas')]},
        ],
        'process': [
            (('Diagnóstico', 'Assessment'), ('Necesidades y nivel del equipo.', 'Team needs and level.')),
            (('Propuesta', 'Proposal'), ('Contenido y agenda a la medida.', 'Tailored content and agenda.')),
            (('Diseño', 'Design'), ('Material, ejercicios y agentes.', 'Materials, exercises and agents.')),
            (('Taller', 'Workshop'), ('Sesión virtual de 2 horas.', '2-hour online session.')),
            (('Evaluación', 'Assessment'), ('Juego final y preguntas.', 'Final game and Q&A.')),
        ],
        'results': [
            ('El equipo valoró la sesión de forma muy positiva', 'The team rated the session very positively'),
            ('Los ocho participantes partieron de una base común, sin importar su nivel', 'All eight participants started from a common base, whatever their level'),
            ('Lineamientos claros para proteger la información de los clientes', 'Clear guidelines to protect client information'),
            ('Seis agentes listos para apoyar el trabajo diario de la firma', 'Six agents ready to support the firm\'s daily work'),
        ],
        'cta': (('¿Tu equipo está listo para trabajar con IA?', 'Is your team ready to work with AI?'),
                ('Diseño capacitaciones a la medida de tu sector para que tu equipo aproveche la IA con seguridad y resultados desde el primer día.', 'I design training tailored to your industry so your team can use AI safely and see results from day one.')),
        'service': 'workshops',
    },
    {
        'id': 'aura', 'file': 'aura.html', 'name': 'AURA', 'pillar': 'ai',
        'theme': {'brand': '#2bf5b0', 'brand_rgb': '43, 245, 176', 'brand2': '#a970ff', 'brand2_rgb': '169, 112, 255',
                  'bg': '#020406', 'display': "'Orbitron', sans-serif", 'body': "'Exo 2', sans-serif",
                  'fonts': 'Orbitron:wght@500;700;800', 'motif': 'orb', 'bullet': '◈'},
        'kicker': ('IA · ASISTENTE CONVERSACIONAL · WEBGL', 'AI · CONVERSATIONAL ASSISTANT · WEBGL'),
        'title': ('AURA', 'AURA'),
        'tagline': ('La asistente de este portafolio: te recibe, te guía por cada página y responde tus preguntas en español e inglés, con voz.',
                    "This portfolio's assistant: she welcomes you, guides you through every page and answers your questions in Spanish and English, out loud."),
        'tags': ['JavaScript', 'Three.js', 'WebGL', 'GLSL', 'Web Speech API', 'UX'],
        'hero': {'img': 'img/cases/aura-home.webp', 'alt': 'Inicio del portafolio con el orbe 3D de AURA'},
        'links': [(('Hablar con AURA', 'Talk to AURA'), 'index.html')],
        'facts': [
            (('Tipo', 'Type'), ('Proyecto propio · este portafolio', 'Own project · this portfolio')),
            (('Año', 'Year'), ('2026', '2026')),
            (('Rol', 'Role'), ('Diseño, desarrollo y contenido', 'Design, development and content')),
            (('Tecnología', 'Technology'), ('JavaScript · Three.js · Web Speech API', 'JavaScript · Three.js · Web Speech API')),
        ],
        'summary': ('Quería un portafolio que no solo se leyera, sino que conversara. AURA es una asistente que vive en un orbe 3D: saluda al llegar, explica cada página mientras la recorres y responde preguntas sobre mis proyectos, servicios y experiencia. Funciona entera en el navegador, sin servidor, y está lista para conectarse a un modelo de IA.',
                    "I wanted a portfolio that doesn't just get read but holds a conversation. AURA is an assistant living in a 3D orb: she greets you, explains each page as you explore it and answers questions about my projects, services and experience. She runs entirely in the browser, with no server, and is ready to connect to an AI model."),
        'concept': {
            'title': ('Un portafolio que conversa', 'A portfolio that talks'),
            'quote': ('Pregúntame lo que necesites.', 'Ask me anything you need.'),
            'paras': [
                ('El orbe reacciona a lo que hace AURA: respira cuando espera, gira más rápido cuando piensa, vibra al hablar y se ilumina cuando escucha por el micrófono. Está hecho con shaders propios, partículas y anillos en WebGL.',
                 'The orb reacts to what AURA is doing: it breathes while waiting, spins faster while thinking, pulses as she speaks and lights up when she listens through the microphone. It is built with custom shaders, particles and rings in WebGL.'),
                ('En las demás pestañas AURA baja a un orbe flotante que comenta cada sección y abre un chat cuando lo tocas.',
                 'On the other tabs AURA shrinks into a floating orb that comments on each section and opens a chat when you tap it.')]},
        'gallery': [
            ('img/cases/aura-home.webp', ('Inicio: el orbe y la consola de AURA', 'Home: the orb and AURA console')),
            ('img/cases/aura-chat.webp', ('Respuesta con botones de acción', 'Answer with action buttons')),
            ('img/cases/aura-pillars.webp', ('Los pilares del inicio', 'The home pillars')),
            ('img/cases/aura-float.webp', ('AURA flotante en otras pestañas', 'Floating AURA on other tabs')),
            ('img/cases/aura-console.webp', ('Consola "Diseña tu misión"', '"Design your mission" console')),
        ],
        'blocks': [
            {'title': ('Lo que hace', 'What she does'), 'items': [
                ('Arranque "Iniciar sistema" que habilita la voz', '"Start system" boot that enables the voice'),
                ('Responde sobre proyectos, servicios, experiencia y contacto', 'Answers about projects, services, experience and contact'),
                ('Detecta si le escribes en español o en inglés', 'Detects whether you write in Spanish or English'),
                ('Habla en voz alta y entiende preguntas por micrófono', 'Speaks out loud and understands questions by microphone'),
                ('Comenta cada página y lleva a la sección correcta', 'Comments on each page and takes you to the right section')]},
            {'title': ('Cómo está hecha', 'How she is built'), 'items': [
                ('Orbe 3D con Three.js y shaders GLSL propios', '3D orb with Three.js and custom GLSL shaders'),
                ('Motor de intenciones con palabras clave y pesos', 'Intent engine with weighted keywords'),
                ('Cola de comentarios para no interrumpir', 'Comment queue so she never interrupts'),
                ('Sin servidor: todo corre en el navegador', 'Serverless: everything runs in the browser'),
                ('Preparada para conectar un modelo de IA', 'Ready to connect an AI model')]},
            {'title': ('Pensada para todos', 'Designed for everyone'), 'items': [
                ('La voz se puede apagar y queda el texto', 'The voice can be turned off and text remains'),
                ('Respeta la opción de reducir movimiento', 'Respects the reduced-motion setting'),
                ('Todo el sitio en español e inglés', 'The whole site in Spanish and English'),
                ('Se puede usar con teclado', 'Can be used with a keyboard')]},
        ],
        'results': [
            ('Un portafolio que guía al visitante en lugar de esperar a que busque', 'A portfolio that guides visitors instead of waiting for them to search'),
            ('Respuestas al instante, de día o de noche', 'Instant answers, day or night'),
            ('Una demostración en vivo de lo que puedo construir con IA', 'A live demo of what I can build with AI'),
        ],
        'cta': (('¿Quieres un asistente así para tu sitio?', 'Want an assistant like this for your site?'),
                ('Creo chatbots y asistentes que atienden a tus clientes a cualquier hora.', 'I build chatbots and assistants that serve your customers at any hour.')),
        'service': 'chatbots',
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
    'field': '<div class="motif motif--field" aria-hidden="true"></div>',
    'books': '<div class="motif motif--books" aria-hidden="true"></div>',
    'orbit': '<div class="motif motif--orbit" aria-hidden="true"></div>',
    'pipeline': '<div class="motif motif--pipeline" aria-hidden="true"></div>',
    'orb': '<div class="motif motif--orb" aria-hidden="true"></div>',
    'bubbles': '<div class="motif motif--bubbles" aria-hidden="true"><i></i><i></i><i></i></div>',
    'secure': '<div class="motif motif--secure" aria-hidden="true"><svg viewBox="0 0 120 140"><path d="M60 6 L110 26 V66 C110 100 88 122 60 134 C32 122 10 100 10 66 V26 Z"/><rect x="38" y="62" width="44" height="34" rx="5"/><path d="M46 62 V50 a14 14 0 0 1 28 0 V62"/><circle cx="60" cy="78" r="4"/></svg>'
              + ''.join(f'<span style="--i:{i}">{h}</span>' for i, h in enumerate(['session_start()', 'mysqli_connect()', 'SELECT * FROM users', "$_SESSION['ID']", 'INSERT INTO users', 'UPDATE users SET']))
              + '</div>',
}


TOKEN = re.compile(r"(?P<c>//[^\n]*)|(?P<s>'[^'\n]*'|\"[^\"\n]*\"|`[^`\n]*`)|(?P<k>\b(?:class|constructor|public|private|return|if|else|const|let|new|this|throw|void|export|import|from|function|extends|async|await|describe|it|test|expect)\b)|(?P<n>\b\d+\b)|(?P<t>\b[A-Z][A-Za-z]+\b)|(?P<f>\b[a-z][A-Za-z]*(?=\())")


def highlight(src):
    """Resaltado sencillo para mostrar código real en la portada."""
    out, pos = [], 0
    for m in TOKEN.finditer(src):
        out.append(e(src[pos:m.start()]))
        out.append(f'<span class="tk-{m.lastgroup}">{e(m.group())}</span>')
        pos = m.end()
    out.append(e(src[pos:]))
    return ''.join(out)


def term_line(line):
    t = e(line)
    t = re.sub(r'^(\$ .*)$', r'<span class="tm-cmd">\1</span>', t)
    t = t.replace('PASS', '<span class="tm-pass">PASS</span>').replace('✓', '<span class="tm-ok">✓</span>')
    t = re.sub(r'(\d+ passed)', r'<span class="tm-ok">\1</span>', t)
    return t


def hero_src(p):
    h = p['hero']
    return h.get('img') or h.get('poster') or h.get('card')


HUD = '<i class="hud hud--tl"></i><i class="hud hud--tr"></i><i class="hud hud--bl"></i><i class="hud hud--br"></i>'


def zoom(src, cap, idx, cls=''):
    """Imagen grande que abre el visor en la foto `idx` de la galería."""
    return (f'<button type="button" class="case-zoom {cls}" data-index="{idx}">'
            f'<img src="{src}" alt="{e(cap[0])}" loading="lazy">{bi("span", "case-zoom__cap", cap)}'
            f'<span class="case-zoom__icon" aria-hidden="true">⤢</span></button>')


def page(p, prev, nxt, num, total):
    t = p['theme']
    lang_title = f"{p['name']} · Sahar Chain"
    # también la tipografía del siguiente proyecto, para su tarjeta al final
    extra = f"&family={nxt['theme']['fonts']}" if nxt['theme']['fonts'] != t['fonts'] else ''
    fonts = f"https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Orbitron:wght@500;700;800&family={t['fonts']}{extra}&display=swap"
    style = (f"--brand:{t['brand']};--brand-rgb:{t['brand_rgb']};--brand2:{t['brand2']};--brand2-rgb:{t['brand2_rgb']};"
             f"--case-bg:{t['bg']};--case-display:{t['display']};--case-body:{t['body']};--fx-a:{t['brand']};--fx-b:{t['brand2']};--bullet:'{t['bullet']}'")
    pill_es, pill_en = PILLAR[p['pillar']]
    code = f'{num:02d} / {total:02d}'
    ev = p.get('evidence')
    # con archivo de evidencias, sus fotos forman la galería del visor
    gallery = p['gallery'] or ([img for g in ev['groups'] for img in g[2]] if ev else [])

    # imágenes para la misión y las franjas: las de la galería que no son la portada
    hs = hero_src(p)
    pool = [(i, src, cap) for i, (src, cap) in enumerate(gallery) if src != hs]

    # ---------- portada ----------
    h = p['hero']
    if 'code' in h:
        cd = h['code']
        nums = ''.join(f'<span>{i + 1}</span>' for i in range(cd['src'].count('\n') + 1))
        media = (f'<div class="codewin">{HUD}<div class="codewin__bar"><i></i><i></i><i></i><span>{e(cd["file"])}</span></div>'
                 f'<pre class="codewin__body"><code class="codewin__nums" aria-hidden="true">{nums}</code><code>{highlight(cd["src"])}</code></pre>'
                 f'<span class="holo__scan" aria-hidden="true"></span></div>')
    elif 'video' in h:
        media = (f'<div class="device device--laptop"><div class="device__screen">'
                 f'<video src="{h["video"]}" poster="{h["poster"]}" autoplay muted loop playsinline aria-label="Demo de {e(p["name"])}"></video>'
                 f'</div><div class="device__base"></div></div>')
    else:
        light = ' is-light' if h.get('light') else ''
        media = (f'<div class="holo{light}">{HUD}<img src="{h["img"]}" alt="{e(h["alt"])}">'
                 f'<span class="holo__scan" aria-hidden="true"></span>'
                 f'<span class="holo__label">{e(p["name"].upper())} · {e(code)}</span></div>')
    tags = ''.join(f'<li>{e(x)}</li>' for x in p['tags'])
    facts = ''.join(f'<div class="telemetry__item">{bi("dt", "", k)}{bi("dd", "", v)}</div>' for k, v in p['facts'])

    links = ''.join(f'<a class="case-btn" href="{u}"{"" if u.endswith(".html") else " target=\"_blank\" rel=\"noopener\""} data-es="{e(l[0])}" data-en="{e(l[1])}">{e(l[0])}</a>' for l, u in p.get('links', []))
    if gallery:
        links += '<a class="case-btn" href="#galeria" data-es="Ver galería ↓" data-en="See gallery ↓">Ver galería ↓</a>'

    out = []
    out.append(f'''
        <section class="case-hero">
            {MOTIF[t['motif']]}
            <div class="case-hero__bar">
                <a class="case-back" href="proyectos.html?area={p['pillar']}" data-es="← Proyectos de {e(pill_es.lower())}" data-en="← {e(pill_en)} projects">← Proyectos de {e(pill_es.lower())}</a>
                <span class="case-hero__code"><i aria-hidden="true"></i><span data-es="ARCHIVO {code}" data-en="FILE {code}">ARCHIVO {code}</span></span>
            </div>
            <div class="case-hero__copy">
                {bi('p', 'case-kicker', p['kicker'])}
                <h1 class="case-title{' case-title--long' if len(p['title'][0]) > 14 else ''}">{e(p['title'][0])}</h1>
                {bi('p', 'case-tagline', p['tagline'])}
                <div class="case-hero__actions">
                    <a class="case-btn case-btn--primary" href="contacto.html?servicio={p['service']}" data-es="Quiero algo así" data-en="I want something like this">Quiero algo así</a>
                    {links}
                </div>
            </div>
            <figure class="case-hero__media">{media}</figure>
        </section>
        <section class="telemetry" aria-label="Ficha del proyecto">
            <dl class="telemetry__grid">{facts}</dl>
            <ul class="case-tags">{tags}</ul>
        </section>''')

    # ---------- misión: concepto o resumen, con una imagen grande ----------
    c = p.get('concept')
    title = c['title'] if c else ('La misión', 'The mission')
    quote = f'<blockquote class="case-quote">{bi("span", "", c["quote"])}</blockquote>' if c else ''
    paras = ''.join(bi('p', 'case-mission__text', x) for x in c['paras']) if c else ''
    # imagen de la misión: la indicada en los datos o la primera disponible
    if p.get('mission_img'):
        mi = next(i for i, (src, _) in enumerate(gallery) if src == p['mission_img'])
        mimg = (mi, gallery[mi][0], gallery[mi][1])
    else:
        mimg = pool.pop(0) if pool else None
    mfig = f'<figure class="case-mission__media reveal">{zoom(mimg[1], mimg[2], mimg[0])}</figure>' if mimg else ''
    out.append(f'''
        <section class="case-mission{' has-media' if mimg else ''}">
            <div class="case-mission__copy reveal">
                {bi('p', 'case-overline', ('// 01 · LA MISIÓN', '// 01 · THE MISSION'))}
                {bi('h2', 'case-h2', title)}
                {bi('p', 'case-mission__lead', p['summary'])}
                {quote}
                {paras}
            </div>
            {mfig}
        </section>''')

    # ---------- franjas: imagen grande + texto corto ----------
    rows, rest = [], []
    for i, b in enumerate(p['blocks']):
        lis = ''.join(bi('li', '', x) for x in b['items'][:5])
        txt = f'{bi("h3", "case-row__title", b["title"])}<ul class="case-list">{lis}</ul>'
        if pool and not ev:
            gi, src, cap = pool.pop(0)
            rows.append(f'<article class="case-row"><div class="case-row__media reveal">{zoom(src, cap, gi)}</div><div class="case-row__copy reveal"><span class="case-row__num">0{len(rows) + 2}</span>{txt}</div></article>')
        else:
            rest.append(f'<article class="case-panel reveal">{HUD}{txt}</article>')
    panels = f'<div class="case-panels case-panels--{len(rest)}">{"".join(rest)}</div>' if rest else ''
    out.append(f'''
        <section class="case-section case-build">
            {bi('p', 'case-overline', ('// QUÉ SE CONSTRUYÓ', '// WHAT WAS BUILT'))}
            {''.join(rows)}
            {panels}
        </section>''')

    # ---------- secciones de texto desarrollado: tarjetas o declaraciones ----------
    for sec in p.get('sections', []):
        if sec['kind'] == 'pair':
            items = ''.join(f'<article class="statement reveal">{HUD}{bi("h3", "statement__title", t)}{bi("p", "statement__text", x)}</article>' for t, x in sec['items'])
        else:
            items = ''.join(f'<article class="scope reveal"><span class="scope__num">{i + 1:02d}</span>{bi("h3", "scope__title", t)}{bi("p", "scope__text", x)}</article>' for i, (t, x) in enumerate(sec['items']))
        intro = bi('p', 'section-intro', sec['intro']) if sec.get('intro') else ''
        out.append(f'''
        <section class="case-section">
            {bi('p', 'case-overline', sec['over'])}
            {bi('h2', 'case-h2', sec['title'])}
            {intro}
            <div class="{sec['kind']}-grid">{items}</div>
        </section>''')

    if p.get('challenges'):
        ch = ''.join(f'<article class="case-panel case-panel--alt reveal">{HUD}{bi("h3", "case-row__title", a)}{bi("p", "case-panel__text", b)}</article>' for a, b in p['challenges'])
        out.append(f'''
        <section class="case-section">
            {bi('p', 'case-overline', ('// RETOS Y SOLUCIONES', '// CHALLENGES AND SOLUTIONS'))}
            <div class="case-panels case-panels--2">{ch}</div>
        </section>''')

    # ---------- terminal con la salida real ----------
    if p.get('terminal'):
        tm = p['terminal']
        body = '\n'.join(term_line(x) for x in tm['lines'])
        out.append(f'''
        <section class="case-section case-terminal">
            {bi('p', 'case-overline', tm['over'])}
            {bi('h2', 'case-h2', tm['title'])}
            <div class="term reveal">{HUD}<div class="term__bar"><i></i><i></i><i></i><span>{e(tm['shell'])}</span></div><pre class="term__body">{body}</pre></div>
            {bi('p', 'case-hint', tm['note']) if tm.get('note') else ''}
        </section>''')

    # ---------- galería deslizable ----------
    slides = ''.join(f'<li class="reel__slide"><button type="button" class="case-shot" data-full="{src}"><img src="{src}" alt="{e(cap[0])}" loading="lazy">{bi("span", "case-shot__cap", cap)}</button></li>' for src, cap in gallery)
    many = len(gallery) > 1
    nav = (f'<div class="reel__nav"><button type="button" class="reel__btn" data-dir="-1" data-es-label="Anterior" data-en-label="Previous" aria-label="Anterior">‹</button>'
           f'<span class="reel__count"><b>01</b> / {len(gallery):02d}</span>'
           f'<button type="button" class="reel__btn" data-dir="1" data-es-label="Siguiente" data-en-label="Next" aria-label="Siguiente">›</button></div>') if many else ''
    if ev:
        k, groups = 0, []
        for g in ev['groups']:
            title, desc, imgs = g[0], g[1], g[2]
            items = ''
            for src, cap in imgs:
                items += f'<li><button type="button" class="case-shot" data-full="{src}"><img src="{src}" alt="{e(cap[0])}" loading="lazy">{bi("span", "case-shot__cap", cap)}</button></li>'
                k += 1
            more = f'<a class="archive__link" href="{g[3]}" data-es="Ver el proyecto completo →" data-en="See the full project →">Ver el proyecto completo →</a>' if len(g) > 3 else ''
            groups.append(f'<article class="archive__group reveal"><header class="archive__head">{bi("h3", "archive__title", title)}<span class="archive__count">{len(imgs):02d}</span>{bi("p", "archive__desc", desc)}{more}</header><ul class="archive__grid">{items}</ul></article>')
        out.append(f'''
        <section class="case-section archive" id="galeria">
            {bi('p', 'case-overline', ('// ARCHIVO DE TRABAJOS', '// WORK ARCHIVE'))}
            {bi('h2', 'case-h2', ('Archivo de proyectos', 'Project archive'))}
            {bi('p', 'archive__note', ev['note'])}
            {''.join(groups)}
            {bi('p', 'case-hint', ('Toca una imagen para verla en pantalla completa.', 'Tap an image to see it full screen.'))}
        </section>''')
    elif gallery: out.append(f'''
        <section class="case-section case-gallery" id="galeria">
            <div class="case-gallery__head">
                <div>
                    {bi('p', 'case-overline', ('// GALERÍA', '// GALLERY'))}
                    {bi('h2', 'case-h2', ('El proyecto en imágenes', 'The project in pictures'))}
                </div>
                {nav}
            </div>
            <ul class="reel{' reel--single' if not many else ''}" tabindex="0" aria-label="Galería">{slides}</ul>
            {bi('p', 'case-hint', ('Toca una imagen para verla en pantalla completa.', 'Tap an image to see it full screen.'))}
        </section>''')

    if p.get('process'):
        st = ''.join(f'<li class="case-step reveal"><span class="case-step__num">0{i + 1}</span>{bi("h3", "case-step__title", a)}{bi("p", "case-step__text", b)}</li>' for i, (a, b) in enumerate(p['process']))
        out.append(f'''
        <section class="case-section">
            {bi('p', 'case-overline', ('// PROCESO', '// PROCESS'))}
            {bi('h2', 'case-h2', ('Cómo lo hice', 'How I did it'))}
            <ol class="case-steps">{st}</ol>
        </section>''')

    # ---------- sistema visual ----------
    if p.get('palette') or p.get('type'):
        sw = ''.join(f'<li><button type="button" class="swatch" data-hex="{hx}" style="--sw:{hx}"><span class="swatch__name" data-es="{e(es)}" data-en="{e(en)}">{e(es)}</span><span class="swatch__hex">{hx}</span></button></li>' for es, en, hx in p.get('palette', []))
        ty = ''.join(f'<div class="type-card reveal">{HUD}<p class="type-card__sample" style="font-family:{ff}">{e(sample)}</p><p class="type-card__alpha" style="font-family:{ff}">Aa Bb Cc 0123</p><p class="type-card__name">{e(name)}</p>{bi("p", "type-card__desc", d)}</div>' for name, ff, sample, d in p.get('type', []))
        out.append(f'''
        <section class="case-section case-brand">
            {bi('p', 'case-overline', ('// SISTEMA VISUAL', '// VISUAL SYSTEM'))}
            {bi('h2', 'case-h2', ('Color y tipografía', 'Color and typography'))}
            {('<ul class="case-palette reveal">' + sw + '</ul>' + bi('p', 'case-hint', ('Toca un color para copiar su código.', 'Tap a color to copy its code.'))) if sw else ''}
            {('<div class="case-type">' + ty + '</div>') if ty else ''}
        </section>''')

    # ---------- resultados, cierre y siguiente proyecto ----------
    res = ''.join(bi('li', '', x) for x in p['results'])
    out.append(f'''
        <section class="case-section case-results reveal">
            {HUD}
            <p class="case-results__status"><i aria-hidden="true"></i><span data-es="MISIÓN CUMPLIDA" data-en="MISSION ACCOMPLISHED">MISIÓN CUMPLIDA</span></p>
            {bi('h2', 'case-h2', ('Resultados e impacto', 'Results and impact'))}
            <ul class="case-results__list">{res}</ul>
        </section>

        <section class="case-cta reveal">
            {bi('p', 'case-cta__title', p['cta'][0])}
            {bi('p', 'case-cta__lead', p['cta'][1])}
            <div class="case-cta__actions">
                <a class="case-btn case-btn--primary" href="contacto.html?servicio={p['service']}" data-es="Pedir cotización" data-en="Request a quote">Pedir cotización</a>
                <a class="case-btn" href="servicios.html#{p['service']}" data-es="Ver el servicio" data-en="See the service">Ver el servicio</a>
            </div>
        </section>

        <nav class="case-next" aria-label="Más proyectos">
            <a class="case-next__card" href="{nxt['file']}" style="--next:{nxt['theme']['brand']};--next-bg:{nxt['theme']['bg']}">
                <img src="{hero_src(nxt)}" alt="" loading="lazy">
                <span class="case-next__body">
                    <span class="case-next__label" data-es="SIGUIENTE ARCHIVO →" data-en="NEXT FILE →">SIGUIENTE ARCHIVO →</span>
                    <b class="case-next__name" style="font-family:{nxt['theme']['display']}">{e(nxt['name'])}</b>
                    <span class="case-next__kicker" data-es="{e(nxt['kicker'][0])}" data-en="{e(nxt['kicker'][1])}">{e(nxt['kicker'][0])}</span>
                </span>
            </a>
            <div class="case-next__links">
                <a href="{prev['file']}"><span data-es="← Anterior:" data-en="← Previous:">← Anterior:</span> {e(prev['name'])}</a>
                <a href="proyectos.html" data-es="Todos los proyectos" data-en="All projects">Todos los proyectos</a>
            </div>
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
        html_out = page(p, PROJECTS[(i - 1) % n], PROJECTS[(i + 1) % n], i + 1, n)
        with open(os.path.join(ROOT, p['file']), 'w', encoding='utf-8') as f:
            f.write(html_out)
        print('✓', p['file'])
