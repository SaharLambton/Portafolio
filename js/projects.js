/* ==========================================================
   PROYECTOS · Bóveda holográfica
   Carrusel 3D de "archivos" + pantalla con el informe de misión.
   Los datos salen de AURA_KB.projects.
   URL: proyectos.html?area=code|ai|design|marketing&p=<id del proyecto>
   ========================================================== */
(function () {
    const KB = window.AURA_KB;
    const stage = document.getElementById('vaultStage');
    if (!KB || !stage) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const PILLARS = {
        code: { es: 'Programación', en: 'Programming', c: '#2bf5b0' },
        ai: { es: 'IA', en: 'AI', c: '#a970ff' },
        design: { es: 'Diseño', en: 'Design', c: '#ff5bd8' },
        marketing: { es: 'Marketing', en: 'Marketing', c: '#3ddcff' }
    };
    const T = {
        enter: { es: 'Entrar al proyecto →', en: 'Open project →' },
        repo: { es: 'Ver en GitHub ↗', en: 'View on GitHub ↗' },
        aura: { es: 'Conocer a AURA →', en: 'Meet AURA →' },
        done: { es: 'COMPLETADO', en: 'COMPLETED' },
        online: { es: 'EN LÍNEA', en: 'ONLINE' },
        file: { es: 'ARCHIVO', en: 'FILE' }
    };
    const GLYPH = { code: '</>', design: '✦', marketing: '↗' };

    const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'es');
    const tr = (o) => (o ? o[lang()] || o.es : '');
    const hexRgb = (h) => { const n = parseInt(h.replace('#', ''), 16); return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`; };
    const pad = (n) => String(n).padStart(2, '0');

    // texto bilingüe que el selector de idioma actualiza solo
    function setBi(el, obj) {
        el.setAttribute('data-es', obj.es);
        el.setAttribute('data-en', obj.en);
        el.textContent = tr(obj);
    }

    const all = KB.projects.slice();
    let list = all.slice();
    let index = 0;
    let area = 'all';

    /* ---------- Archivos del carrusel ---------- */
    function artFor(p, big) {
        const box = document.createElement('span');
        const main = p.pillars[0];
        box.className = 'art art--' + main + (big ? ' art--big' : '');
        if (main === 'ai') {
            box.innerHTML = '<i class="mini-orb" aria-hidden="true"><i class="mini-orb__ring"></i><i class="mini-orb__ring mini-orb__ring--b"></i><i class="mini-orb__core"></i></i>';
        } else {
            const g = document.createElement('b');
            g.textContent = GLYPH[main] || '◈';
            box.appendChild(g);
        }
        if (big) {
            const l = document.createElement('small');
            l.textContent = p.tech.join(' · ');
            box.appendChild(l);
        }
        return box;
    }

    const cartridges = all.map((p, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'cart';
        b.setAttribute('role', 'option');
        b.style.setProperty('--c', p.brand);
        b.style.setProperty('--c-rgb', hexRgb(p.brand));
        const thumb = document.createElement('span');
        thumb.className = 'cart__thumb';
        if (p.card) {
            const img = document.createElement('img');
            img.src = p.card;
            img.alt = '';
            img.loading = 'lazy';
            thumb.appendChild(img);
        } else {
            thumb.appendChild(artFor(p, false));
        }
        const code = document.createElement('span');
        code.className = 'cart__code';
        code.textContent = 'ARCH-' + pad(i + 1);
        const name = document.createElement('span');
        name.className = 'cart__name';
        name.textContent = p.name;
        const bar = document.createElement('span');
        bar.className = 'cart__bars';
        p.pillars.forEach((id) => {
            const dot = document.createElement('i');
            dot.style.background = PILLARS[id].c;
            bar.appendChild(dot);
        });
        b.append(thumb, code, name, bar);
        b.addEventListener('click', () => {
            const at = list.indexOf(p);
            if (at === index) document.getElementById('reportEnter').focus();
            else go(at);
        });
        stage.appendChild(b);
        return { p, el: b };
    });

    function layout() {
        const small = window.innerWidth < 700;
        const gap = small ? 118 : 170;
        cartridges.forEach(({ p, el }) => {
            const at = list.indexOf(p);
            if (at === -1) {
                el.hidden = true;
                return;
            }
            el.hidden = false;
            // distancia circular respecto al archivo activo
            let off = at - index;
            const n = list.length;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const abs = Math.abs(off);
            el.style.transform = `translateX(${off * gap}px) translateZ(${-abs * 140}px) rotateY(${off * -32}deg) scale(${abs === 0 ? 1.08 : 1})`;
            el.style.opacity = abs > 3 ? 0 : 1 - abs * 0.22;
            el.style.zIndex = String(100 - abs);
            el.style.pointerEvents = abs > 3 ? 'none' : '';
            el.classList.toggle('is-active', abs === 0);
            el.setAttribute('aria-selected', String(abs === 0));
            el.tabIndex = -1;
        });
    }

    /* ---------- Pantalla del informe ---------- */
    const R = {
        box: document.getElementById('vaultReport'),
        code: document.getElementById('reportCode'),
        status: document.getElementById('reportStatus'),
        screen: document.getElementById('reportScreen'),
        kind: document.getElementById('reportKind'),
        title: document.getElementById('reportTitle'),
        pillars: document.getElementById('reportPillars'),
        text: document.getElementById('reportText'),
        tech: document.getElementById('reportTech'),
        enter: document.getElementById('reportEnter'),
        ask: document.getElementById('reportAsk')
    };

    function render() {
        const p = list[index];
        if (!p) return;
        R.box.style.setProperty('--c', p.brand);
        R.box.style.setProperty('--c-rgb', hexRgb(p.brand));
        R.code.textContent = `${tr(T.file)} ${pad(all.indexOf(p) + 1)} / ${pad(all.length)}`;
        setBi(R.status, p.id === 'aura' ? T.online : T.done);
        // efecto de "nueva señal" en la pantalla
        R.box.classList.remove('is-switching');
        void R.box.offsetWidth;
        if (!reducedMotion) R.box.classList.add('is-switching');

        R.screen.innerHTML = '';
        if (p.video) {
            const v = document.createElement('video');
            v.src = p.video;
            v.muted = true;
            v.loop = true;
            v.playsInline = true;
            v.autoplay = !reducedMotion;
            if (p.card) v.poster = p.card;
            v.setAttribute('aria-hidden', 'true');
            R.screen.appendChild(v);
        } else if (p.card) {
            const img = document.createElement('img');
            img.src = p.card;
            img.alt = p.name;
            R.screen.appendChild(img);
        } else {
            R.screen.appendChild(artFor(p, true));
        }
        const scan = document.createElement('span');
        scan.className = 'report__scan';
        scan.setAttribute('aria-hidden', 'true');
        R.screen.appendChild(scan);

        setBi(R.kind, p.kind || { es: '', en: '' });
        R.title.textContent = p.name;
        R.pillars.innerHTML = '';
        p.pillars.forEach((id) => {
            const s = document.createElement('span');
            s.className = 'report__pillar';
            s.style.setProperty('--p', PILLARS[id].c);
            setBi(s, PILLARS[id]);
            R.pillars.appendChild(s);
        });
        setBi(R.text, p.short || p.desc);
        R.tech.innerHTML = '';
        p.tech.forEach((t) => {
            const li = document.createElement('li');
            li.textContent = t;
            R.tech.appendChild(li);
        });
        R.enter.href = p.url;
        if (p.external) { R.enter.target = '_blank'; R.enter.rel = 'noopener'; } else { R.enter.removeAttribute('target'); R.enter.removeAttribute('rel'); }
        setBi(R.enter, p.id === 'aura' ? T.aura : p.external ? T.repo : T.enter);
        R.ask.onclick = () => { if (window.AuraAsk) window.AuraAsk(p.name); };

        layout();
        syncUrl();
    }

    function go(i) {
        if (!list.length) return;
        index = (i + list.length) % list.length;
        render();
    }

    /* ---------- Frecuencias (filtros por pilar) ---------- */
    const freqs = Array.from(document.querySelectorAll('.freq'));
    document.querySelectorAll('[data-count]').forEach((b) => {
        const a = b.dataset.count;
        b.textContent = a === 'all' ? all.length : all.filter((p) => p.pillars.includes(a)).length;
    });

    function tune(a, { keep } = {}) {
        if (a !== 'all' && !PILLARS[a]) a = 'all';
        const current = list[index];
        area = a;
        list = a === 'all' ? all.slice() : all.filter((p) => p.pillars.includes(a));
        freqs.forEach((f) => {
            const on = f.dataset.area === a;
            f.classList.toggle('is-active', on);
            f.setAttribute('aria-pressed', String(on));
        });
        const keepAt = keep ? list.findIndex((p) => p.id === keep) : list.indexOf(current);
        index = keepAt >= 0 ? keepAt : 0;
        render();
        // AURA comenta la frecuencia una vez por visita
        const comments = KB.pages && KB.pages.projects && KB.pages.projects.filters;
        if (a !== 'all' && comments && comments[a]) {
            const say = () => window.AuraComment && window.AuraComment('filter-' + a, comments[a]);
            if (window.AuraComment) say(); else setTimeout(say, 2600);
        }
    }
    freqs.forEach((f) => f.addEventListener('click', () => tune(f.dataset.area)));

    function syncUrl() {
        const url = new URL(window.location.href);
        if (area === 'all') url.searchParams.delete('area'); else url.searchParams.set('area', area);
        if (list[index]) url.searchParams.set('p', list[index].id);
        history.replaceState(null, '', url);
    }

    /* ---------- Controles: flechas, teclado y deslizamiento ---------- */
    document.getElementById('vaultPrev').addEventListener('click', () => go(index - 1));
    document.getElementById('vaultNext').addEventListener('click', () => go(index + 1));
    stage.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
        if (e.key === 'Enter') R.enter.click();
    });
    let startX = null;
    stage.addEventListener('pointerdown', (e) => { startX = e.clientX; });
    stage.addEventListener('pointerup', (e) => {
        if (startX === null) return;
        const dx = e.clientX - startX;
        startX = null;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    });
    window.addEventListener('resize', layout);
    // el texto del informe usa el idioma activo
    document.querySelectorAll('.aura-lang button').forEach((b) => b.addEventListener('click', () => setTimeout(render, 0)));

    /* ---------- Inicio ---------- */
    const params = new URLSearchParams(window.location.search);
    const initial = params.get('area') || 'all';
    // si se llega desde un pilar, AURA comenta ese filtro en vez del saludo general
    if (initial !== 'all') window.AURA_SKIP_ENTER = true;
    tune(initial, { keep: params.get('p') });
})();
