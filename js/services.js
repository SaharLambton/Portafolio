/* ==========================================================
   SERVICIOS · selector "¿Qué necesitas lograr?", anclas y contadores
   ========================================================== */
(function () {
    const tabs = Array.from(document.querySelectorAll('.goal'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!tabs.length) return;

    function select(goal, { focus = false } = {}) {
        tabs.forEach((t) => {
            const on = t.dataset.goal === goal;
            t.setAttribute('aria-selected', String(on));
            t.tabIndex = on ? 0 : -1;
            if (on && focus) t.focus();
            const panel = document.getElementById(t.getAttribute('aria-controls'));
            if (panel) panel.hidden = !on;
        });
    }

    tabs.forEach((t, i) => {
        t.addEventListener('click', () => select(t.dataset.goal));
        // flechas del teclado para moverse entre pestañas
        t.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
            const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
            select(next.dataset.goal, { focus: true });
        });
    });

    /* ---------- Anclas: #code, #ai… abren su pilar; #workshops, #web… abren el pilar y resaltan el servicio ---------- */
    function fromHash() {
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (!id) return;
        const tab = tabs.find((t) => t.dataset.goal === id);
        if (tab) {
            select(id);
            document.getElementById('goalsTitle').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
            return;
        }
        const card = document.getElementById(id);
        const panel = card && card.closest('.goal-panel');
        if (panel) {
            select(panel.id.replace('panel-', ''));
            requestAnimationFrame(() => {
                card.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
                card.classList.add('is-highlight');
                setTimeout(() => card.classList.remove('is-highlight'), 2400);
            });
        }
    }
    window.addEventListener('hashchange', fromHash);
    fromHash();

    /* ---------- Contadores de resultados ---------- */
    const nums = document.querySelectorAll('.stat__num');
    function run(el) {
        const to = parseInt(el.dataset.to, 10);
        if (reducedMotion || to > 999) { el.textContent = to; return; }
        const start = performance.now();
        const dur = 1400;
        (function step(now) {
            const k = Math.min(1, (now - start) / dur);
            el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
            if (k < 1) requestAnimationFrame(step);
        })(start);
    }
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
        }, { threshold: 0.6 });
        nums.forEach((n) => { if (parseInt(n.dataset.to, 10) <= 999 && !reducedMotion) n.textContent = '0'; io.observe(n); });
    }
})();
