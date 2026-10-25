/* ==========================================================
   AURA · HUD decorativo, menú móvil y navegación activa
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

    /* ---------- Menú móvil ---------- */
    const topbar = document.getElementById('auraTopbar');
    const menuBtn = document.getElementById('auraMenu');
    if (menuBtn && topbar) {
        menuBtn.addEventListener('click', () => {
            const open = topbar.classList.toggle('is-open');
            menuBtn.setAttribute('aria-expanded', String(open));
        });
        topbar.querySelectorAll('.aura-nav a').forEach((a) => a.addEventListener('click', () => {
            topbar.classList.remove('is-open');
            menuBtn.setAttribute('aria-expanded', 'false');
        }));
    }

    /* ---------- Enlace activo según la sección visible ---------- */
    const links = Array.from(document.querySelectorAll('.aura-nav a'));
    const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window && sections.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (!e.isIntersecting) return;
                links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach((s) => io.observe(s));
    }
})();
