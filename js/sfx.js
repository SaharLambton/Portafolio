/* ==========================================================
   SONIDOS DE LA INTERFAZ · se generan con Web Audio, sin archivos
   Son independientes de la voz de ATLAS: silenciar a ATLAS no
   apaga estos sonidos, que siempre están activos.
   Uso desde otros scripts: window.SFX.play('success')
   ========================================================== */
(function () {
    const enabled = true;
    let ctx = null;
    let master = null;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // el navegador solo deja sonar audio después de un clic, un toque o una tecla
    function unlock() {
        if (!ctx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return;
            ctx = new AC();
            master = ctx.createGain();
            master.gain.value = 0.9;
            master.connect(ctx.destination);
        }
        if (ctx.state === 'suspended') ctx.resume();
    }
    ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => window.addEventListener(ev, unlock, { capture: true, passive: true }));
    // Se crea apenas carga la página: si la persona ya hizo clic en otra página del sitio,
    // el navegador suele permitir el audio de inmediato, sin esperar un clic nuevo.
    unlock();
    // si quedó en pausa, se reintenta al mover el cursor o hacer scroll
    const retry = () => { if (ctx && ctx.state !== 'running') ctx.resume(); };
    ['pointermove', 'scroll', 'wheel'].forEach((ev) => window.addEventListener(ev, retry, { passive: true }));
    const ready = () => enabled && ctx && ctx.state === 'running';

    /* ---------- Piezas básicas ---------- */
    function tone(freq, { type = 'sine', t = 0, dur = 0.12, gain = 0.03, to = null, attack = 0.005, out = master } = {}) {
        const now = ctx.currentTime + t;
        const o = ctx.createOscillator();
        o.type = type;
        o.frequency.setValueAtTime(freq, now);
        if (to) o.frequency.exponentialRampToValueAtTime(to, now + dur);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(gain, now + attack);
        g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
        o.connect(g); g.connect(out);
        o.start(now); o.stop(now + dur + 0.02);
    }
    function air({ t = 0, dur = 0.4, from = 400, to = 3800, gain = 0.05, q = 6 } = {}) {
        const now = ctx.currentTime + t;
        const len = Math.floor(ctx.sampleRate * dur);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
        const src = ctx.createBufferSource(); src.buffer = buf;
        const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = q;
        bp.frequency.setValueAtTime(from, now); bp.frequency.exponentialRampToValueAtTime(to, now + dur * 0.8);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(gain, now + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
        src.connect(bp); bp.connect(g); g.connect(master);
        src.start(now); src.stop(now + dur);
    }
    function echo(time = 0.14, feedback = 0.28) {
        const d = ctx.createDelay(); d.delayTime.value = time;
        const fb = ctx.createGain(); fb.gain.value = feedback;
        const bus = ctx.createGain();
        bus.connect(master); bus.connect(d); d.connect(fb); fb.connect(d); d.connect(master);
        return bus;
    }

    /* ---------- Catálogo de sonidos ---------- */
    const CHORDS = { code: [261.6, 392.0, 523.3], ai: [293.7, 440.0, 587.3], design: [329.6, 493.9, 659.3], marketing: [349.2, 523.3, 698.5] };
    const SOUNDS = {
        // pasar el cursor: un destello muy corto y suave
        hover: () => tone(2600, { dur: 0.04, gain: 0.008, to: 3000 }),
        // pasar el cursor por tarjetas e información (más grave que el de los botones)
        card: () => { tone(1480, { type: 'sine', dur: 0.05, gain: 0.008, to: 1760 }); },
        // una sección aparece al hacer scroll: escaneo suave
        scan: () => { tone(1900, { type: 'sine', dur: 0.09, gain: 0.006, to: 2600 }); tone(2850, { type: 'sine', t: 0.05, dur: 0.06, gain: 0.004 }); },
        // clic en botones
        click: () => { tone(1250, { type: 'triangle', dur: 0.06, gain: 0.03 }); tone(1870, { type: 'sine', t: 0.03, dur: 0.07, gain: 0.02 }); },
        // ir a otra página
        nav: () => { tone(660, { type: 'triangle', dur: 0.12, gain: 0.025, to: 990 }); air({ dur: 0.22, from: 900, to: 4200, gain: 0.02, q: 3 }); },
        // activar / desactivar (idioma, voz, efectos)
        toggleOn: () => { tone(740, { dur: 0.07, gain: 0.03 }); tone(1110, { t: 0.06, dur: 0.1, gain: 0.03 }); },
        toggleOff: () => { tone(1110, { dur: 0.07, gain: 0.03 }); tone(740, { t: 0.06, dur: 0.1, gain: 0.025 }); },
        // elegir una opción (consola de servicios, filtros)
        select: () => { tone(880, { type: 'triangle', dur: 0.09, gain: 0.03 }); tone(1320, { t: 0.04, dur: 0.12, gain: 0.018 }); },
        // abrir el visor de imágenes o un panel
        open: () => { air({ dur: 0.32, from: 600, to: 3200, gain: 0.03 }); tone(520, { type: 'sine', dur: 0.25, gain: 0.02, to: 780 }); },
        // apertura de un pilar: compuerta holográfica y acorde con eco
        pillar: (type) => {
            const bus = echo();
            air({ dur: 0.45 });
            (CHORDS[type] || CHORDS.code).forEach((f, i) => tone(f, { type: i === 2 ? 'sine' : 'triangle', t: 0.05 + i * 0.06, dur: 0.7, gain: 0.045, attack: 0.02, out: bus }));
        },
        // mensaje enviado / plan listo
        success: () => {
            const bus = echo(0.12, 0.22);
            [523.3, 659.3, 784.0, 1046.5].forEach((f, i) => tone(f, { type: 'triangle', t: i * 0.08, dur: 0.35, gain: 0.035, out: bus }));
        },
        // error de validación
        error: () => { tone(220, { type: 'square', dur: 0.12, gain: 0.012 }); tone(185, { type: 'square', t: 0.1, dur: 0.16, gain: 0.012 }); }
    };

    let lastPlay = {};
    function play(name, arg) {
        if (!ready() || !SOUNDS[name]) return;
        const now = performance.now();
        const gap = name === 'hover' || name === 'card' ? 70 : name === 'scan' ? 160 : name === 'pillar' ? 180 : 40;
        if (now - (lastPlay[name] || 0) < gap) return;
        lastPlay[name] = now;
        try { SOUNDS[name](arg); } catch (e) { /* el audio nunca debe romper la página */ }
    }

    window.SFX = { play };

    /* ---------- Sonidos automáticos para lo interactivo ---------- */
    const HOVER = 'a[href], button, .pillar, .glance-card, .aura-card, .blog-card, .case-shot, .case-zoom, .swatch, [role="button"], summary, select, input, textarea, .freq, .opt';
    // tarjetas e información: suenan con un tono más suave que los botones
    const CARDS = '.skill-chips li, .skill-card, .tl-card, .about-fact, .lang-meter, .svc, .rec, .step, .stat, .channel, .testimonial, .scope, .statement, .case-panel, .case-row__media, .post__fig, .post__tip, .post__quote';
    let lastHover = null;
    if (canHover) {
        document.addEventListener('pointerover', (e) => {
            const el = e.target.closest(HOVER) || e.target.closest(CARDS);
            if (el === lastHover) return;
            lastHover = el;
            if (!el || el.disabled) return;
            // los pilares tienen su propio sonido al abrirse
            if (el.classList.contains('pillar')) return;
            play(el.matches(HOVER) ? 'hover' : 'card');
        }, { passive: true });
    }

    /* ---------- Escaneo al aparecer secciones (Sobre mí, Servicios, proyectos, blog) ---------- */
    const SCAN = '.tl-item, .skill-card, .band, .step, .stat, .faq__item, .case-section, .post__h2, .blog-card, .testimonial';
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((en) => { if (en.isIntersecting) { play('scan'); io.unobserve(en.target); } });
        }, { threshold: 0.35 });
        const watch = () => document.querySelectorAll(SCAN).forEach((el) => io.observe(el));
        // el catálogo de servicios se dibuja con JavaScript: se espera a que exista
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(watch, 400));
        else setTimeout(watch, 400);
    }
    document.addEventListener('click', (e) => {
        const el = e.target.closest('a[href], button, summary, [role="button"], .case-shot, .case-zoom');
        if (!el || el.disabled) return;
        if (el.closest('.aura-lang')) return play('toggleOn');
        if (el.id === 'auraVoice') return play(el.classList.contains('is-on') ? 'toggleOff' : 'toggleOn');
        if (el.matches('.case-shot, .case-zoom')) return play('open');
        if (el.matches('summary')) return play(el.parentElement.open ? 'toggleOff' : 'select');
        if (el.matches('a[href]')) {
            const href = el.getAttribute('href');
            const sameTab = el.target !== '_blank' && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:');
            return play(sameTab ? 'nav' : 'click');
        }
        if (el.matches('[aria-pressed], .opt, .option, [data-goal], [data-stage], [data-time], .freq')) return play('select');
        play('click');
    }, true);

})();
