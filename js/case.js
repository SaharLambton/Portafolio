/* ==========================================================
   PROYECTO · galería deslizable, visor de imágenes, copiar colores
   y aparición de las secciones al hacer scroll
   ========================================================== */
(function () {
    // las secciones se ocultan para su entrada solo si este script corre
    document.documentElement.classList.add('case-js');

    /* ---------- Visor ---------- */
    const box = document.getElementById('caseLightbox');
    const shots = Array.from(document.querySelectorAll('.case-shot'));
    if (box && shots.length) {
        const img = box.querySelector('img');
        const cap = box.querySelector('figcaption');
        let index = 0;
        let lastFocus = null;

        function show(i) {
            index = (i + shots.length) % shots.length;
            const s = shots[index];
            img.src = s.dataset.full;
            img.alt = s.querySelector('img').alt;
            cap.textContent = s.querySelector('.case-shot__cap').textContent;
        }
        function open(i) {
            lastFocus = document.activeElement;
            show(i);
            box.hidden = false;
            document.body.style.overflow = 'hidden';
            box.querySelector('.case-lightbox__close').focus();
        }
        function close() {
            box.hidden = true;
            document.body.style.overflow = '';
            if (lastFocus) lastFocus.focus();
        }
        shots.forEach((s, i) => s.addEventListener('click', () => open(i)));
        // las imágenes grandes de la misión y las franjas abren su foto en el visor
        document.querySelectorAll('.case-zoom').forEach((z) => z.addEventListener('click', () => open(Number(z.dataset.index) || 0)));
        box.querySelector('.case-lightbox__close').addEventListener('click', close);
        box.querySelector('.case-lightbox__nav--prev').addEventListener('click', () => show(index - 1));
        box.querySelector('.case-lightbox__nav--next').addEventListener('click', () => show(index + 1));
        box.addEventListener('click', (e) => { if (e.target === box) close(); });
        document.addEventListener('keydown', (e) => {
            if (box.hidden) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') show(index - 1);
            if (e.key === 'ArrowRight') show(index + 1);
        });
        // si solo hay una imagen, no hacen falta flechas
        if (shots.length < 2) box.querySelectorAll('.case-lightbox__nav').forEach((b) => { b.hidden = true; });
    }

    /* ---------- Galería deslizable ---------- */
    const reel = document.querySelector('.reel');
    if (reel) {
        const slides = Array.from(reel.children);
        const count = document.querySelector('.reel__count b');
        const btns = document.querySelectorAll('.reel__btn');
        const current = () => {
            const x = reel.scrollLeft;
            let best = 0;
            const pad = parseFloat(getComputedStyle(reel).paddingLeft) || 0;
            slides.forEach((s, i) => { if (Math.abs(s.offsetLeft - pad - x) < Math.abs(slides[best].offsetLeft - pad - x)) best = i; });
            return best;
        };
        const update = () => {
            const i = current();
            if (count) count.textContent = String(i + 1).padStart(2, '0');
            const end = reel.scrollLeft + reel.clientWidth >= reel.scrollWidth - 4;
            btns.forEach((b) => { b.disabled = b.dataset.dir === '-1' ? reel.scrollLeft <= 4 : end; });
        };
        btns.forEach((b) => b.addEventListener('click', () => {
            const i = Math.max(0, Math.min(slides.length - 1, current() + Number(b.dataset.dir)));
            reel.scrollTo({ left: slides[i].offsetLeft - (parseFloat(getComputedStyle(reel).paddingLeft) || 0), behavior: 'smooth' });
        }));
        reel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const b = document.querySelector(`.reel__btn[data-dir="${e.key === 'ArrowRight' ? 1 : -1}"]`);
                if (b) b.click();
            }
        });
        let raf = 0;
        reel.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
        window.addEventListener('resize', update);
        update();
    }

    /* ---------- Aparición al hacer scroll ---------- */
    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        reveals.forEach((r) => r.classList.add('is-in'));
    } else {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach((r) => io.observe(r));
    }

    /* ---------- Copiar código de color ---------- */
    document.querySelectorAll('.swatch').forEach((sw) => {
        sw.addEventListener('click', async () => {
            try { await navigator.clipboard.writeText(sw.dataset.hex); } catch (e) { /* sin permiso de portapapeles */ }
            sw.classList.add('is-copied');
            setTimeout(() => sw.classList.remove('is-copied'), 1600);
        });
    });
})();
