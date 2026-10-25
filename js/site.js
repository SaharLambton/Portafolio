/* ==========================================================
   SITE · Navegación, pie de página y orbe flotante de AURA
   Se comparte en todas las pestañas. La página actual se lee de
   <body data-page="home|about|projects|services|contact">.
   ========================================================== */
(function () {
    const page = document.body.dataset.page || 'home';
    const isHome = page === 'home';
    // las páginas de cada proyecto marcan la pestaña Proyectos
    const navPage = page === 'case' ? 'projects' : page;

    const NAV = [
        { id: 'home', href: 'index.html', es: 'Inicio', en: 'Home' },
        { id: 'about', href: 'sobre-mi.html', es: 'Sobre mí', en: 'About' },
        { id: 'projects', href: 'proyectos.html', es: 'Proyectos', en: 'Projects' },
        { id: 'services', href: 'servicios.html', es: 'Servicios', en: 'Services' },
        { id: 'contact', href: 'contacto.html', es: 'Contacto', en: 'Contact' }
    ];

    const ICONS = {
        voiceOn: '<svg class="i-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
        voiceOff: '<svg class="i-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/></svg>',
        menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
        mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>',
        close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>'
    };

    /* ---------- Barra superior ---------- */
    function headerHTML() {
        const links = NAV.map((n) => `<a href="${n.href}"${n.id === navPage ? ' class="is-active" aria-current="page"' : ''} data-es="${n.es}" data-en="${n.en}">${n.es}</a>`).join('');
        return `
            <a class="aura-brand" href="index.html" aria-label="Sahar Chain · Inicio">
                <i class="aura-brand__mark" aria-hidden="true"></i>
                <span>SAHAR<small>.DEV</small></span>
            </a>
            <nav class="aura-nav" id="auraNav" aria-label="Principal">${links}</nav>
            <div class="aura-controls">
                <div class="aura-lang" role="group" aria-label="Idioma / Language">
                    <button type="button" data-lang="es" class="active" aria-pressed="true">ES</button>
                    <button type="button" data-lang="en" aria-pressed="false">EN</button>
                </div>
                <button type="button" class="aura-icon-btn" id="auraVoice" aria-pressed="false" aria-label="Activar voz">${ICONS.voiceOn}${ICONS.voiceOff}</button>
                <button type="button" class="aura-icon-btn aura-menu-btn" id="auraMenu" aria-expanded="false" aria-controls="auraNav" data-es-label="Abrir menú" data-en-label="Open menu" aria-label="Abrir menú">${ICONS.menu}</button>
            </div>`;
    }

    /* ---------- Pie de página ---------- */
    function footerHTML() {
        const links = NAV.map((n) => `<a href="${n.href}" data-es="${n.es}" data-en="${n.en}">${n.es}</a>`).join('');
        return `
            <div class="site-footer__inner">
                <div class="site-footer__brand">
                    <span class="site-footer__name">Sahar Chain</span>
                    <span class="site-footer__status"><i aria-hidden="true"></i>AURA v1.0 · <span data-es="sistema en línea" data-en="system online">sistema en línea</span></span>
                </div>
                <nav class="site-footer__nav" aria-label="Pie de página">${links}</nav>
                <div class="site-footer__social">
                    <a href="mailto:sahargabriela9@gmail.com">Email</a>
                    <a href="https://www.linkedin.com/in/sahar-gabriela-chain-mayorga-b76433289" target="_blank" rel="noopener">LinkedIn</a>
                    <a href="https://github.com/SaharLambton" target="_blank" rel="noopener">GitHub</a>
                </div>
            </div>
            <p class="site-footer__copy">© ${new Date().getFullYear()} Sahar Gabriela Chain Mayorga · <span data-es="Todos los derechos reservados" data-en="All rights reserved">Todos los derechos reservados</span></p>`;
    }

    /* ---------- Orbe flotante + chat (en las pestañas internas) ---------- */
    function floatHTML() {
        const panel = isHome ? '' : `
            <div class="aura-float__panel" id="auraPanel" role="dialog" aria-label="AURA" hidden>
                <div class="aura-dialog">
                    <span class="aura-console__frame" aria-hidden="true"></span>
                    <div class="aura-dialog__head">
                        <i class="aura-dot" aria-hidden="true"></i>
                        <span>AURA</span>
                        <span class="aura-dialog__status" id="auraStatus">EN LÍNEA</span>
                        <button type="button" class="aura-skip" id="auraSkip" hidden data-es="SALTAR ▸▸" data-en="SKIP ▸▸">SALTAR ▸▸</button>
                        <button type="button" class="aura-float__close" id="auraClose" data-es-label="Cerrar chat" data-en-label="Close chat" aria-label="Cerrar chat">${ICONS.close}</button>
                    </div>
                    <div class="aura-log" id="auraLog" role="log" aria-live="polite"></div>
                </div>
                <div class="aura-chips" id="auraChips"></div>
                <form class="aura-input" id="auraForm" autocomplete="off">
                    <span class="aura-input__prompt" aria-hidden="true">&gt;_</span>
                    <input id="auraInput" type="text" maxlength="300" data-es-ph="Escribe tu pregunta..." data-en-ph="Type your question..." placeholder="Escribe tu pregunta..." aria-label="Pregunta para AURA">
                    <button type="button" class="aura-icon-btn" id="auraMic" data-es-label="Hablar con AURA" data-en-label="Talk to AURA" aria-label="Hablar con AURA">${ICONS.mic}</button>
                    <button type="submit" class="aura-send" data-es="ENVIAR" data-en="SEND">ENVIAR</button>
                </form>
            </div>`;
        return `
            <div class="aura-bubble" id="auraBubble" hidden>
                <span class="aura-bubble__who">AURA</span>
                <p class="aura-bubble__text" id="auraBubbleText"></p>
                <p class="aura-bubble__hint" id="auraBubbleHint" hidden data-es="🔊 Toca la pantalla para escucharla" data-en="🔊 Tap the screen to hear her">🔊 Toca la pantalla para escucharla</p>
                <button type="button" class="aura-bubble__close" id="auraBubbleClose" data-es-label="Cerrar" data-en-label="Close" aria-label="Cerrar">${ICONS.close}</button>
            </div>
            ${panel}
            <button type="button" class="aura-fab" id="auraFab" aria-expanded="false" data-es-label="Hablar con AURA" data-en-label="Talk to AURA" aria-label="Hablar con AURA">
                <span class="mini-orb" aria-hidden="true"><i class="mini-orb__ring"></i><i class="mini-orb__ring mini-orb__ring--b"></i><i class="mini-orb__core"></i></span>
            </button>`;
    }

    /* ---------- Montaje ---------- */
    const headerSlot = document.querySelector('[data-site-header]');
    if (headerSlot) headerSlot.innerHTML = headerHTML();
    const footerSlot = document.querySelector('[data-site-footer]');
    if (footerSlot) footerSlot.innerHTML = footerHTML();

    const float = document.createElement('div');
    float.className = 'aura-float' + (isHome ? ' aura-float--home' : '');
    float.id = 'auraFloat';
    float.innerHTML = floatHTML();
    document.body.appendChild(float);

    /* ---------- Menú móvil ---------- */
    const topbar = headerSlot;
    const menuBtn = document.getElementById('auraMenu');
    if (menuBtn && topbar) {
        menuBtn.addEventListener('click', () => {
            const open = topbar.classList.toggle('is-open');
            menuBtn.setAttribute('aria-expanded', String(open));
        });
        document.addEventListener('click', (e) => {
            if (!topbar.contains(e.target)) {
                topbar.classList.remove('is-open');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ---------- Orbe flotante ---------- */
    const fab = document.getElementById('auraFab');
    const panel = document.getElementById('auraPanel');

    function setPanel(open) {
        if (!panel) return;
        panel.hidden = !open;
        float.classList.toggle('is-open', open);
        fab.setAttribute('aria-expanded', String(open));
        if (open) {
            const bubble = document.getElementById('auraBubble');
            if (bubble) bubble.hidden = true;
            const log = document.getElementById('auraLog');
            if (log) log.scrollTop = log.scrollHeight;
            setTimeout(() => { const i = document.getElementById('auraInput'); if (i && window.matchMedia('(pointer: fine)').matches) i.focus(); }, 60);
        }
    }
    window.AuraPanel = { open: () => setPanel(true), close: () => setPanel(false), isOpen: () => !!panel && !panel.hidden };

    fab.addEventListener('click', () => {
        if (isHome) {
            // en Inicio el chat vive en el hero: volvemos a él
            const hero = document.getElementById('inicio');
            if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => { const i = document.getElementById('auraInput'); if (i) i.focus({ preventScroll: true }); }, 700);
            return;
        }
        setPanel(panel.hidden);
    });
    const closeBtn = document.getElementById('auraClose');
    if (closeBtn) closeBtn.addEventListener('click', () => { setPanel(false); fab.focus(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && window.AuraPanel.isOpen()) setPanel(false); });

    // En Inicio, el orbe flotante aparece solo cuando el hero sale de la vista
    if (isHome) {
        const hero = document.getElementById('inicio');
        if (hero && 'IntersectionObserver' in window) {
            new IntersectionObserver((entries) => {
                float.classList.toggle('is-hidden', entries[0].isIntersecting);
            }, { threshold: 0.15 }).observe(hero);
        }
    }
})();
