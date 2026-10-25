/* ==========================================================
   AURA · Asistente: bienvenida, chat, voz e idioma
   ========================================================== */
(function () {
    const KB = window.AURA_KB;
    const NAME = KB.config.name;
    const orb = () => window.AuraOrb || { setState() {}, pulse() {}, poke() {} };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const $ = (sel) => document.querySelector(sel);
    const els = {
        log: $('#auraLog'),
        chips: $('#auraChips'),
        form: $('#auraForm'),
        input: $('#auraInput'),
        mic: $('#auraMic'),
        voice: $('#auraVoice'),
        status: $('#auraStatus'),
        skip: $('#auraSkip'),
        featured: $('#auraFeatured'),
        boot: $('#auraBoot'),
        bootLog: $('#auraBootLog')
    };

    /* ---------- Almacenamiento seguro ---------- */
    const store = {
        get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } },
        sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
        sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
    };

    const state = {
        lang: store.get('aura-lang') === 'en' ? 'en' : 'es',
        voice: store.get('aura-voice') === 'on',
        token: 0,          // invalida mensajes en curso cuando llega uno nuevo
        welcoming: false,
        history: [],
        replyLang: null
    };

    // replyLang: idioma detectado en la pregunta (si alguien escribe en inglés con el sitio en español)
    const tr = (obj) => (obj ? (obj[state.replyLang || state.lang] || obj.es) : '');
    const fill = (str, vars) => str.replace(/\{(\w+)\}/g, (m, k) => (vars && vars[k] != null ? vars[k] : (k === 'name' ? NAME : m)));
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[¿?¡!.,;:()"']/g, ' ').replace(/\s+/g, ' ').trim();

    const UI = {
        status: {
            idle: { es: 'EN LÍNEA', en: 'ONLINE' },
            thinking: { es: 'PROCESANDO', en: 'PROCESSING' },
            speaking: { es: 'TRANSMITIENDO', en: 'TRANSMITTING' },
            listening: { es: 'ESCUCHANDO', en: 'LISTENING' }
        },
        you: { es: 'TÚ', en: 'YOU' },
        details: { es: 'Ver detalles', en: 'View details' },
        repo: { es: 'Ver en GitHub', en: 'View on GitHub' },
        voiceOn: { es: 'Desactivar voz', en: 'Turn voice off' },
        voiceOff: { es: 'Activar voz', en: 'Turn voice on' },
        boot: {
            es: ['> Inicializando núcleo {name}...', '> Cargando módulos: proyectos · habilidades · experiencia', '> Calibrando matriz holográfica', '> Enlace neural establecido ✓'],
            en: ['> Initializing {name} core...', '> Loading modules: projects · skills · experience', '> Calibrating holographic matrix', '> Neural link established ✓']
        }
    };

    /* ---------- Estado visual ---------- */
    function setStatus(s) {
        orb().setState(s);
        document.documentElement.dataset.auraState = s;
        if (els.status) els.status.textContent = tr(UI.status[s] || UI.status.idle);
    }

    /* ---------- Voz (Web Speech API) ---------- */
    const synth = window.speechSynthesis;
    let voices = [];
    function loadVoices() { voices = synth ? synth.getVoices() : []; }
    if (synth) { loadVoices(); synth.onvoiceschanged = loadVoices; }

    function pickVoice(lang) {
        const want = lang === 'es' ? 'es' : 'en';
        const list = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith(want));
        const prefer = ['google', 'natural', 'neural', 'paulina', 'monica', 'helena', 'samantha', 'sabina', 'elena'];
        return list.find((v) => prefer.some((p) => v.name.toLowerCase().includes(p))) || list[0] || null;
    }

    function speak(text, lang = state.lang) {
        if (!synth || !state.voice) return Promise.resolve();
        synth.cancel();
        const clean = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/gu, '').replace(/\s+/g, ' ').trim();
        if (!clean) return Promise.resolve();
        return new Promise((resolve) => {
            const u = new SpeechSynthesisUtterance(clean);
            u.lang = lang === 'es' ? 'es-ES' : 'en-US';
            const v = pickVoice(lang);
            if (v) u.voice = v;
            u.rate = 1.03;
            u.pitch = 1.08;
            u.onboundary = () => orb().pulse(0.45);
            u.onend = resolve;
            u.onerror = resolve;
            // algunos navegadores nunca disparan onend: límite de seguridad
            setTimeout(resolve, clean.length * 95 + 2500);
            synth.speak(u);
        });
    }

    function updateVoiceButton() {
        if (!els.voice) return;
        els.voice.classList.toggle('is-on', state.voice);
        els.voice.setAttribute('aria-pressed', String(state.voice));
        const label = tr(state.voice ? UI.voiceOn : UI.voiceOff);
        els.voice.setAttribute('aria-label', label);
        els.voice.title = label;
    }

    /* ---------- Mensajes ---------- */
    function addMessage(who) {
        const row = document.createElement('div');
        row.className = 'aura-msg aura-msg--' + who;
        const tag = document.createElement('span');
        tag.className = 'aura-msg__who';
        tag.textContent = who === 'ai' ? NAME : tr(UI.you);
        const body = document.createElement('p');
        body.className = 'aura-msg__text';
        row.append(tag, body);
        els.log.appendChild(row);
        // máximo 24 mensajes en pantalla
        while (els.log.children.length > 24) els.log.removeChild(els.log.firstChild);
        return body;
    }

    function scrollLog() { els.log.scrollTop = els.log.scrollHeight; }

    let fastForward = false;
    async function say(text, { token = state.token, extras, lang } = {}) {
        text = fill(text);
        const body = addMessage('ai');
        body.classList.add('is-typing');
        setStatus('speaking');
        const voiceDone = speak(text, lang || state.lang);
        const chars = Array.from(text);
        const delay = reducedMotion ? 0 : 18;
        for (let i = 0; i < chars.length; i++) {
            if (token !== state.token) break;
            if (fastForward || delay === 0) { body.textContent = text; break; }
            body.textContent += chars[i];
            if (i % 3 === 0) orb().pulse(0.12);
            if (i % 6 === 0) scrollLog();
            await sleep(/[.,!?…]/.test(chars[i]) ? delay * 6 : delay);
        }
        body.textContent = text;
        body.classList.remove('is-typing');
        if (extras) extras(body.parentElement);
        scrollLog();
        if (token === state.token) await voiceDone;
        if (token === state.token) setStatus('idle');
        state.history.push({ role: 'assistant', content: text });
    }

    function userSays(text) {
        const body = addMessage('user');
        body.textContent = text;
        scrollLog();
        state.history.push({ role: 'user', content: text });
    }

    /* ---------- Chips (sugerencias y acciones) ---------- */
    function renderChips(items) {
        els.chips.innerHTML = '';
        (items || []).forEach((item, i) => {
            const el = document.createElement(item.href ? 'a' : 'button');
            el.className = 'aura-chip' + (item.primary ? ' aura-chip--primary' : '');
            el.style.setProperty('--i', i);
            el.textContent = item.label;
            if (item.href) {
                el.href = item.href;
                if (/^https?:/.test(item.href)) { el.target = '_blank'; el.rel = 'noopener'; }
            } else {
                el.type = 'button';
                el.addEventListener('click', item.onClick);
            }
            els.chips.appendChild(el);
        });
    }

    function topicChip(id) {
        const label = KB.chips.labels[id];
        return label ? { label: tr(label), onClick: () => ask(tr(label), { intentId: id }) } : null;
    }
    function projectChip(p) {
        return { label: p.name, onClick: () => ask(p.name, { projectId: p.id }) };
    }
    function actionChip(action) {
        return { label: tr(action.label) + ' ↓', primary: true, onClick: () => runAction(action) };
    }
    const defaultChips = () => KB.chips.default.map(topicChip).filter(Boolean);

    /* ---------- Acciones de la interfaz ---------- */
    function runAction(action) {
        if (!action) return;
        if (action.type === 'scroll') {
            const target = document.querySelector(action.target);
            if (target) target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start', inline: 'nearest' });
        } else if (action.type === 'open') {
            if (action.external) window.open(action.url, '_blank', 'noopener');
            else window.location.href = action.url;
        }
    }

    /* ---------- Motor de respuestas local ---------- */
    function hasKey(q, key) {
        const k = norm(key);
        if (!k) return false;
        if (k.includes(' ') || /[^a-z0-9]/.test(k)) return (' ' + q + ' ').includes(' ' + k + ' ') || q.includes(k);
        return new RegExp('(^|\\s)' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(es|s)?(\\s|$)').test(q);
    }

    const GO_WORDS = ['llevame', 'ir a', 'vamos a', 'muestrame', 'abre', 'abrir', 'navega', 'take me', 'go to', 'show me', 'open', 'navigate'];

    function findProject(q) {
        let best = null;
        KB.projects.forEach((p) => {
            const keys = [p.name].concat(p.keys);
            const score = keys.reduce((s, k) => s + (hasKey(q, k) ? 1 + norm(k).split(' ').length : 0), 0);
            if (score && (!best || score > best.score)) best = { p, score };
        });
        return best && best.p;
    }

    function findTech(q) {
        const padded = ' ' + q + ' ';
        const known = Object.keys(KB.tech.known)
            .filter((k) => padded.includes(' ' + norm(k) + ' '))
            .sort((a, b) => norm(b).length - norm(a).length)[0];
        if (known) return { known: KB.tech.known[known] };
        const unknown = KB.tech.unknown.find((k) => padded.includes(' ' + k + ' '));
        if (unknown) return { unknown: unknown.charAt(0).toUpperCase() + unknown.slice(1) };
        return null;
    }

    function findIntent(q) {
        let best = null;
        KB.intents.forEach((intent, order) => {
            const keys = intent.keys.concat(intent.id === 'whoami' ? [NAME.toLowerCase()] : []);
            let score = 0;
            keys.forEach((k) => { if (hasKey(q, k)) score += norm(k).split(' ').length > 1 ? 2 : 1; });
            score *= intent.weight || 1;
            if (score > 0 && (!best || score > best.score)) best = { intent, score, order };
        });
        return best;
    }

    function projectAnswer(p) {
        const chips = [];
        chips.push({ label: tr(p.external ? UI.repo : UI.details) + ' ↗', primary: true, onClick: () => runAction({ type: 'open', url: p.url, external: p.external }) });
        KB.projects.filter((o) => o.area === p.area && o.id !== p.id).slice(0, 2).forEach((o) => chips.push(projectChip(o)));
        chips.push(topicChip('projects'));
        return { text: tr(p.desc), chips };
    }

    function intentAnswer(intent) {
        const chips = [];
        if (intent.action) chips.push(actionChip(intent.action));
        (intent.links || []).forEach((l) => chips.push({ label: l.label + ' ↗', href: l.href }));
        (intent.projects || []).forEach((id) => {
            const p = KB.projects.find((x) => x.id === id);
            if (p) chips.push(projectChip(p));
        });
        (intent.chips || []).forEach((id) => { const c = topicChip(id); if (c) chips.push(c); });
        return { text: tr(intent.answer), chips: chips.length ? chips : defaultChips(), action: intent.action };
    }

    function localAnswer(raw, hint) {
        if (hint && hint.projectId) return projectAnswer(KB.projects.find((p) => p.id === hint.projectId));
        if (hint && hint.intentId) return intentAnswer(KB.intents.find((i) => i.id === hint.intentId));

        const q = norm(raw);
        const project = findProject(q);
        if (project) return projectAnswer(project);

        const intent = findIntent(q);
        const tech = findTech(q);
        // preguntas puntuales sobre una tecnología ("¿sabe Python?")
        if (tech && (!intent || ['skills', 'code', 'web', 'projects'].includes(intent.intent.id) || intent.score < 2)) {
            if (tech.known) {
                const n = norm(tech.known);
                const used = KB.projects.filter((p) => p.tech.some((t) => norm(t) === n || norm(t).startsWith(n + ' ')));
                const extra = used.length ? fill(tr(KB.tech.usedIn), { list: used.map((p) => p.name).join(', ') }) : '';
                return { text: fill(tr(KB.tech.yes), { tech: tech.known, extra }).trim(), chips: used.slice(0, 3).map(projectChip).concat([topicChip('skills')]) };
            }
            return { text: fill(tr(KB.tech.no), { tech: tech.unknown }), chips: [topicChip('skills'), topicChip('projects')] };
        }
        if (intent) {
            const res = intentAnswer(intent.intent);
            res.go = GO_WORDS.some((w) => hasKey(q, w));
            return res;
        }
        return null;
    }

    const LANG_HINTS = {
        es: ['que', 'quien', 'como', 'donde', 'cual', 'sus', 'ella', 'tiene', 'sabe', 'es', 'de', 'la', 'el', 'los', 'las', 'para', 'con', 'hola', 'gracias', 'muestrame', 'llevame', 'hablame', 'esta', 'un', 'una'],
        en: ['what', 'who', 'how', 'where', 'which', 'her', 'she', 'does', 'is', 'are', 'the', 'of', 'for', 'with', 'hello', 'thanks', 'show', 'take', 'tell', 'me', 'you', 'can', 'about', 'do', 'a', 'an']
    };
    function detectLang(raw) {
        const words = norm(raw).split(' ');
        const score = (l) => words.filter((w) => LANG_HINTS[l].includes(w)).length;
        const es = score('es') + (/[ñ¿¡áéíóú]/i.test(raw) ? 2 : 0);
        const en = score('en');
        if (en >= 2 && en > es) return 'en';
        if (es >= 2 && es > en) return 'es';
        return state.lang;
    }

    async function remoteAnswer(raw) {
        if (!KB.config.aiEndpoint) return null;
        try {
            const res = await fetch(KB.config.aiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: raw, lang: state.lang, history: state.history.slice(-10) })
            });
            if (!res.ok) return null;
            const data = await res.json();
            return data && data.reply ? { text: data.reply, chips: defaultChips() } : null;
        } catch (e) { return null; }
    }

    /* ---------- Preguntar ---------- */
    async function ask(raw, hint) {
        raw = (raw || '').trim();
        if (!raw) return;
        const token = ++state.token;
        state.welcoming = false;
        els.skip && els.skip.setAttribute('hidden', '');
        fastForward = false;
        if (synth) synth.cancel();
        userSays(raw);
        renderChips([]);
        setStatus('thinking');
        await sleep(reducedMotion ? 150 : 550 + Math.random() * 350);
        if (token !== state.token) return;

        state.replyLang = hint ? null : detectLang(raw);
        let res = localAnswer(raw, hint);
        if (!res) res = await remoteAnswer(raw);
        if (!res) res = { text: tr(KB.fallback), chips: defaultChips() };
        if (token !== state.token) return;

        const replyLang = state.replyLang;
        await say(res.text, { token, lang: replyLang });
        state.replyLang = null;
        if (token !== state.token) return;
        renderChips(res.chips.filter(Boolean));
        if (res.go && res.action) setTimeout(() => runAction(res.action), 400);
    }

    /* ---------- Bienvenida ---------- */
    async function welcome(lines) {
        const token = ++state.token;
        state.welcoming = true;
        els.skip && els.skip.removeAttribute('hidden');
        for (let i = 0; i < lines.length; i++) {
            if (token !== state.token) return;
            await say(lines[i], { token });
            if (token !== state.token) return;
            if (i < lines.length - 1) await sleep(fastForward ? 0 : 650);
        }
        fastForward = false;
        state.welcoming = false;
        els.skip && els.skip.setAttribute('hidden', '');
        renderChips(defaultChips());
    }

    /* ---------- Arranque (boot) ---------- */
    async function boot() {
        const seen = store.sget('aura-booted') === '1';
        store.sset('aura-booted', '1');
        if (els.boot && !seen && !reducedMotion) {
            const lines = tr(UI.boot).map((l) => fill(l));
            for (const l of lines) {
                const p = document.createElement('p');
                p.textContent = l;
                els.bootLog.appendChild(p);
                await sleep(380);
            }
            await sleep(300);
        }
        if (els.boot) {
            els.boot.classList.add('is-done');
            setTimeout(() => els.boot.remove(), 900);
        }
        document.documentElement.classList.add('aura-ready');
        await sleep(seen || reducedMotion ? 300 : 1100);
        if (seen) {
            await welcome([tr(KB.returning)]);
        } else {
            await welcome(tr(KB.welcome));
        }
    }

    /* ---------- Idioma (todo el sitio) ---------- */
    function applyLanguage(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-es][data-en]').forEach((el) => {
            const text = el.getAttribute('data-' + lang);
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = text;
            else el.textContent = text;
        });
        document.querySelectorAll('[data-es-ph][data-en-ph]').forEach((el) => {
            el.placeholder = el.getAttribute('data-' + lang + '-ph');
        });
        document.querySelectorAll('[data-es-label][data-en-label]').forEach((el) => {
            el.setAttribute('aria-label', el.getAttribute('data-' + lang + '-label'));
        });
        document.querySelectorAll('.aura-lang button').forEach((b) => {
            const on = b.dataset.lang === lang;
            b.classList.toggle('active', on);
            b.setAttribute('aria-pressed', String(on));
        });
        // compatibilidad con los botones de idioma antiguos
        document.querySelectorAll('.lang-btn').forEach((b) => b.classList.toggle('active', b.textContent.trim().toLowerCase() === lang));
    }

    function setLanguage(lang, { announce = true } = {}) {
        if (lang !== 'es' && lang !== 'en') return;
        const changed = lang !== state.lang;
        state.lang = lang;
        store.set('aura-lang', lang);
        applyLanguage(lang);
        renderFeatured();
        updateVoiceButton();
        setStatus(document.documentElement.dataset.auraState || 'idle');
        if (changed && announce && document.documentElement.classList.contains('aura-ready')) {
            const token = ++state.token;
            if (synth) synth.cancel();
            state.welcoming = false;
            els.skip && els.skip.setAttribute('hidden', '');
            say(tr(KB.langSwitched), { token }).then(() => { if (token === state.token) renderChips(defaultChips()); });
        }
    }
    window.setSiteLanguage = setLanguage;
    window.changeLanguage = (lang) => setLanguage(lang);

    /* ---------- Destacados ---------- */
    function renderFeatured() {
        if (!els.featured) return;
        els.featured.innerHTML = '';
        KB.featured.forEach((id, i) => {
            const p = KB.projects.find((x) => x.id === id);
            if (!p) return;
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'aura-card';
            card.style.setProperty('--i', i);
            const media = document.createElement('span');
            media.className = 'aura-card__media';
            if (p.thumb) {
                const img = document.createElement('img');
                img.src = p.thumb;
                img.alt = '';
                img.width = 64;
                img.height = 48;
                media.appendChild(img);
            } else {
                media.classList.add('aura-card__media--glyph');
                media.textContent = '⟁';
            }
            const info = document.createElement('span');
            info.className = 'aura-card__info';
            const title = document.createElement('span');
            title.className = 'aura-card__title';
            title.textContent = p.name;
            const tag = document.createElement('span');
            tag.className = 'aura-card__tag';
            tag.textContent = tr(p.tag) || p.tech.slice(0, 2).join(' · ');
            info.append(title, tag);
            card.append(media, info);
            card.addEventListener('click', () => ask(p.name, { projectId: p.id }));
            els.featured.appendChild(card);
        });
    }

    /* ---------- Reconocimiento de voz (micrófono) ---------- */
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognizer = null;
    if (els.mic) {
        if (!Recognition) {
            els.mic.setAttribute('hidden', '');
        } else {
            els.mic.addEventListener('click', () => {
                if (recognizer) { recognizer.stop(); return; }
                recognizer = new Recognition();
                recognizer.lang = state.lang === 'es' ? 'es-ES' : 'en-US';
                recognizer.interimResults = true;
                recognizer.maxAlternatives = 1;
                if (synth) synth.cancel();
                els.mic.classList.add('is-on');
                setStatus('listening');
                recognizer.onresult = (e) => {
                    const r = e.results[e.results.length - 1];
                    els.input.value = r[0].transcript;
                    orb().pulse(0.3);
                    if (r.isFinal) { const v = els.input.value; els.input.value = ''; ask(v); }
                };
                recognizer.onend = recognizer.onerror = () => {
                    els.mic.classList.remove('is-on');
                    recognizer = null;
                    if (document.documentElement.dataset.auraState === 'listening') setStatus('idle');
                };
                recognizer.start();
            });
        }
    }

    /* ---------- Eventos ---------- */
    els.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const v = els.input.value;
        els.input.value = '';
        ask(v);
    });

    els.voice && els.voice.addEventListener('click', () => {
        state.voice = !state.voice;
        store.set('aura-voice', state.voice ? 'on' : 'off');
        updateVoiceButton();
        if (!state.voice && synth) synth.cancel();
        if (state.voice) {
            // lee en voz alta el último mensaje para confirmar
            const last = els.log.querySelector('.aura-msg--ai:last-of-type .aura-msg__text');
            if (last && !last.classList.contains('is-typing')) {
                setStatus('speaking');
                const token = state.token;
                speak(last.textContent).then(() => { if (token === state.token) setStatus('idle'); });
            }
        }
    });

    els.skip && els.skip.addEventListener('click', () => {
        fastForward = true;
        if (synth) synth.cancel();
    });

    document.querySelectorAll('.aura-lang button').forEach((b) => b.addEventListener('click', () => setLanguage(b.dataset.lang)));

    window.addEventListener('aura:poke', () => {
        if (state.welcoming) return;
        const lines = tr(KB.poke);
        const token = ++state.token;
        say(lines[Math.floor(Math.random() * lines.length)], { token }).then(() => { if (token === state.token) renderChips(defaultChips()); });
    });

    if (!synth && els.voice) els.voice.setAttribute('hidden', '');

    /* ---------- Inicio ---------- */
    applyLanguage(state.lang);
    renderFeatured();
    updateVoiceButton();
    setStatus('idle');
    boot();
})();
