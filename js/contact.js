/* ==========================================================
   CONTACTO · formulario (Formspree), WhatsApp y servicio preseleccionado
   ========================================================== */
(function () {
    // Pega aquí el código de tu formulario de Formspree (lo que va después de /f/ en
    // https://formspree.io/f/XXXXXXXX). Mientras esté vacío, el formulario abre el
    // correo de la persona con el mensaje ya redactado.
    const FORMSPREE_ID = '';

    const EMAIL = 'sahargabriela9@gmail.com';
    const WHATSAPP = '573204499948';

    const form = document.getElementById('contactForm');
    if (!form) return;
    const status = document.getElementById('cfStatus');
    const submit = document.getElementById('cfSubmit');
    const service = document.getElementById('cfService');
    const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'es');

    const T = {
        required: { es: 'Completa los campos marcados para poder enviar tu mensaje.', en: 'Fill in the highlighted fields to send your message.' },
        email: { es: 'Revisa tu correo electrónico: parece que no es válido.', en: 'Check your email address: it doesn\'t look valid.' },
        sending: { es: 'Enviando…', en: 'Sending…' },
        sent: { es: '¡Mensaje enviado! ✓ Te respondo en 24–48 horas.', en: 'Message sent! ✓ I\'ll reply within 24–48 hours.' },
        error: { es: 'No se pudo enviar. Inténtalo de nuevo o escríbeme a ' + EMAIL + '.', en: 'It couldn\'t be sent. Try again or email me at ' + EMAIL + '.' },
        mailto: { es: 'Se abrió tu aplicación de correo con el mensaje listo. Solo tienes que enviarlo.', en: 'Your email app opened with the message ready. You just need to send it.' },
        subject: { es: 'Nuevo contacto desde el portafolio', en: 'New contact from the portfolio' },
        wa: { es: '¡Hola Sahar! Vi tu portafolio y me gustaría hablar sobre un proyecto.', en: 'Hi Sahar! I saw your portfolio and I\'d like to talk about a project.' }
    };
    const t = (k) => T[k][lang()];

    /* ---------- Servicio preseleccionado (contacto.html?servicio=web) ---------- */
    const pre = new URLSearchParams(window.location.search).get('servicio');
    if (pre && service.querySelector(`option[value="${CSS.escape(pre)}"]`)) service.value = pre;

    /* ---------- Plan de "Diseña tu misión" (contacto.html?plan=…) ---------- */
    const planParam = new URLSearchParams(window.location.search).get('plan');
    const message = document.getElementById('cfMessage');
    if (planParam && message && !message.value) {
        const intro = document.documentElement.lang === 'en' ? 'My mission plan:' : 'Mi plan de misión:';
        message.value = `${intro}\n${planParam}\n\n`;
    }

    /* ---------- WhatsApp con mensaje inicial en el idioma activo ---------- */
    const wa = document.getElementById('whatsappLink');
    function updateWhatsApp() {
        if (wa) wa.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t('wa'))}`;
    }
    updateWhatsApp();
    document.querySelectorAll('.aura-lang button').forEach((b) => b.addEventListener('click', () => setTimeout(updateWhatsApp, 0)));

    /* ---------- Validación ---------- */
    function setStatus(msg, kind) {
        status.textContent = msg;
        status.dataset.kind = kind || '';
    }
    function validate() {
        let ok = true;
        form.querySelectorAll('[required]').forEach((el) => {
            const bad = !el.value.trim() || (el.type === 'email' && !el.checkValidity());
            el.closest('.field').classList.toggle('is-invalid', bad);
            el.setAttribute('aria-invalid', String(bad));
            if (bad) ok = false;
        });
        if (!ok) {
            const email = form.querySelector('#cfEmail');
            setStatus(email.value.trim() && !email.checkValidity() ? t('email') : t('required'), 'error');
            const first = form.querySelector('.is-invalid input, .is-invalid select, .is-invalid textarea');
            if (first) first.focus();
            if (window.SFX) window.SFX.play('error');
        }
        return ok;
    }
    form.addEventListener('input', (e) => {
        const field = e.target.closest('.field');
        if (field && field.classList.contains('is-invalid') && e.target.value.trim()) {
            field.classList.remove('is-invalid');
            e.target.setAttribute('aria-invalid', 'false');
        }
    });

    /* ---------- Envío ---------- */
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (form._gotcha.value) return; // bot
        if (!validate()) return;

        const data = new FormData(form);
        const serviceLabel = service.options[service.selectedIndex].textContent;
        data.set('servicio', serviceLabel);
        data.set('_subject', `${t('subject')} · ${serviceLabel}`);

        if (!FORMSPREE_ID) {
            // sin Formspree: abre el correo de la persona con todo redactado
            const body = [
                `${data.get('mensaje')}`,
                '',
                `— ${data.get('nombre')}${data.get('empresa') ? ' · ' + data.get('empresa') : ''}`,
                `${data.get('email')}`,
                `(${serviceLabel})`
            ].join('\n');
            window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(data.get('_subject'))}&body=${encodeURIComponent(body)}`;
            setStatus(t('mailto'), 'ok');
            if (window.SFX) window.SFX.play('success');
            return;
        }

        submit.disabled = true;
        setStatus(t('sending'), '');
        try {
            const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' }
            });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            form.reset();
            setStatus(t('sent'), 'ok');
            if (window.SFX) window.SFX.play('success');
            if (window.AuraComment) window.AuraComment('sent', { es: '¡Listo! Tu mensaje ya va en camino hacia Sahar 🚀', en: 'Done! Your message is on its way to Sahar 🚀' });
        } catch (err) {
            setStatus(t('error'), 'error');
            if (window.SFX) window.SFX.play('error');
        } finally {
            submit.disabled = false;
        }
    });
})();
