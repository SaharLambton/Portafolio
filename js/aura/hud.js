/* ==========================================================
   AURA · HUD decorativo del hero (reloj y flujo de datos)
   ========================================================== */
(function () {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Reloj ---------- */
    const clock = document.getElementById('auraClock');
    function tick() {
        if (clock) clock.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
    }
    tick();
    setInterval(tick, 1000);

    /* ---------- Flujo de datos ---------- */
    const stream = document.getElementById('auraStream');
    const words = ['SYNC', 'NODE', 'CORE', 'LINK', 'UI', 'API', 'SQL', 'NET', 'TS', 'CSS', 'BRAND', 'IOT'];
    function line() {
        const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase();
        const w = words[Math.floor(Math.random() * words.length)];
        return `0x${hex} ${w.padEnd(5, '.')} ${(Math.random() * 99).toFixed(2)}`;
    }
    if (stream) {
        for (let i = 0; i < 4; i++) {
            const s = document.createElement('span');
            s.textContent = line();
            stream.appendChild(s);
        }
        if (!reducedMotion) {
            setInterval(() => {
                if (document.hidden) return;
                const s = document.createElement('span');
                s.textContent = line();
                stream.appendChild(s);
                if (stream.children.length > 4) stream.removeChild(stream.firstChild);
            }, 650);
        }
    }

    /* ---------- Stack load: % de proyectos por pilar, calculado con knowledge.js ---------- */
    const KB = window.AURA_KB;
    const stack = document.getElementById('hudStack');
    if (KB && KB.projects && stack) {
        const P = KB.projects;
        const share = (test) => Math.round(100 * P.filter(test).length / P.length);
        const has = (...ids) => (p) => p.pillars.some((x) => ids.includes(x));
        const rows = [
            ['DESARROLLO', share(has('web', 'code'))],
            ['DISEÑO', share(has('design'))],
            ['MARKETING', share(has('marketing'))],
            ['IA', share(has('ai'))]
        ];
        stack.innerHTML = rows.map(([k, v]) => `<div class="aura-panel__row"><span>${k}</span><b data-to="${v}">0</b></div><div class="aura-meter"><i style="--v:0%" data-v="${v}"></i></div>`).join('');
        const projects = document.getElementById('hudProjects');
        if (projects) projects.textContent = P.length;
        const tech = document.getElementById('hudTech');
        if (tech && KB.tech) tech.textContent = new Set(Object.values(KB.tech.known)).size;
        // las barras se llenan y los números cuentan cuando aparece el HUD
        const fill = () => {
            stack.querySelectorAll('.aura-meter i').forEach((i) => { i.style.transition = 'width 1.4s cubic-bezier(.2,.8,.2,1)'; i.style.setProperty('--v', i.dataset.v + '%'); });
            stack.querySelectorAll('b[data-to]').forEach((b) => {
                const to = Number(b.dataset.to);
                if (reducedMotion) { b.textContent = to; return; }
                const t0 = performance.now();
                const step = (now) => { const k = Math.min(1, (now - t0) / 1400); b.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
                requestAnimationFrame(step);
            });
        };
        const root = document.documentElement;
        if (root.classList.contains('aura-ready')) setTimeout(fill, 400);
        else new MutationObserver((m, o) => { if (root.classList.contains('aura-ready')) { o.disconnect(); setTimeout(fill, 700); } }).observe(root, { attributes: true, attributeFilter: ['class'] });
    }

    /* ---------- Barra superior: se queda fija al bajar ---------- */
    const bar = document.getElementById('auraTopbar');
    const hero = document.getElementById('inicio');
    if (bar && hero) {
        // un espacio del mismo alto evita que el hero salte cuando la barra sale del flujo
        const spacer = document.createElement('div');
        spacer.className = 'aura-topbar-spacer';
        spacer.style.gridRow = '1';
        spacer.hidden = true;
        bar.after(spacer);
        let floating = false;
        const update = () => {
            const want = window.scrollY > bar.offsetHeight + 80;
            if (want === floating) return;
            floating = want;
            if (want) { spacer.style.height = bar.offsetHeight + 'px'; spacer.hidden = false; }
            bar.classList.toggle('is-floating', want);
            // el hero aísla su contenido: sube de capa para que la barra fija quede encima del resto
            hero.classList.toggle('has-floating-bar', want);
            if (!want) spacer.hidden = true;
        };
        window.addEventListener('scroll', update, { passive: true });
        update();
    }
})();
