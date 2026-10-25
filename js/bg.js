/* ==========================================================
   FONDO · Red de partículas holográficas para las pestañas internas
   Colores: variables CSS --fx-a y --fx-b del <body> (cada página puede
   definir los suyos; por defecto esmeralda y violeta).
   ========================================================== */
(function () {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = document.createElement('canvas');
    canvas.className = 'site-bg';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const css = getComputedStyle(document.body);
    const colA = (css.getPropertyValue('--fx-a') || '').trim() || '#2bf5b0';
    const colB = (css.getPropertyValue('--fx-b') || '').trim() || '#8b5cf6';

    function hexToRgb(hex) {
        const h = hex.replace('#', '');
        const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    const A = hexToRgb(colA);
    const B = hexToRgb(colB);
    const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    let W = 0, H = 0, dpr = 1, points = [], pulses = [];
    const mouse = { x: -9999, y: -9999 };
    const LINK = 140;

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.round(Math.min(110, Math.max(36, (W * H) / 15000)));
        points = Array.from({ length: count }, (_, i) => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.22,
            vy: (Math.random() - 0.5) * 0.22,
            r: 0.8 + Math.random() * 1.8,
            c: i % 3 === 0 ? B : A,
            tw: Math.random() * Math.PI * 2
        }));
        pulses = [];
    }

    function draw(t) {
        ctx.clearRect(0, 0, W, H);
        // movimiento + leve repulsión del cursor
        for (const p of points) {
            if (!reducedMotion) {
                const dx = p.x - mouse.x, dy = p.y - mouse.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < 22000) {
                    const f = (1 - d2 / 22000) * 0.6;
                    p.x += (dx / Math.sqrt(d2 + 1)) * f;
                    p.y += (dy / Math.sqrt(d2 + 1)) * f;
                }
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
                if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;
            }
        }
        // conexiones
        ctx.lineWidth = 0.7;
        for (let i = 0; i < points.length; i++) {
            const a = points[i];
            for (let j = i + 1; j < points.length; j++) {
                const b = points[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < LINK) {
                    const alpha = (1 - d / LINK) * 0.22;
                    ctx.strokeStyle = rgba(a.c === b.c ? a.c : A, alpha);
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                    // de vez en cuando nace un pulso de datos en esta conexión
                    if (!reducedMotion && pulses.length < 14 && Math.random() < 0.0009) pulses.push({ a, b, p: 0, c: Math.random() < 0.5 ? A : B });
                }
            }
        }
        // pulsos viajando por las conexiones
        pulses = pulses.filter((pl) => pl.p <= 1);
        for (const pl of pulses) {
            const x = pl.a.x + (pl.b.x - pl.a.x) * pl.p;
            const y = pl.a.y + (pl.b.y - pl.a.y) * pl.p;
            const g = ctx.createRadialGradient(x, y, 0, x, y, 8);
            g.addColorStop(0, rgba(pl.c, 0.9));
            g.addColorStop(1, rgba(pl.c, 0));
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
            pl.p += 0.012;
        }
        // nodos con brillo
        for (const p of points) {
            const tw = reducedMotion ? 0.7 : 0.55 + 0.45 * Math.sin(t * 0.0015 + p.tw);
            ctx.fillStyle = rgba(p.c, 0.35 + 0.5 * tw);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            if (p.r > 2.1) {
                ctx.fillStyle = rgba(p.c, 0.08 * tw);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    let last = 0;
    function loop(t) {
        requestAnimationFrame(loop);
        if (document.hidden || t - last < 30) return;
        last = t;
        draw(t);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    window.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
    if (reducedMotion) draw(0); else requestAnimationFrame(loop);
})();
