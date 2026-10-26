/* ==========================================================
   TESTIMONIOS · la sección aparece sola cuando hay al menos uno
   Para agregar uno, copia el ejemplo comentado y llena los datos
   con las palabras reales del cliente (y su permiso para publicarlas).
   ========================================================== */
window.TESTIMONIALS = [
    // {
    //     quote: { es: 'Texto del cliente en español.', en: 'Client quote in English.' },
    //     name: 'Nombre Apellido',
    //     role: { es: 'Cargo', en: 'Role' },
    //     company: 'Empresa',
    //     project: 'taller-ia.html'   // opcional: enlace al caso
    // }
];

(function () {
    const list = window.TESTIMONIALS || [];
    const slots = document.querySelectorAll('[data-testimonials]');
    if (!list.length || !slots.length) return;
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
    const bi = (tag, cls, o) => `<${tag} class="${cls}" data-es="${esc(o.es)}" data-en="${esc(o.en)}">${esc(o[lang])}</${tag}>`;
    const cards = list.map((t) => `
        <figure class="testimonial">
            <blockquote>${bi('p', 'testimonial__quote', { es: '“' + t.quote.es + '”', en: '“' + t.quote.en + '”' })}</blockquote>
            <figcaption class="testimonial__who">
                <b>${esc(t.name)}</b>
                <span>${bi('span', '', t.role)} · ${esc(t.company)}</span>
                ${t.project ? `<a href="${esc(t.project)}" data-es="Ver el proyecto →" data-en="See the project →">${lang === 'en' ? 'See the project →' : 'Ver el proyecto →'}</a>` : ''}
            </figcaption>
        </figure>`).join('');
    slots.forEach((slot) => {
        slot.innerHTML = `
            <p class="testimonials__overline" data-es="// LO QUE DICEN MIS CLIENTES" data-en="// WHAT MY CLIENTS SAY">${lang === 'en' ? '// WHAT MY CLIENTS SAY' : '// LO QUE DICEN MIS CLIENTES'}</p>
            <h2 class="testimonials__title" data-es="Testimonios" data-en="Testimonials">${lang === 'en' ? 'Testimonials' : 'Testimonios'}</h2>
            <div class="testimonials__grid">${cards}</div>`;
        slot.hidden = false;
    });
})();
