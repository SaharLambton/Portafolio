/* ==========================================================
   ANALÍTICA · GoatCounter (sin cookies ni datos personales)
   Para activarla, crea una cuenta en https://www.goatcounter.com
   y escribe abajo el código que elegiste (lo que va antes de
   .goatcounter.com). Mientras esté vacío no se envía nada.
   ========================================================== */
(function () {
    const GOATCOUNTER_CODE = '';

    // en local o sin código no se cuenta nada
    const local = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname) || location.protocol === 'file:';
    const queue = [];
    let ready = false;

    // registra un evento (p. ej. 'descarga-cv'); si el script aún no carga, queda en cola
    function track(name, title) {
        if (!GOATCOUNTER_CODE || local) return;
        const ev = { path: name, title: title || name, event: true };
        if (ready && window.goatcounter && window.goatcounter.count) window.goatcounter.count(ev);
        else queue.push(ev);
    }
    window.track = track;

    if (!GOATCOUNTER_CODE || local) return;

    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://gc.zgo.at/count.js';
    s.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
    s.onload = () => {
        ready = true;
        while (queue.length) window.goatcounter.count(queue.shift());
    };
    document.head.appendChild(s);

    /* ---------- Eventos que importan ---------- */
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href]');
        if (!a) return;
        const href = a.getAttribute('href');
        if (a.hasAttribute('download') || /\.pdf$/i.test(href)) track('descarga-cv', 'Descarga del CV');
        else if (href.includes('wa.me')) track('whatsapp', 'Clic en WhatsApp');
        else if (href.startsWith('mailto:')) track('email', 'Clic en correo');
        else if (href.includes('linkedin.com')) track('linkedin', 'Clic en LinkedIn');
        else if (href.includes('github.com')) track('github', 'Clic en GitHub');
    }, true);
})();
