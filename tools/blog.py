"""
Genera el blog: blog.html (índice) y una página por artículo.

Cada artículo es una lista de bloques bilingües. Para agregar uno, copia un
elemento de POSTS, cambia sus datos y ejecuta:

    python3 tools/blog.py

Tipos de bloque:
    ('h2', es, en)              subtítulo
    ('p', es, en)               párrafo
    ('ul', [(es, en), ...])     lista
    ('quote', es, en)           frase destacada
    ('img', src, (es, en))      imagen con pie
    ('tip', es, en)             recuadro de consejo
"""
import html
import os

V = '20261027i'  # versión de CSS/JS (evita caché vieja)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def e(s):
    return html.escape(s, quote=True)


def bi(tag, cls, pair, extra=''):
    es, en = pair
    c = f' class="{cls}"' if cls else ''
    return f'<{tag}{c}{extra} data-es="{e(es)}" data-en="{e(en)}">{e(es)}</{tag}>'


POSTS = [
    {
        'slug': 'blog-taller-ia-equipo-contable.html',
        'date': ('Octubre de 2026', 'October 2026'),
        'tag': ('IA · Formación', 'AI · Training'),
        'color': '#ff7a2f',
        'title': ('Cómo preparé un taller de IA generativa para un equipo contable',
                  'How I prepared a generative AI workshop for an accounting team'),
        'excerpt': ('Diagnóstico, protección de datos, ejercicios por nivel y seis agentes a la medida: lo que aprendí al capacitar al equipo de Intel Tax Outsourcing SAS en ChatGPT Work.',
                    'Assessment, data protection, level-based exercises and six custom agents: what I learned training the Intel Tax Outsourcing SAS team on ChatGPT Work.'),
        'cover': ('img/cases/taller-portada.webp', ('Portada del taller Inteligencia artificial para el ejercicio contable', 'Cover of the AI for accounting practice workshop')),
        'case': ('taller-ia.html', ('Ver el caso completo del taller', 'See the full workshop case study')),
        'service': ('servicios.html#workshops', ('Talleres de IA para tu equipo', 'AI workshops for your team')),
        'body': [
            ('p', 'El 29 de septiembre de 2026 dicté un taller virtual de dos horas para Intel Tax Outsourcing SAS, una firma de outsourcing contable y tributario que acababa de adoptar ChatGPT Work como herramienta corporativa. El reto era claro: de los ocho integrantes del equipo, cuatro ya usaban inteligencia artificial y cuatro todavía no la habían incorporado a su trabajo. Todos tenían que salir de la misma sesión con una base común.',
             'On September 29, 2026, I taught a two-hour online workshop for Intel Tax Outsourcing SAS, an accounting and tax outsourcing firm that had just adopted ChatGPT Work as a corporate tool. The challenge was clear: of the team\'s eight members, four already used artificial intelligence and four had not yet brought it into their work. Everyone had to leave the same session with a common foundation.'),
            ('p', 'Estas son las decisiones que más pesaron en el resultado.',
             'These are the decisions that shaped the result the most.'),
            ('h2', '1. Empezar por el diagnóstico, no por las diapositivas', '1. Start with an assessment, not with slides'),
            ('p', 'Antes de preparar cualquier material hablé con la firma para entender qué tareas consumían más tiempo, qué nivel tenía cada persona y qué les preocupaba de la IA. Con esa información armé una propuesta a la medida: un taller genérico de IA habría aburrido a la mitad del grupo y abrumado a la otra mitad.',
             'Before preparing any material, I spoke with the firm to understand which tasks took the most time, each person\'s level and what worried them about AI. With that information I put together a tailored proposal: a generic AI workshop would have bored half the group and overwhelmed the other half.'),
            ('h2', '2. La regla de oro: proteger la información del cliente', '2. The golden rule: protect client information'),
            ('p', 'Una firma contable maneja datos financieros y tributarios de terceros, así que la protección de la información no podía ser un tema más de la agenda: fue el eje del taller. Trabajamos la privacidad en un entorno corporativo y dejé lineamientos de uso para el periodo de prueba de la herramienta, de modo que el equipo supiera qué compartir con la IA, qué no y cómo revisar siempre lo que entrega.',
             'An accounting firm handles third parties\' financial and tax data, so information protection could not be just another agenda item: it was the backbone of the workshop. We covered privacy in a corporate environment, and I left usage guidelines for the tool\'s trial period, so the team knew what to share with the AI, what not to, and how to always review what it delivers.'),
            ('quote', 'La IA propone. El contador decide.', 'AI proposes. The accountant decides.'),
            ('h2', '3. Un mismo taller, dos niveles', '3. One workshop, two levels'),
            ('p', 'Para que nadie se quedara atrás ni se aburriera, los ejercicios se diferenciaron por nivel dentro de la misma sesión: quienes se iniciaban aprendían los fundamentos desde cero, y quienes ya usaban la herramienta profundizaban y sistematizaban sus buenas prácticas. Las explicaciones fueron breves y cada concepto se practicaba de inmediato con casos del día a día contable.',
             'So no one fell behind or got bored, exercises were split by level within the same session: beginners learned the fundamentals from scratch, while experienced users went deeper and systematized their good practices. Explanations were short, and each concept was practiced right away with everyday accounting cases.'),
            ('h2', '4. Prompts que funcionan y metaprompting', '4. Prompts that work, and metaprompting'),
            ('p', 'Gran parte del valor de la IA depende de cómo se le pide el trabajo. Practicamos la estructura de un buen prompt y una técnica que sorprende a muchos: el metaprompting, que consiste en pedirle a la propia IA que ayude a mejorar las instrucciones antes de ejecutar la tarea.',
             'Much of AI\'s value depends on how you ask for the work. We practiced the structure of a good prompt and a technique that surprises many people: metaprompting, which means asking the AI itself to help improve the instructions before carrying out the task.'),
            ('tip', 'Un buen prompt incluye cuatro cosas: el contexto (quién eres y para qué lo necesitas), la tarea concreta, el formato de la respuesta y los criterios para revisarla.',
             'A good prompt includes four things: the context (who you are and why you need it), the specific task, the response format and the criteria for reviewing it.'),
            ('h2', '5. Agentes a la medida de cada área', '5. Agents tailored to each area'),
            ('p', 'Como complemento diseñé seis GPTs personalizados, configurados con instrucciones específicas para las áreas de la firma. Así el equipo resuelve tareas frecuentes sin repetir el contexto en cada conversación, y la revisión final sigue siempre en manos del profesional.',
             'To complement the workshop, I designed six custom GPTs configured with specific instructions for the firm\'s areas. The team can now handle frequent tasks without repeating context in every conversation, and the final review always stays with the professional.'),
            ('img', 'img/cases/taller-agentes.webp', ('Los seis agentes INTEL diseñados para la firma', 'The six INTEL agents designed for the firm')),
            ('ul', [('Tributario: liquidaciones, conceptos y análisis de riesgo fiscal.', 'Tax: filings, opinions and fiscal risk analysis.'),
                    ('Cierre contable: listas de verificación, revisión de saldos y ajustes.', 'Accounting close: checklists, balance reviews and adjustments.'),
                    ('Nómina: novedades, liquidaciones y planilla de seguridad social.', 'Payroll: changes, settlements and social security filings.'),
                    ('Auditoría: diseño de pruebas, hallazgos y seguimiento.', 'Audit: test design, findings and follow-up.'),
                    ('Gerencial: indicadores, escenarios y capacidad del equipo.', 'Management: KPIs, scenarios and team capacity.'),
                    ('Prompt Maestro: ayuda a construir y mejorar las instrucciones para la IA.', 'Prompt Master: helps build and improve instructions for the AI.')]),
            ('h2', '6. Cerrar jugando', '6. End with a game'),
            ('p', 'La sesión terminó con una evaluación gamificada al estilo Kahoot. Además de medir lo aprendido, cambia la energía del grupo y deja los conceptos clave frescos en la memoria. El equipo valoró la sesión de forma muy positiva.',
             'The session ended with a Kahoot-style gamified assessment. Besides measuring what was learned, it lifts the group\'s energy and keeps the key concepts fresh. The team rated the session very positively.'),
            ('img', 'img/cases/taller-kahoot.webp', ('Evaluación final tipo Kahoot', 'Kahoot-style final assessment')),
            ('h2', 'Lo que me llevo', 'My takeaways'),
            ('ul', [('Un taller de IA funciona cuando parte de las tareas reales del equipo.', 'An AI workshop works when it starts from the team\'s real tasks.'),
                    ('En sectores con datos sensibles, la privacidad va primero, no al final.', 'In industries with sensitive data, privacy comes first, not last.'),
                    ('Diferenciar por nivel permite que todo el grupo avance en la misma sesión.', 'Splitting by level lets the whole group progress in the same session.'),
                    ('Los agentes a la medida convierten lo aprendido en una herramienta de uso diario.', 'Custom agents turn what was learned into an everyday tool.')]),
        ],
    },
    {
        'slug': 'blog-mockups-con-ia.html',
        'date': ('Octubre de 2026', 'October 2026'),
        'tag': ('Diseño · IA', 'Design · AI'),
        'color': '#7fa86e',
        'title': ('Mockups con IA: cómo muestro una marca antes de producirla',
                  'AI mockups: how I show a brand before it is produced'),
        'excerpt': ('Un logo sobre fondo blanco no vende una marca. Así uso la inteligencia artificial para que el cliente vea su identidad en cajas, frascos y hasta en una tienda, y decida con seguridad.',
                    'A logo on a white background does not sell a brand. This is how I use artificial intelligence so clients can see their identity on boxes, jars and even a storefront, and decide with confidence.'),
        'cover': ('img/cases/armonia-mesa.webp', ('Mockup de la línea de productos de Armonía', 'Mockup of the Armonía product line')),
        'case': ('armonia.html', ('Ver el caso completo de Armonía', 'See the full Armonía case study')),
        'service': ('servicios.html#branding', ('Identidad de marca para tu negocio', 'Brand identity for your business')),
        'body': [
            ('p', 'Cuando presento una identidad de marca, el cliente no necesita ver un logo sobre un fondo blanco: necesita imaginar su marca viva, en el estante, en la mano de su comprador o en la fachada de su tienda. Hasta hace poco, lograrlo significaba imprimir prototipos o recurrir a plantillas de mockup que todo el mundo ya ha visto. Hoy uso la inteligencia artificial para crear mockups a la medida de cada proyecto.',
             'When I present a brand identity, the client does not need to see a logo on a white background: they need to imagine their brand alive, on the shelf, in a buyer\'s hand or on their storefront. Until recently, that meant printing prototypes or using mockup templates everyone has already seen. Today I use artificial intelligence to create mockups tailored to each project.'),
            ('p', 'El mejor ejemplo es Armonía, una marca de aromáticas premium y accesible que diseñé a comienzos de 2026.',
             'The best example is Armonía, a premium yet affordable herbal tea brand I designed in early 2026.'),
            ('h2', 'El problema: decidir sin ver', 'The problem: deciding without seeing'),
            ('p', 'Un emprendimiento no siempre puede pagar la impresión de prototipos de cada pieza antes de aprobar su marca. Sin embargo, es justo en ese momento cuando más necesita certeza: elegir una identidad es una inversión que va a acompañarlo durante años.',
             'A small business cannot always pay to print prototypes of every piece before approving its brand. Yet that is exactly when it needs certainty the most: choosing an identity is an investment that will stay with it for years.'),
            ('h2', '1. Primero la identidad, después la IA', '1. Identity first, AI second'),
            ('p', 'La IA no diseña la marca. El concepto, el logotipo, la paleta y la tipografía nacen del encargo del cliente y del trabajo de diseño. En Armonía, el cliente solo tenía el nombre y buscaba una marca elegante, natural y económica; de ahí salió una A de la que brotan tallos y hojas, una paleta de verde bosque y crema, y una tipografía de inspiración clásica. Solo con ese sistema listo pasé a los mockups.',
             'AI does not design the brand. The concept, logo, palette and typography come from the client\'s brief and the design work. For Armonía, the client only had the name and wanted an elegant, natural and affordable brand; that led to an A sprouting stems and leaves, a forest green and cream palette, and a classic-inspired typeface. Only once that system was ready did I move on to the mockups.'),
            ('img', 'img/cases/armonia-identidad.webp', ('La identidad completa de Armonía', 'Armonía\'s complete identity')),
            ('h2', '2. Escenas pensadas para el negocio', '2. Scenes designed around the business'),
            ('p', 'Cada escena responde a una pregunta del cliente: ¿cómo se ve en una tienda?, ¿y en una reunión de empresa?, ¿y en la casa de un consumidor? Armonía quería venderse tanto a empresas como a personas del día a día, así que las escenas mostraron cajas, bolsas kraft, frascos, papelería con lacre, tarjetas, un momento de consumo con una taza y la fachada de una tienda.',
             'Each scene answers a client question: how does it look in a store? In a business meeting? In a consumer\'s home? Armonía wanted to sell both to companies and to everyday consumers, so the scenes showed boxes, kraft pouches, jars, stationery with a wax seal, business cards, a tea moment with a cup and a storefront.'),
            ('img', 'img/cases/armonia-fachada.webp', ('Mockup de la fachada de una tienda Armonía', 'Mockup of an Armonía storefront')),
            ('h2', '3. Revisar cada detalle', '3. Review every detail'),
            ('p', 'Una imagen generada puede verse espectacular y aun así tener errores. Por eso reviso cada mockup antes de presentarlo, con la misma exigencia que una pieza impresa.',
             'A generated image can look spectacular and still contain errors. That is why I review every mockup before presenting it, with the same standard as a printed piece.'),
            ('ul', [('Que el logotipo no se deforme ni cambie de proporciones.', 'That the logo is not distorted and keeps its proportions.'),
                    ('Que los colores coincidan con la paleta de la marca.', 'That the colors match the brand palette.'),
                    ('Que no aparezcan letras inventadas ni textos sin sentido.', 'That no invented letters or meaningless text appear.'),
                    ('Que materiales y escenarios sean coherentes con el precio y el público.', 'That materials and settings fit the price point and the audience.')]),
            ('h2', '4. Decidir con seguridad', '4. Decide with confidence'),
            ('p', 'Con los mockups, el cliente pudo ver su marca completa antes de invertir en producción y aprobarla con tranquilidad. Hoy Armonía usa su marca en sus productos, y el sistema quedó listo para sumar nuevos sabores.',
             'With the mockups, the client could see the complete brand before investing in production and approve it with peace of mind. Today Armonía uses its brand on its products, and the system is ready to add new flavors.'),
            ('tip', 'Transparencia ante todo: los mockups con IA son una visualización, no fotografías de productos reales. Siempre lo digo así al cliente y en mi portafolio, y no reemplazan la prueba de impresión final.',
             'Transparency first: AI mockups are a visualization, not photos of real products. I always say so to the client and in my portfolio, and they do not replace the final print proof.'),
            ('h2', 'Lo que me llevo', 'My takeaways'),
            ('ul', [('La IA acelera la presentación, pero la marca la define el diseño.', 'AI speeds up the presentation, but design defines the brand.'),
                    ('Las escenas deben responder a cómo y dónde se va a vender el producto.', 'Scenes should reflect how and where the product will be sold.'),
                    ('Revisar con lupa es lo que separa un mockup profesional de uno improvisado.', 'Close review is what separates a professional mockup from an improvised one.')]),
        ],
    },
]


def head(title, desc, css):
    return f'''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{e(title)}</title>
    <meta name="description" content="{e(desc)}">
    <meta name="theme-color" content="#020406">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Orbitron:wght@500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/aura.css?v={V}">
    <link rel="stylesheet" href="css/site.css?v={V}">
    <link rel="stylesheet" href="css/{css}?v={V}">
</head>
<body data-page="blog">
    <header class="site-header">
        <div class="aura-topbar" data-site-header></div>
    </header>
'''


FOOT = f'''
    <footer class="site-footer" data-site-footer></footer>

    <script src="js/aura/knowledge.js?v={V}"></script>
    <script src="js/bg.js?v={V}"></script>
    <script src="js/analytics.js?v={V}"></script>
    <script src="js/sfx.js?v={V}"></script>
    <script src="js/site.js?v={V}"></script>
    <script src="js/aura/assistant.js?v={V}"></script>
</body>
</html>
'''


def minutes(post):
    words = 0
    for b in post['body']:
        if b[0] in ('p', 'h2', 'quote', 'tip'):
            words += len(b[1].split())
        elif b[0] == 'ul':
            words += sum(len(es.split()) for es, _ in b[1])
    return max(1, round(words / 200))


def block(b):
    kind = b[0]
    if kind == 'h2':
        return bi('h2', 'post__h2', (b[1], b[2]))
    if kind == 'p':
        return bi('p', 'post__p', (b[1], b[2]))
    if kind == 'quote':
        return f'<blockquote class="post__quote">{bi("p", "", (b[1], b[2]))}</blockquote>'
    if kind == 'tip':
        return f'<aside class="post__tip" aria-label="Consejo">{bi("p", "", (b[1], b[2]))}</aside>'
    if kind == 'ul':
        return '<ul class="post__list">' + ''.join(bi('li', '', it) for it in b[1]) + '</ul>'
    if kind == 'img':
        src, cap = b[1], b[2]
        return f'<figure class="post__fig"><img src="{src}" alt="{e(cap[0])}" loading="lazy">{bi("figcaption", "", cap)}</figure>'
    raise ValueError(kind)


def article(post, i):
    mins = minutes(post)
    body = '\n            '.join(block(b) for b in post['body'])
    nxt = POSTS[(i + 1) % len(POSTS)]
    more = '' if nxt is post else f'''
        <a class="post-next" href="{nxt['slug']}">
            <span data-es="Siguiente artículo" data-en="Next article">Siguiente artículo</span>
            {bi('b', '', nxt['title'])}
        </a>'''
    return head(f"{post['title'][0]} · Sahar Chain", post['excerpt'][0], 'blog.css') + f'''
    <main class="page post" style="--post:{post['color']}">
        <article class="post__wrap">
            <a class="post__back" href="blog.html" data-es="← Volver al blog" data-en="← Back to the blog">← Volver al blog</a>
            <p class="post__meta">{bi('span', 'post__tag', post['tag'])} · {bi('span', '', post['date'])} · <span data-es="{mins} min de lectura" data-en="{mins} min read">{mins} min de lectura</span></p>
            {bi('h1', 'post__title', post['title'])}
            {bi('p', 'post__lead', post['excerpt'])}
            <p class="post__author">Sahar Chain · <span data-es="Programadora, desarrolladora web y diseñadora de marca" data-en="Programmer, web developer and brand designer">Programadora, desarrolladora web y diseñadora de marca</span></p>
            <figure class="post__cover"><img src="{post['cover'][0]}" alt="{e(post['cover'][1][0])}"></figure>
            {body}
            <div class="post__cta">
                <a class="aura-btn aura-btn--primary" href="{post['service'][0]}" data-es="{e(post['service'][1][0])}" data-en="{e(post['service'][1][1])}">{e(post['service'][1][0])}</a>
                <a class="aura-btn" href="{post['case'][0]}" data-es="{e(post['case'][1][0])}" data-en="{e(post['case'][1][1])}">{e(post['case'][1][0])}</a>
            </div>
        </article>{more}
    </main>
''' + FOOT


def index():
    cards = ''
    for post in POSTS:
        cards += f'''
            <a class="blog-card" href="{post['slug']}" style="--post:{post['color']}">
                <span class="blog-card__media"><img src="{post['cover'][0]}" alt="" loading="lazy"></span>
                <span class="blog-card__body">
                    <span class="blog-card__meta">{bi('span', '', post['tag'])} · <span data-es="{minutes(post)} min" data-en="{minutes(post)} min">{minutes(post)} min</span></span>
                    {bi('span', 'blog-card__title', post['title'])}
                    {bi('span', 'blog-card__text', post['excerpt'])}
                    <span class="blog-card__more" data-es="Leer artículo →" data-en="Read article →">Leer artículo →</span>
                </span>
            </a>'''
    return head('Blog · Sahar Chain', 'Artículos de Sahar Chain sobre inteligencia artificial, diseño de marca y desarrollo web, a partir de proyectos reales.', 'blog.css') + f'''
    <main class="page blog">
        <header class="blog__head">
            <p class="blog__overline" data-es="// BITÁCORA · 05" data-en="// LOG · 05">// BITÁCORA · 05</p>
            <h1 class="blog__title">Blog</h1>
            <p class="blog__lead" data-es="Lo que aprendo en cada proyecto, contado paso a paso: inteligencia artificial, diseño de marca y desarrollo web aplicados a negocios reales." data-en="What I learn on every project, step by step: artificial intelligence, brand design and web development applied to real businesses.">Lo que aprendo en cada proyecto, contado paso a paso: inteligencia artificial, diseño de marca y desarrollo web aplicados a negocios reales.</p>
        </header>
        <div class="blog__grid">{cards}
        </div>
    </main>
''' + FOOT


def main():
    for i, post in enumerate(POSTS):
        with open(os.path.join(ROOT, post['slug']), 'w', encoding='utf-8') as f:
            f.write(article(post, i))
        print('✓', post['slug'])
    with open(os.path.join(ROOT, 'blog.html'), 'w', encoding='utf-8') as f:
        f.write(index())
    print('✓ blog.html')


if __name__ == '__main__':
    main()
