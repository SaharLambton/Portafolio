/* ==========================================================
   AURA · HUD decorativo del hero (reloj y flujo de datos)
   ========================================================== */
(function () {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Reloj ---------- */
    const clock = document.getElementById('auraClock');
    function tick() {
        if (clock) clock.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
    }
    tick();
    setInterval(tick, 1000);

    /* ---------- Flujo de datos ---------- */
    const stream = document.getElementById('auraStream');
    const words = ['SYNC', 'NODE', 'CORE', 'LINK', 'UI', 'API', 'SQL', 'NET', 'TS', 'CSS', 'BRAND', 'IOT'];
    function line() {
        const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase();
        const w = words[Math.floor(Math.random() * words.length)];
        return `0x${hex} ${w.padEnd(5, '.')} ${(Math.random() * 99).toFixed(2)}`;
    }
    if (stream) {
        for (let i = 0; i < 4; i++) {
            const s = document.createElement('span');
            s.textContent = line();
            stream.appendChild(s);
        }
        if (!reducedMotion) {
            setInterval(() => {
                if (document.hidden) return;
                const s = document.createElement('span');
                s.textContent = line();
                stream.appendChild(s);
                if (stream.children.length > 4) stream.removeChild(stream.firstChild);
            }, 650);
        }
    }

})();
