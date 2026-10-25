/* ==========================================================
   PROYECTO · visor de imágenes de la galería y copiar colores
   ========================================================== */
(function () {
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

    /* ---------- Copiar código de color ---------- */
    document.querySelectorAll('.swatch').forEach((sw) => {
        sw.addEventListener('click', async () => {
            try { await navigator.clipboard.writeText(sw.dataset.hex); } catch (e) { /* sin permiso de portapapeles */ }
            sw.classList.add('is-copied');
            setTimeout(() => sw.classList.remove('is-copied'), 1600);
        });
    });
})();
