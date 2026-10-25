/* ==========================================================
   PROYECTOS · tarjetas generadas desde AURA_KB.projects
   Filtros por pilar: proyectos.html?area=code|ai|design|marketing
   ========================================================== */
(function () {
    const KB = window.AURA_KB;
    const grid = document.getElementById('projectGrid');
    if (!KB || !grid) return;

    const PILLARS = {
        code: { es: 'Programación', en: 'Programming' },
        ai: { es: 'IA', en: 'AI' },
        design: { es: 'Diseño', en: 'Design' },
        marketing: { es: 'Marketing', en: 'Marketing' }
    };
    const SERVICE_LINE = {
        code: { es: '¿Necesitas un sitio web o un sistema a medida?', en: 'Need a website or a custom system?' },
        ai: { es: '¿Quieres automatizar procesos o tener un asistente como AURA?', en: 'Want to automate processes or have an assistant like AURA?' },
        design: { es: '¿Necesitas una identidad visual para tu marca?', en: 'Need a visual identity for your brand?' },
        marketing: { es: '¿Quieres hacer crecer tu marca en digital?', en: 'Want to grow your brand online?' }
    };
    const CTA = {
        page: { es: 'Ver proyecto →', en: 'View project →' },
        repo: { es: 'Ver en GitHub ↗', en: 'View on GitHub ↗' },
        here: { es: 'Hablar con AURA →', en: 'Talk to AURA →' },
        services: { es: 'Ver servicios →', en: 'See services →' }
    };
    const GLYPH = { code: '</>', ai: '', design: '✦', marketing: '↗' };

    let lang = 'es';
    try { lang = localStorage.getItem('aura-lang') === 'en' ? 'en' : 'es'; } catch (e) { /* sin almacenamiento */ }

    // crea un elemento con texto bilingüe (el selector de idioma lo actualiza solo)
    function bi(tag, cls, obj) {
        const el = document.createElement(tag);
        if (cls) el.className = cls;
        el.setAttribute('data-es', obj.es);
        el.setAttribute('data-en', obj.en);
        el.textContent = obj[lang] || obj.es;
        return el;
    }

    function media(p) {
        const box = document.createElement('span');
        box.className = 'pcard__media';
        if (p.video) {
            const v = document.createElement('video');
            v.src = p.video;
            v.muted = true;
            v.loop = true;
            v.playsInline = true;
            v.preload = 'none';
            if (p.card) v.poster = p.card;
            v.setAttribute('aria-hidden', 'true');
            box.appendChild(v);
        } else if (p.card) {
            const img = document.createElement('img');
            img.src = p.card;
            img.alt = '';
            img.loading = 'lazy';
            box.appendChild(img);
        } else {
            // sin imagen: gráfico generado con el nombre del proyecto
            const main = p.pillars[0];
            box.classList.add('pcard__media--art', 'pcard__media--' + main);
            const glyph = document.createElement('span');
            glyph.className = 'pcard__glyph';
            if (main === 'ai') glyph.innerHTML = '<i class="mini-orb" aria-hidden="true"><i class="mini-orb__ring"></i><i class="mini-orb__ring mini-orb__ring--b"></i><i class="mini-orb__core"></i></i>';
            else glyph.textContent = GLYPH[main] || '◈';
            const label = document.createElement('span');
            label.className = 'pcard__art-label';
            label.textContent = p.tech.join(' · ');
            box.append(glyph, label);
        }
        return box;
    }

    function card(p, i) {
        const a = document.createElement('a');
        a.className = 'pcard pcard--' + p.pillars[0];
        a.href = p.url;
        a.dataset.pillars = p.pillars.join(' ');
        a.style.setProperty('--i', i);
        if (p.external) { a.target = '_blank'; a.rel = 'noopener'; }

        const body = document.createElement('span');
        body.className = 'pcard__body';
        const tags = document.createElement('span');
        tags.className = 'pcard__pillars';
        p.pillars.forEach((id) => {
            const t = bi('span', 'pcard__pillar pcard__pillar--' + id, PILLARS[id]);
            tags.appendChild(t);
        });
        const title = document.createElement('span');
        title.className = 'pcard__title';
        title.textContent = p.name;
        const text = bi('span', 'pcard__text', p.short || p.desc);
        const tech = document.createElement('span');
        tech.className = 'pcard__tech';
        tech.textContent = p.tech.join(' · ');
        const cta = bi('span', 'pcard__cta', p.id === 'aura' ? CTA.here : p.external ? CTA.repo : CTA.page);
        body.append(tags, title, text, tech, cta);
        a.append(media(p), body);
        return a;
    }

    KB.projects.forEach((p, i) => grid.appendChild(card(p, i)));

    /* ---------- Contadores ---------- */
    document.querySelectorAll('[data-count]').forEach((b) => {
        const area = b.dataset.count;
        b.textContent = area === 'all' ? KB.projects.length : KB.projects.filter((p) => p.pillars.includes(area)).length;
    });

    /* ---------- Filtros ---------- */
    const buttons = Array.from(document.querySelectorAll('.pfilter'));
    const service = document.getElementById('projectService');

    function apply(area, { fromUser = false } = {}) {
        if (area !== 'all' && !PILLARS[area]) area = 'all';
        buttons.forEach((b) => {
            const on = b.dataset.area === area;
            b.classList.toggle('is-active', on);
            b.setAttribute('aria-pressed', String(on));
        });
        grid.querySelectorAll('.pcard').forEach((c) => {
            const show = area === 'all' || c.dataset.pillars.split(' ').includes(area);
            c.hidden = !show;
        });
        // línea hacia los servicios de esa área
        service.innerHTML = '';
        service.hidden = area === 'all';
        if (area !== 'all') {
            service.appendChild(bi('span', '', SERVICE_LINE[area]));
            service.appendChild(document.createTextNode(' '));
            const link = bi('a', '', CTA.services);
            link.href = 'servicios.html#' + area;
            service.appendChild(link);
            service.className = 'projects-service projects-service--' + area;
        }
        if (fromUser) {
            const url = new URL(window.location.href);
            if (area === 'all') url.searchParams.delete('area'); else url.searchParams.set('area', area);
            history.replaceState(null, '', url);
        }
        // AURA comenta el filtro una vez por visita
        const comments = KB.pages && KB.pages.projects && KB.pages.projects.filters;
        if (area !== 'all' && comments && comments[area]) {
            const say = () => window.AuraComment && window.AuraComment('filter-' + area, comments[area]);
            if (window.AuraComment) say(); else setTimeout(say, 2600);
        }
    }

    buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.area, { fromUser: true })));
    const initial = new URLSearchParams(window.location.search).get('area') || 'all';
    // si se llega desde un pilar, AURA comenta ese filtro en vez del saludo general
    if (initial !== 'all') window.AURA_SKIP_ENTER = true;
    apply(initial);

    /* ---------- Videos: solo se reproducen mientras se ven ---------- */
    const videos = grid.querySelectorAll('video');
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) { e.target.preload = 'auto'; e.target.play().catch(() => {}); } else { e.target.pause(); }
            });
        }, { threshold: 0.4 });
        videos.forEach((v) => io.observe(v));
    }
})();
