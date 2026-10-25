/* ==========================================================
   PROYECTOS (temporal) · filtra según el pilar de origen
   proyectos.html?area=code|ai|design|marketing
   Las categorías del diseño anterior son: web, design, programming.
   ========================================================== */
(function () {
    const area = new URLSearchParams(window.location.search).get('area');
    if (!area) return;

    // qué tarjetas mostrar para cada pilar
    const MATCH = {
        code: (cats) => cats.includes('web') || cats.includes('programming'),
        design: (cats) => cats.includes('design'),
        // MetalTec y Únicos incluyen marketing digital y redes sociales
        marketing: (cats) => cats.includes('design') && cats.includes('web')
    };
    const NAMES = {
        code: { es: 'Programación', en: 'Programming' },
        ai: { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
        design: { es: 'Diseño', en: 'Design' },
        marketing: { es: 'Marketing Digital', en: 'Digital Marketing' }
    };
    if (!NAMES[area]) return;

    const section = document.getElementById('proyectos');
    const filters = section && section.querySelector('.project-filters');
    if (!section) return;

    // aviso con el filtro activo y opción para ver todo
    const notice = document.createElement('p');
    notice.className = 'page-notice';
    const name = NAMES[area];
    const msg = MATCH[area]
        ? { es: `Mostrando proyectos del pilar ${name.es}. `, en: `Showing projects from the ${name.en} pillar. ` }
        : { es: 'Aún no hay proyectos de IA publicados aquí (AURA, esta asistente, es uno de ellos). Mostrando todos los proyectos. ', en: 'There are no AI projects published here yet (AURA, this assistant, is one of them). Showing all projects. ' };
    const text = document.createElement('span');
    text.setAttribute('data-es', msg.es);
    text.setAttribute('data-en', msg.en);
    text.textContent = document.documentElement.lang === 'en' ? msg.en : msg.es;
    const all = document.createElement('a');
    all.href = 'proyectos.html';
    all.setAttribute('data-es', 'Ver todos');
    all.setAttribute('data-en', 'See all');
    all.textContent = document.documentElement.lang === 'en' ? 'See all' : 'Ver todos';
    all.style.color = '#2bf5b0';
    notice.append(text, all);
    (filters || section.firstElementChild).insertAdjacentElement(filters ? 'beforebegin' : 'afterend', notice);

    if (!MATCH[area]) return;
    if (filters) filters.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    section.querySelectorAll('.project-card').forEach((card) => {
        const cats = (card.getAttribute('data-category') || '').split(' ');
        card.style.display = MATCH[area](cats) ? '' : 'none';
    });
})();
