/* ==========================================================
   SOBRE MÍ · línea de tiempo que se "carga" y foto con inclinación
   ========================================================== */
(function () {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Línea de tiempo ---------- */
    const timeline = document.querySelector('.timeline');
    const items = Array.from(document.querySelectorAll('.tl-item'));
    if ('IntersectionObserver' in window && !reducedMotion) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        items.forEach((i) => io.observe(i));
    } else {
        items.forEach((i) => i.classList.add('is-in'));
    }

    // el eje se llena a medida que se recorre la sección
    function progress() {
        if (!timeline) return;
        const r = timeline.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.7 - r.top) / r.height));
        timeline.style.setProperty('--progress', reducedMotion ? 1 : p.toFixed(3));
    }
    progress();
    window.addEventListener('scroll', progress, { passive: true });
    window.addEventListener('resize', progress);

    /* ---------- Foto: inclinación sutil con el cursor ---------- */
    const photo = document.getElementById('holoPhoto');
    const frame = photo && photo.querySelector('.holo-photo__frame');
    if (frame && !reducedMotion && window.matchMedia('(hover: hover)').matches) {
        photo.addEventListener('pointermove', (e) => {
            const r = frame.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            frame.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
        });
        photo.addEventListener('pointerleave', () => { frame.style.transform = ''; });
    }
})();
