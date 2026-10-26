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
        const was = pillar.classList.contains('is-open');
        pillars.forEach((p) => setOpen(p, p === pillar));
        if (!was) { chime(pillar.dataset.pillar); showHolo(pillar.dataset.pillar); }
    }

    /* ---------- Sonido de apertura: lo genera js/sfx.js (independiente de la voz de ATLAS) ---------- */
    function chime(type) { if (window.SFX && !reducedMotion) window.SFX.play('pillar', type); }

    /* ---------- Paneles holográficos con datos reales ---------- */
    const KB = window.AURA_KB || {};
    const P = KB.projects || [];
    const count = (...ids) => P.filter((p) => p.pillars.some((x) => ids.includes(x))).length;
    const L = () => (document.documentElement.lang === 'en' ? 'en' : 'es');
    const CODE = {
        all: () => ({ es: [['proyectos', P.length], ['desde', 2019], ['pilares', 4], ['idiomas', "'ES / EN'"]], en: [['projects', P.length], ['since', 2019], ['pillars', 4], ['languages', "'ES / EN'"]] }),
        code: () => ({ es: [['proyectos', count('web', 'code')], ['stack', "['.NET', 'SQL', 'TS']"], ['calidad', "'Jest + CI'"], ['datos', "'+30%'"]], en: [['projects', count('web', 'code')], ['stack', "['.NET', 'SQL', 'TS']"], ['quality', "'Jest + CI'"], ['data', "'+30%'"]] }),
        ai: () => ({ es: [['proyectos', count('ai')], ['taller', "'Intel Tax'"], ['asistente', "'ATLAS'"], ['productividad', "'+35%'"]], en: [['projects', count('ai')], ['workshop', "'Intel Tax'"], ['assistant', "'ATLAS'"], ['productivity', "'+35%'"]] }),
        design: () => ({ es: [['proyectos', count('design')], ['marcas', 5], ['enUso', "'Armonía'"], ['suite', "'Illustrator'"]], en: [['projects', count('design')], ['brands', 5], ['inUse', "'Armonía'"], ['suite', "'Illustrator'"]] }),
        marketing: () => ({ es: [['proyectos', count('marketing')], ['interaccion', "'+20%'"], ['analitica', "'Analytics + SEO'"], ['redes', "'MetalTec'"]], en: [['projects', count('marketing')], ['engagement', "'+20%'"], ['analytics', "'Analytics + SEO'"], ['social', "'MetalTec'"]] })
    };
    const VAR = { all: 'sahar', code: 'programacion', ai: 'ia', design: 'diseno', marketing: 'marketing' };
    const VAR_EN = { all: 'sahar', code: 'programming', ai: 'ai', design: 'design', marketing: 'marketing' };
    // métricas de impacto (resultados de Únicos, 2019–2021) y de portafolio
    const METRICS = {
        code: { v: 30, es: ['ORG. DE DATOS', 'bases de datos a medida'], en: ['DATA ORGANIZATION', 'custom databases'], src: 'ÚNICOS' },
        ai: { v: 35, es: ['PRODUCTIVIDAD', 'software y automatización'], en: ['PRODUCTIVITY', 'software and automation'], src: 'ÚNICOS' },
        design: { v: 20, es: ['INTERACCIÓN', 'identidad visual y campañas'], en: ['ENGAGEMENT', 'visual identity and campaigns'], src: 'ÚNICOS' },
        marketing: { v: 20, es: ['INTERACCIÓN', 'campañas con clientes'], en: ['ENGAGEMENT', 'client campaigns'], src: 'ÚNICOS' }
    };
    const ROTATE = ['ai', 'code', 'design'];
    const el = (id) => document.getElementById(id);
    const codeEl = el('holoCode'), tagEl = el('holoCodeTag');
    let typing = 0;

    function renderCode(key) {
        if (!codeEl) return;
        const lang = L();
        const lines = (CODE[key] || CODE.all)()[lang];
        const name = (lang === 'en' ? VAR_EN : VAR)[key] || 'sahar';
        const html = `<span class="k">const</span> ${name} = {\n` + lines.map(([k, v]) => `  ${k}: <span class="v">${v}</span>,`).join('\n') + '\n};';
        const plain = html.replace(/<[^>]+>/g, '');
        if (tagEl) tagEl.textContent = key === 'all' ? 'ALL' : key.toUpperCase();
        const id = ++typing;
        if (reducedMotion) { codeEl.innerHTML = html; return; }
        // efecto de escritura: va mostrando el texto y al final aplica los colores
        let i = 0;
        const step = () => {
            if (id !== typing) return;
            i = Math.min(plain.length, i + 3);
            codeEl.textContent = plain.slice(0, i);
            if (i < plain.length) { codeEl.insertAdjacentHTML('beforeend', '<span class="caret">&nbsp;</span>'); setTimeout(step, 16); }
            else codeEl.innerHTML = html;
        };
        step();
    }

    function linePoints(v, seed) {
        // línea que sube hasta el valor de la métrica
        const pts = [];
        for (let i = 0; i <= 8; i++) {
            const k = i / 8;
            const y = 66 - (v / 40) * 58 * Math.pow(k, 0.8) + Math.sin(i * 1.7 + seed) * 3 * (1 - k * 0.5);
            pts.push(`${Math.round(k * 160)},${Math.max(4, Math.min(66, y)).toFixed(1)}`);
        }
        return pts.join(' ');
    }
    let metricTimer = 0, rotateIdx = 0, countId = 0;
    function renderMetric(key) {
        const m = METRICS[key];
        if (!m || !el('holoMetricValue')) return;
        const lang = L();
        el('holoMetricLabel').textContent = m[lang][0];
        el('holoMetricNote').textContent = m[lang][1];
        el('holoMetricSrc').textContent = m.src;
        el('holoLineA').setAttribute('points', linePoints(m.v, 0));
        el('holoLineB').setAttribute('points', linePoints(m.v * 0.7, 2));
        const valEl = el('holoMetricValue');
        const id = ++countId;
        if (reducedMotion) { valEl.textContent = '+' + m.v + '%'; return; }
        const t0 = performance.now();
        const step = (now) => { if (id !== countId) return; const k = Math.min(1, (now - t0) / 900); valEl.textContent = '+' + Math.round(m.v * k) + '%'; if (k < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
    }
    function startRotation() {
        clearInterval(metricTimer);
        if (reducedMotion) return;
        metricTimer = setInterval(() => {
            if (document.hidden || pillars.some((p) => p.classList.contains('is-open'))) return;
            rotateIdx = (rotateIdx + 1) % ROTATE.length;
            renderMetric(ROTATE[rotateIdx]);
        }, 4500);
    }
    function showHolo(key) { renderCode(key); renderMetric(key); }
    // al cerrar todos los pilares, los paneles vuelven al resumen general
    let idleTimer = 0;
    function maybeReset() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => { if (!pillars.some((p) => p.classList.contains('is-open'))) renderCode('all'); }, 600);
    }
    pillars.forEach((p) => p.addEventListener('mouseleave', maybeReset));
    pillars.forEach((p) => p.addEventListener('focusout', maybeReset));
    // si cambia el idioma, se reescriben los paneles
    new MutationObserver(() => {
        const open = pillars.find((p) => p.classList.contains('is-open'));
        showHolo(open ? open.dataset.pillar : 'all');
        if (!open) renderMetric(ROTATE[rotateIdx]);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    pillars.forEach((pillar) => {
        if (canHover) {
            pillar.addEventListener('mouseenter', () => openOnly(pillar));
            pillar.addEventListener('mouseleave', () => setOpen(pillar, false));
        }
        pillar.addEventListener('focusin', () => openOnly(pillar));
        pillar.addEventListener('focusout', (e) => {
            if (!pillar.contains(e.relatedTarget)) setOpen(pillar, false);
        });
        // clic en el pilar: lleva a Proyectos filtrado por su área.
        // En pantallas táctiles el primer toque lo abre y el segundo navega.
        const goProjects = () => { window.location.href = 'proyectos.html?area=' + pillar.dataset.pillar; };
        pillar.addEventListener('click', (e) => {
            if (e.target.closest('.pillar__panel')) return;
            if (!canHover && !pillar.classList.contains('is-open')) { openOnly(pillar); return; }
            goProjects();
        });
        pillar.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { setOpen(pillar, false); pillar.blur(); }
            if (e.key === 'Enter' && e.target === pillar) goProjects();
        });
    });

    /* ---------- "Preguntar a ATLAS" ---------- */
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
    let holoStarted = false;
    const startHolo = () => {
        if (holoStarted) return;
        holoStarted = true;
        // si ya hay un pilar abierto (el cursor quedó encima), los paneles muestran ese pilar
        const open = pillars.find((p) => p.classList.contains('is-open'));
        if (open) showHolo(open.dataset.pillar); else { renderCode('all'); renderMetric(ROTATE[0]); }
        startRotation();
    };
    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                inView = e.isIntersecting;
                if (e.isIntersecting) { section.classList.add('is-visible'); startHolo(); }
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
        startHolo();
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
