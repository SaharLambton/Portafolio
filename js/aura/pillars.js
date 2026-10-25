/* ==========================================================
   PILARES · apertura, aparición y efectos internos
   ========================================================== */
(function () {
    const section = document.getElementById('pilares');
    if (!section) return;
    const pillars = Array.from(section.querySelectorAll('.pillar'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ---------- Abrir / cerrar ---------- */
    function setOpen(pillar, open) {
        pillar.classList.toggle('is-open', open);
        pillar.setAttribute('aria-expanded', String(open));
    }
    function openOnly(pillar) {
        pillars.forEach((p) => setOpen(p, p === pillar));
    }

    pillars.forEach((pillar) => {
        if (canHover) {
            pillar.addEventListener('mouseenter', () => openOnly(pillar));
            pillar.addEventListener('mouseleave', () => setOpen(pillar, false));
        }
        pillar.addEventListener('focusin', () => openOnly(pillar));
        pillar.addEventListener('focusout', (e) => {
            if (!pillar.contains(e.relatedTarget)) setOpen(pillar, false);
        });
        // toque en pantallas táctiles
        pillar.addEventListener('click', (e) => {
            if (canHover || e.target.closest('.pillar__panel')) return;
            const open = !pillar.classList.contains('is-open');
            if (open) openOnly(pillar); else setOpen(pillar, false);
        });
        pillar.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { setOpen(pillar, false); pillar.blur(); }
        });
    });

    /* ---------- "Preguntar a AURA" ---------- */
    section.querySelectorAll('.pillar__ask').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
            const q = btn.getAttribute('data-ask-' + lang);
            if (window.AuraAsk) window.AuraAsk(q, btn.dataset.intent);
        });
    });

    /* ---------- Aparición al hacer scroll ---------- */
    let inView = false;
    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                inView = e.isIntersecting;
                if (e.isIntersecting) section.classList.add('is-visible');
            });
        }, { threshold: 0.2 }).observe(section);

        // En táctil, el pilar que pasa por el centro de la pantalla se abre solo
        if (!canHover) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) openOnly(e.target);
                    else setOpen(e.target, false);
                });
            }, { rootMargin: '-42% 0px -42% 0px' });
            pillars.forEach((p) => io.observe(p));
        }
    } else {
        section.classList.add('is-visible');
        inView = true;
    }

    /* ---------- Efectos internos (canvas 2D) ---------- */
    const fx = pillars.map((pillar) => {
        const canvas = pillar.querySelector('.pillar__fx');
        const ctx = canvas.getContext('2d');
        const color = getComputedStyle(pillar).getPropertyValue('--c').trim() || '#2bf5b0';
        const color2 = getComputedStyle(pillar).getPropertyValue('--c2').trim() || '#8b5cf6';
        return { pillar, canvas, ctx, color, color2, type: pillar.dataset.pillar, w: 0, h: 0, state: null };
    });

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        fx.forEach((f) => {
            const r = f.canvas.getBoundingClientRect();
            f.w = Math.max(1, r.width);
            f.h = Math.max(1, r.height);
            f.canvas.width = Math.round(f.w * dpr);
            f.canvas.height = Math.round(f.h * dpr);
            f.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            f.state = init(f);
        });
    }

    function init(f) {
        if (f.type === 'code') {
            const size = 11;
            const cols = Math.ceil(f.w / size);
            return { size, drops: Array.from({ length: cols }, () => Math.random() * -f.h / size), speed: Array.from({ length: cols }, () => 0.25 + Math.random() * 0.5) };
        }
        if (f.type === 'ai') {
            const layers = 4;
            const nodes = [];
            for (let l = 0; l < layers; l++) {
                const count = l === 0 || l === layers - 1 ? 4 : 6;
                for (let i = 0; i < count; i++) {
                    nodes.push({ l, x: f.w * (0.2 + 0.6 * (i + 0.5) / count) + (Math.random() - 0.5) * 6, y: f.h * (0.14 + 0.72 * l / (layers - 1)) + (Math.random() - 0.5) * 18 });
                }
            }
            const edges = [];
            nodes.forEach((a, ai) => nodes.forEach((b, bi) => { if (b.l === a.l + 1 && Math.random() < 0.7) edges.push([ai, bi]); }));
            return { nodes, edges, pulses: [] };
        }
        if (f.type === 'marketing') {
            return { bubbles: Array.from({ length: 14 }, () => ({ x: Math.random() * f.w, y: Math.random() * f.h, r: 1.5 + Math.random() * 3.5, v: 0.3 + Math.random() * 0.7 })) };
        }
        return { t: 0 };
    }

    function drawCode(f, t, open) {
        const { ctx, w, h, state } = f;
        ctx.fillStyle = 'rgba(2, 4, 6, 0.18)';
        ctx.fillRect(0, 0, w, h);
        ctx.font = `${state.size}px "JetBrains Mono", monospace`;
        const k = open ? 1.8 : 1;
        state.drops.forEach((y, i) => {
            const ch = Math.random() < 0.82 ? (Math.random() < 0.5 ? '0' : '1') : '{}<>/;=()'[Math.floor(Math.random() * 9)];
            const py = y * state.size;
            ctx.fillStyle = Math.random() < 0.06 ? '#eafff7' : f.color;
            ctx.globalAlpha = 0.5 + Math.random() * 0.5;
            ctx.fillText(ch, i * state.size, py);
            state.drops[i] += state.speed[i] * k;
            if (py > h && Math.random() > 0.96) state.drops[i] = Math.random() * -10;
        });
        ctx.globalAlpha = 1;
    }

    function drawAI(f, t, open) {
        const { ctx, w, h, state } = f;
        ctx.clearRect(0, 0, w, h);
        ctx.lineWidth = 0.7;
        state.edges.forEach(([a, b]) => {
            const A = state.nodes[a], B = state.nodes[b];
            ctx.strokeStyle = f.color;
            ctx.globalAlpha = open ? 0.35 : 0.18;
            ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
        });
        if (Math.random() < (open ? 0.35 : 0.12)) {
            const e = state.edges[Math.floor(Math.random() * state.edges.length)];
            if (e) state.pulses.push({ e, p: 0 });
        }
        state.pulses = state.pulses.filter((pl) => pl.p <= 1);
        state.pulses.forEach((pl) => {
            const A = state.nodes[pl.e[0]], B = state.nodes[pl.e[1]];
            const x = A.x + (B.x - A.x) * pl.p, y = A.y + (B.y - A.y) * pl.p;
            ctx.globalAlpha = 1;
            ctx.fillStyle = f.color2;
            ctx.shadowColor = f.color2;
            ctx.shadowBlur = 8;
            ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2); ctx.fill();
            pl.p += open ? 0.03 : 0.015;
        });
        ctx.shadowBlur = 10;
        state.nodes.forEach((n, i) => {
            const pulse = 0.6 + 0.4 * Math.sin(t * 2 + i);
            ctx.globalAlpha = 0.5 + 0.5 * pulse;
            ctx.fillStyle = i % 3 === 0 ? f.color2 : f.color;
            ctx.shadowColor = ctx.fillStyle;
            ctx.beginPath(); ctx.arc(n.x, n.y, 2.4 + pulse, 0, Math.PI * 2); ctx.fill();
        });
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }

    function drawDesign(f, t, open) {
        const { ctx, w, h } = f;
        ctx.clearRect(0, 0, w, h);
        const cx = w / 2;
        ctx.lineWidth = 1;
        ctx.strokeStyle = f.color;
        // retícula
        ctx.globalAlpha = 0.12;
        for (let x = 0; x < w; x += 14) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
        for (let y = (t * 8) % 14; y < h; y += 14) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
        ctx.globalAlpha = open ? 0.95 : 0.55;
        ctx.shadowColor = f.color;
        ctx.shadowBlur = 8;
        // círculo áureo
        ctx.beginPath(); ctx.arc(cx, h * 0.2, w * 0.28, 0, Math.PI * 2); ctx.stroke();
        // triángulo que gira
        ctx.save(); ctx.translate(cx, h * 0.45); ctx.rotate(t * 0.5);
        ctx.strokeStyle = f.color2;
        ctx.beginPath();
        for (let i = 0; i < 3; i++) { const a = i * 2.094 - 1.571; ctx.lineTo(Math.cos(a) * w * 0.3, Math.sin(a) * w * 0.3); }
        ctx.closePath(); ctx.stroke(); ctx.restore();
        // curva Bézier con manijas (herramienta pluma)
        const y0 = h * 0.72, sway = Math.sin(t) * w * 0.25;
        const p0 = [w * 0.12, y0 + 20], p1 = [cx + sway, y0 - 50], p2 = [cx - sway, y0 + 60], p3 = [w * 0.88, y0 - 10];
        ctx.strokeStyle = f.color;
        ctx.beginPath(); ctx.moveTo(...p0); ctx.bezierCurveTo(...p1, ...p2, ...p3); ctx.stroke();
        ctx.globalAlpha *= 0.6;
        ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.moveTo(...p3); ctx.lineTo(...p2); ctx.stroke();
        ctx.fillStyle = '#fff';
        [p0, p1, p2, p3].forEach(([x, y]) => ctx.fillRect(x - 2, y - 2, 4, 4));
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }

    function drawMarketing(f, t, open) {
        const { ctx, w, h, state } = f;
        ctx.clearRect(0, 0, w, h);
        const k = open ? 1 : 0.6;
        // barras que crecen
        const bars = 6, bw = w / (bars * 1.6), gap = (w - bars * bw) / (bars + 1);
        for (let i = 0; i < bars; i++) {
            const grow = 0.25 + 0.55 * (i / (bars - 1)) + 0.08 * Math.sin(t * 1.4 + i);
            const bh = h * 0.42 * grow;
            const x = gap + i * (bw + gap), y = h * 0.92 - bh;
            const g = ctx.createLinearGradient(0, y, 0, h * 0.92);
            g.addColorStop(0, f.color);
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.globalAlpha = 0.75 * k;
            ctx.fillStyle = g;
            ctx.fillRect(x, y, bw, bh);
        }
        // línea de tendencia ascendente
        ctx.globalAlpha = k;
        ctx.strokeStyle = f.color2;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = f.color2;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        const pts = 9;
        for (let i = 0; i < pts; i++) {
            const x = w * (0.08 + 0.84 * i / (pts - 1));
            const y = h * (0.62 - 0.42 * (i / (pts - 1))) + Math.sin(t * 2 + i * 1.3) * 6;
            if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
        }
        ctx.stroke();
        // flecha en la punta
        ctx.fillStyle = f.color2;
        ctx.beginPath(); ctx.moveTo(w * 0.92, h * 0.17); ctx.lineTo(w * 0.84, h * 0.2); ctx.lineTo(w * 0.9, h * 0.25); ctx.fill();
        // burbujas de interacción que suben
        ctx.shadowColor = f.color;
        state.bubbles.forEach((b) => {
            b.y -= b.v * (open ? 1.6 : 0.8);
            if (b.y < -10) { b.y = h + 10; b.x = Math.random() * w; }
            ctx.globalAlpha = 0.5 * k;
            ctx.strokeStyle = f.color;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.stroke();
        });
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }

    const draw = { code: drawCode, ai: drawAI, design: drawDesign, marketing: drawMarketing };
    let last = 0;
    function loop(ms) {
        requestAnimationFrame(loop);
        if (!inView || document.hidden || ms - last < 33) return; // ~30 fps
        last = ms;
        const t = ms / 1000;
        fx.forEach((f) => draw[f.type](f, t, f.pillar.classList.contains('is-open')));
    }

    resize();
    window.addEventListener('resize', resize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(resize);
    if (reducedMotion) {
        fx.forEach((f) => draw[f.type](f, 1, true));
    } else {
        requestAnimationFrame(loop);
    }
})();
