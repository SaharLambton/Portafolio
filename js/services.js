/* ==========================================================
   SERVICIOS · Consola "Diseña tu misión" + catálogo
   3 pasos (objetivo, etapa, tiempo) → plan con servicios recomendados
   que se puede enviar por WhatsApp o llevar a Contacto.
   ========================================================== */
(function () {
    const S = window.SERVICES || [];
    const ICON = window.SERVICE_ICONS || {};
    const main = document.getElementById('consoleMain');
    if (!main) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const WHATSAPP = '573204499948';

    const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'es');
    const tr = (o) => (o ? o[lang()] || o.es : '');
    const byId = (id) => S.find((s) => s.id === id);
    const svg = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k] || ''}</svg>`;
    const PCOLOR = { code: '#2bf5b0', ai: '#a970ff', design: '#ff5bd8', marketing: '#3ddcff' };
    const PNAME = { code: { es: 'Programación', en: 'Programming' }, ai: { es: 'IA y automatización', en: 'AI and automation' }, design: { es: 'Diseño', en: 'Design' }, marketing: { es: 'Marketing digital', en: 'Digital marketing' } };

    /* ---------- Preguntas ---------- */
    const GOALS = [
        { id: 'sell', icon: 'sell', label: { es: 'Vender o mostrar mi negocio en línea', en: 'Sell or showcase my business online' }, services: ['web', 'store'] },
        { id: 'system', icon: 'system', label: { es: 'Organizar mi información y procesos', en: 'Organize my information and processes' }, services: ['databases', 'software'] },
        { id: 'automate', icon: 'automation', label: { es: 'Ahorrar tiempo con IA y automatización', en: 'Save time with AI and automation' }, services: ['automation', 'chatbots'] },
        { id: 'learn', icon: 'learn', label: { es: 'Que mi equipo aprenda a usar IA', en: 'Get my team to use AI' }, services: ['workshops'] },
        { id: 'brand', icon: 'branding', label: { es: 'Tener una marca profesional', en: 'Have a professional brand' }, services: ['branding', 'graphic'] },
        { id: 'grow', icon: 'grow', label: { es: 'Conseguir más clientes en digital', en: 'Get more customers online' }, services: ['community', 'consulting'] }
    ];
    const STAGES = [
        { id: 'idea', icon: 'idea', label: { es: 'Tengo una idea o estoy empezando', en: 'I have an idea or I\'m just starting' }, extra: ['branding', 'web'] },
        { id: 'improve', icon: 'store', label: { es: 'Ya tengo negocio y quiero mejorar su imagen', en: 'I have a business and want to improve its image' }, extra: ['graphic', 'web', 'branding'] },
        { id: 'scale', icon: 'rocket', label: { es: 'Ya vendo y quiero crecer', en: 'I already sell and want to grow' }, extra: ['consulting', 'automation'] },
        { id: 'company', icon: 'building', label: { es: 'Soy una empresa con equipo', en: 'I\'m a company with a team' }, extra: ['workshops', 'automation'] }
    ];
    const TIMES = [
        { id: 'asap', icon: 'bolt', label: { es: 'Lo antes posible', en: 'As soon as possible' }, aura: { es: 'Podemos empezar pronto: la primera conversación es gratis.', en: 'We can start soon: the first conversation is free.' } },
        { id: 'months', icon: 'calendar', label: { es: 'En los próximos 1 a 3 meses', en: 'In the next 1 to 3 months' }, aura: { es: 'Hay tiempo para planear bien cada etapa.', en: 'There\'s time to plan each stage well.' } },
        { id: 'explore', icon: 'search', label: { es: 'Solo estoy explorando', en: 'I\'m just exploring' }, aura: { es: 'Sin presión: con la cotización tendrás claro el alcance y el precio.', en: 'No pressure: the quote will make the scope and price clear.' } }
    ];
    const AURA_STEP = {
        1: { es: '¡Hola! Vamos a diseñar tu misión. Primero: ¿qué quieres lograr? Puedes elegir varias opciones.', en: 'Hi! Let\'s design your mission. First: what do you want to achieve? You can pick several options.' },
        2: { es: 'Anotado. Ahora cuéntame en qué etapa está tu negocio.', en: 'Got it. Now tell me what stage your business is at.' },
        3: { es: 'Última pregunta: ¿para cuándo lo necesitas?', en: 'Last question: when do you need it?' }
    };
    const T = {
        step: { es: 'PASO {n} DE 3', en: 'STEP {n} OF 3' },
        done: { es: 'PLAN LISTO ✓', en: 'PLAN READY ✓' },
        q1: { es: '¿Qué quieres lograr?', en: 'What do you want to achieve?' },
        q1hint: { es: 'Elige una o varias opciones.', en: 'Pick one or more options.' },
        q2: { es: '¿En qué etapa está tu negocio?', en: 'What stage is your business at?' },
        q3: { es: '¿Para cuándo lo necesitas?', en: 'When do you need it?' },
        next: { es: 'Siguiente →', en: 'Next →' },
        back: { es: '← Atrás', en: '← Back' },
        planTitle: { es: 'Tu plan de misión', en: 'Your mission plan' },
        recommended: { es: 'Servicios recomendados', en: 'Recommended services' },
        alsoTitle: { es: 'También te puede servir', en: 'This may also help' },
        details: { es: 'Ver detalle', en: 'See details' },
        wa: { es: 'Enviar mi plan por WhatsApp', en: 'Send my plan on WhatsApp' },
        quote: { es: 'Pedir cotización con este plan', en: 'Request a quote with this plan' },
        restart: { es: 'Empezar de nuevo', en: 'Start over' },
        logGoal: { es: 'Objetivo', en: 'Goal' },
        logStage: { es: 'Etapa', en: 'Stage' },
        logTime: { es: 'Tiempo', en: 'Timing' },
        logEmpty: { es: 'Tus respuestas aparecerán aquí.', en: 'Your answers will appear here.' },
        result: { es: 'Listo. Para lo que buscas te recomiendo {list}. {time}', en: 'Done. For what you\'re looking for, I recommend {list}. {time}' },
        and: { es: ' y ', en: ' and ' },
        waIntro: { es: '¡Hola Sahar! Diseñé mi misión en tu portafolio:', en: 'Hi Sahar! I designed my mission on your portfolio:' },
        waOutro: { es: '¿Podemos hablar?', en: 'Can we talk?' },
        services: { es: 'Servicios', en: 'Services' }
    };
    const fill = (s, v) => s.replace(/\{(\w+)\}/g, (m, k) => (v[k] != null ? v[k] : m));

    const state = { step: 1, goals: [], stage: null, time: null };

    /* ---------- ATLAS en la consola ---------- */
    const auraText = document.getElementById('consoleAura');
    let typeToken = 0;
    async function auraSay(text) {
        const token = ++typeToken;
        if (reducedMotion) { auraText.textContent = text; return; }
        auraText.textContent = '';
        auraText.classList.add('is-typing');
        for (const ch of Array.from(text)) {
            if (token !== typeToken) return;
            auraText.textContent += ch;
            await new Promise((r) => setTimeout(r, 14));
        }
        auraText.classList.remove('is-typing');
    }

    function renderLog() {
        const log = document.getElementById('consoleLog');
        log.innerHTML = '';
        const rows = [];
        if (state.goals.length) rows.push([T.logGoal, state.goals.map((g) => tr(GOALS.find((x) => x.id === g).label)).join(' · ')]);
        if (state.stage) rows.push([T.logStage, tr(STAGES.find((x) => x.id === state.stage).label)]);
        if (state.time) rows.push([T.logTime, tr(TIMES.find((x) => x.id === state.time).label)]);
        if (!rows.length) {
            const li = document.createElement('li');
            li.className = 'is-empty';
            li.textContent = tr(T.logEmpty);
            log.appendChild(li);
            return;
        }
        rows.forEach(([k, v]) => {
            const li = document.createElement('li');
            const b = document.createElement('b');
            b.textContent = tr(k);
            li.append(b, document.createTextNode(v));
            log.appendChild(li);
        });
    }

    function setProgress() {
        document.querySelectorAll('.console__progress li').forEach((li) => {
            const n = Number(li.dataset.step);
            li.classList.toggle('is-done', n < state.step);
            li.classList.toggle('is-current', n === state.step);
        });
        document.getElementById('consoleStep').textContent = state.step > 3 ? tr(T.done) : fill(tr(T.step), { n: state.step });
    }

    /* ---------- Pasos ---------- */
    function optionButton(opt, selected, multi) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'opt' + (selected ? ' is-selected' : '');
        b.setAttribute(multi ? 'aria-pressed' : 'aria-checked', String(selected));
        if (!multi) b.setAttribute('role', 'radio');
        b.innerHTML = `<span class="opt__icon">${svg(opt.icon)}</span><span class="opt__label"></span><span class="opt__check" aria-hidden="true"></span>`;
        b.querySelector('.opt__label').textContent = tr(opt.label);
        return b;
    }

    function stepShell(title, hint) {
        main.innerHTML = '';
        const wrap = document.createElement('div');
        wrap.className = 'qstep';
        const h = document.createElement('h2');
        h.className = 'qstep__title';
        h.textContent = tr(title);
        wrap.appendChild(h);
        if (hint) {
            const p = document.createElement('p');
            p.className = 'qstep__hint';
            p.textContent = tr(hint);
            wrap.appendChild(p);
        }
        const grid = document.createElement('div');
        grid.className = 'qstep__grid';
        wrap.appendChild(grid);
        const nav = document.createElement('div');
        nav.className = 'qstep__nav';
        wrap.appendChild(nav);
        main.appendChild(wrap);
        return { grid, nav };
    }

    function navButtons(nav, { back, next, nextEnabled }) {
        if (back) {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'qbtn qbtn--ghost';
            b.textContent = tr(T.back);
            b.addEventListener('click', back);
            nav.appendChild(b);
        }
        if (next) {
            const n = document.createElement('button');
            n.type = 'button';
            n.className = 'qbtn qbtn--primary';
            n.textContent = tr(T.next);
            n.disabled = !nextEnabled;
            n.addEventListener('click', next);
            nav.appendChild(n);
            return n;
        }
        return null;
    }

    function step1() {
        const { grid, nav } = stepShell(T.q1, T.q1hint);
        let nextBtn = null;
        GOALS.forEach((g) => {
            const b = optionButton(g, state.goals.includes(g.id), true);
            b.addEventListener('click', () => {
                state.goals = state.goals.includes(g.id) ? state.goals.filter((x) => x !== g.id) : state.goals.concat(g.id);
                b.classList.toggle('is-selected');
                b.setAttribute('aria-pressed', String(state.goals.includes(g.id)));
                nextBtn.disabled = !state.goals.length;
                renderLog();
            });
            grid.appendChild(b);
        });
        nextBtn = navButtons(nav, { next: () => goTo(2), nextEnabled: state.goals.length > 0 });
    }

    function singleStep(title, options, key, nextStep, backStep) {
        const { grid, nav } = stepShell(title);
        grid.setAttribute('role', 'radiogroup');
        grid.classList.add('qstep__grid--single');
        options.forEach((o) => {
            const b = optionButton(o, state[key] === o.id, false);
            b.addEventListener('click', () => {
                state[key] = o.id;
                grid.querySelectorAll('.opt').forEach((x) => { x.classList.remove('is-selected'); x.setAttribute('aria-checked', 'false'); });
                b.classList.add('is-selected');
                b.setAttribute('aria-checked', 'true');
                renderLog();
                // avanza solo tras elegir
                setTimeout(() => goTo(nextStep), reducedMotion ? 0 : 380);
            });
            grid.appendChild(b);
        });
        navButtons(nav, { back: () => goTo(backStep) });
    }

    /* ---------- Plan ---------- */
    function plan() {
        // primero un servicio de cada objetivo, luego el resto, hasta 4
        const rec = [];
        const lists = state.goals.map((g) => GOALS.find((x) => x.id === g).services);
        for (let i = 0; i < 4; i++) lists.forEach((l) => { if (l[i] && !rec.includes(l[i])) rec.push(l[i]); });
        const stage = STAGES.find((x) => x.id === state.stage);
        // sugerencia adicional: primero según la etapa, si no, una opción general
        const pool = (stage ? stage.extra : []).concat(['consulting', 'automation', 'community', 'graphic', 'workshops', 'branding', 'web']);
        const extra = pool.find((s) => !rec.includes(s)) || null;
        return { rec: rec.slice(0, 4), extra };
    }

    function planText(p) {
        const lines = [tr(T.waIntro)];
        lines.push(`• ${tr(T.logGoal)}: ${state.goals.map((g) => tr(GOALS.find((x) => x.id === g).label)).join(', ')}`);
        if (state.stage) lines.push(`• ${tr(T.logStage)}: ${tr(STAGES.find((x) => x.id === state.stage).label)}`);
        if (state.time) lines.push(`• ${tr(T.logTime)}: ${tr(TIMES.find((x) => x.id === state.time).label)}`);
        lines.push(`• ${tr(T.services)}: ${p.rec.map((id) => tr(byId(id).title)).join(', ')}`);
        return lines;
    }

    function serviceCard(s, compact) {
        const a = document.createElement('article');
        a.className = 'rec' + (compact ? ' rec--extra' : '');
        a.style.setProperty('--t', PCOLOR[s.pillar]);
        a.innerHTML = `<span class="rec__icon">${svg(s.icon)}</span><span class="rec__body"><span class="rec__pillar"></span><span class="rec__title"></span><span class="rec__text"></span></span>`;
        a.querySelector('.rec__pillar').textContent = tr(PNAME[s.pillar]);
        a.querySelector('.rec__title').textContent = tr(s.title);
        a.querySelector('.rec__text').textContent = tr(s.short);
        const link = document.createElement('a');
        link.className = 'rec__link';
        link.href = '#' + s.id;
        link.textContent = tr(T.details);
        a.querySelector('.rec__body').appendChild(link);
        return a;
    }

    function result() {
        const p = plan();
        main.innerHTML = '';
        const wrap = document.createElement('div');
        wrap.className = 'qresult';
        const h = document.createElement('h2');
        h.className = 'qstep__title';
        h.textContent = tr(T.planTitle);
        const sub = document.createElement('p');
        sub.className = 'qresult__label';
        sub.textContent = tr(T.recommended);
        const grid = document.createElement('div');
        grid.className = 'qresult__grid';
        p.rec.forEach((id) => grid.appendChild(serviceCard(byId(id))));
        wrap.append(h, sub, grid);
        if (p.extra) {
            const l = document.createElement('p');
            l.className = 'qresult__label';
            l.textContent = tr(T.alsoTitle);
            wrap.append(l, serviceCard(byId(p.extra), true));
        }
        const actions = document.createElement('div');
        actions.className = 'qresult__actions';
        const lines = planText(p);
        const wa = document.createElement('a');
        wa.className = 'qbtn qbtn--wa';
        wa.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.concat(tr(T.waOutro)).join('\n'))}`;
        wa.target = '_blank';
        wa.rel = 'noopener';
        wa.textContent = tr(T.wa);
        const quote = document.createElement('a');
        quote.className = 'qbtn qbtn--primary';
        quote.href = `contacto.html?servicio=${encodeURIComponent(p.rec[0])}&plan=${encodeURIComponent(lines.slice(1).join('\n'))}`;
        quote.textContent = tr(T.quote);
        const again = document.createElement('button');
        again.type = 'button';
        again.className = 'qbtn qbtn--ghost';
        again.textContent = tr(T.restart);
        again.addEventListener('click', () => {
            state.goals = []; state.stage = null; state.time = null;
            goTo(1);
        });
        actions.append(wa, quote, again);
        wrap.appendChild(actions);
        main.appendChild(wrap);

        const names = p.rec.map((id) => `“${tr(byId(id).title)}”`);
        const list = names.length > 1 ? names.slice(0, -1).join(', ') + tr(T.and) + names[names.length - 1] : names[0];
        const time = TIMES.find((x) => x.id === state.time);
        const msg = fill(tr(T.result), { list, time: time ? tr(time.aura) : '' });
        auraSay(msg);
        // la ATLAS flotante también lo dice (con voz si está activa), una vez por plan
        if (window.AuraComment) window.AuraComment('plan-' + state.goals.join('-') + '-' + state.stage + '-' + state.time, { es: msg, en: msg });
    }

    function goTo(n, { silent } = {}) {
        state.step = n;
        setProgress();
        renderLog();
        if (n === 1) step1();
        else if (n === 2) singleStep(T.q2, STAGES, 'stage', 3, 1);
        else if (n === 3) singleStep(T.q3, TIMES, 'time', 4, 2);
        else result();
        if (n <= 3 && !silent) auraSay(tr(AURA_STEP[n]));
        if (n <= 3 && silent) auraText.textContent = tr(AURA_STEP[n]);
        main.classList.remove('is-entering');
        void main.offsetWidth;
        main.classList.add('is-entering');
    }

    /* ---------- Catálogo: una franja por necesidad con sus servicios abiertos ---------- */
    const NEEDS = window.SERVICE_NEEDS || [];
    const L = {
        get: { es: 'Recibes', en: 'You get' },
        ideal: { es: 'Ideal para:', en: 'Ideal for:' },
        cta: { es: 'Cotizar este servicio →', en: 'Quote this service →' },
        need: { es: 'NECESIDAD', en: 'NEED' },
        one: { es: 'servicio', en: 'service' },
        many: { es: 'servicios', en: 'services' }
    };

    function renderCatalog() {
        const grid = document.getElementById('catalogGrid');
        if (!grid) return;
        grid.innerHTML = '';
        NEEDS.forEach((n, i) => {
            const list = S.filter((s) => s.need === n.id);
            const band = document.createElement('section');
            band.className = 'band';
            band.id = 'need-' + n.id;
            band.style.setProperty('--t', PCOLOR[n.pillar]);

            // cabecera: la necesidad y el pilar al que pertenece
            const head = document.createElement('header');
            head.className = 'band__head';
            head.innerHTML = `<span class="band__icon">${svg(n.icon)}</span><span class="band__num"></span><h3 class="band__title"></h3><p class="band__intro"></p><span class="band__pillar"></span><span class="band__count"></span>`;
            head.querySelector('.band__num').textContent = tr(L.need) + ' · ' + String(i + 1).padStart(2, '0');
            head.querySelector('.band__title').textContent = tr(n.title);
            head.querySelector('.band__intro').textContent = tr(n.intro);
            head.querySelector('.band__pillar').textContent = tr(PNAME[n.pillar]);
            head.querySelector('.band__count').textContent = list.length + ' ' + tr(list.length === 1 ? L.one : L.many);
            band.appendChild(head);

            const cards = document.createElement('div');
            cards.className = 'band__cards';
            list.forEach((s) => {
                const c = document.createElement('article');
                c.className = 'svc';
                c.id = s.id;
                c.innerHTML = `<div class="svc__top"><span class="svc__icon">${svg(s.icon)}</span><h4 class="svc__title"></h4></div><p class="svc__text"></p><p class="svc__get"></p><ul class="svc__list"></ul><p class="svc__ideal"><b></b> <span></span></p><a class="svc__cta"></a>`;
                const title = c.querySelector('.svc__title');
                title.textContent = tr(s.title);
                if (s.badge) {
                    const bd = document.createElement('span');
                    bd.className = 'svc__badge';
                    bd.textContent = tr(s.badge);
                    title.appendChild(bd);
                }
                c.querySelector('.svc__text').textContent = tr(s.short);
                c.querySelector('.svc__get').textContent = tr(L.get);
                const ul = c.querySelector('.svc__list');
                s.items.forEach((it) => { const li = document.createElement('li'); li.textContent = tr(it); ul.appendChild(li); });
                c.querySelector('.svc__ideal b').textContent = tr(L.ideal);
                c.querySelector('.svc__ideal span').textContent = tr(s.ideal);
                const cta = c.querySelector('.svc__cta');
                cta.href = 'contacto.html?servicio=' + s.id;
                cta.textContent = tr(L.cta);
                cards.appendChild(c);
            });
            band.appendChild(cards);
            grid.appendChild(band);
        });
    }

    // los enlaces por pilar (#code, #ai…) bajan a la primera necesidad de ese pilar
    const PILLAR_NEED = { code: 'presence', ai: 'ai', design: 'brand', marketing: 'grow' };

    // #workshops, #web… resalta ese servicio en el catálogo; #code, #ai… baja a su franja
    function fromHash() {
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (!id || id === 'missionConsole') return;
        const el = document.getElementById(PILLAR_NEED[id] ? 'need-' + PILLAR_NEED[id] : id);
        if (!el) return;
        requestAnimationFrame(() => {
            el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
            el.classList.add('is-highlight');
            setTimeout(() => el.classList.remove('is-highlight'), 2400);
        });
    }
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a || a.getAttribute('href') === '#missionConsole') return;
        e.preventDefault();
        history.replaceState(null, '', a.getAttribute('href'));
        fromHash();
    });
    window.addEventListener('hashchange', fromHash);

    /* ---------- Contadores ---------- */
    const nums = document.querySelectorAll('.stat__num');
    function run(el) {
        const to = parseInt(el.dataset.to, 10);
        if (reducedMotion || to > 999) { el.textContent = to; return; }
        const start = performance.now();
        (function step(now) {
            const k = Math.min(1, (now - start) / 1400);
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

    /* ---------- Idioma: vuelve a pintar la consola y el catálogo ---------- */
    document.querySelectorAll('.aura-lang button').forEach((b) => b.addEventListener('click', () => setTimeout(() => {
        renderCatalog();
        goTo(state.step, { silent: true });
    }, 0)));

    renderCatalog();
    goTo(1, { silent: true });
    // el saludo se escribe cuando la consola entra en pantalla
    if ('IntersectionObserver' in window && !reducedMotion) {
        const io = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) { auraSay(tr(AURA_STEP[1])); io.disconnect(); }
        }, { threshold: 0.4 });
        io.observe(document.getElementById('missionConsole'));
    }
    fromHash();
})();
