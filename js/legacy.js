/* Script del diseño anterior (animaciones al hacer scroll y filtros de proyectos).
   Se usa temporalmente en las pestañas que aún no se rediseñan. */
// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all h2 elements
    document.querySelectorAll('h2').forEach(h2 => {
        observer.observe(h2);
    });

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add stagger animation to skill tags
document.querySelectorAll('.skill-category').forEach(category => {
    const tags = category.querySelectorAll('.skill-tag');
    tags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
    });
});

// Initialize everything when page loads
window.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    
    // Add a slight delay to initial animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Project filtering function - MEJORADO PARA MÚLTIPLES CATEGORÍAS
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter cards with animation
    cards.forEach(card => {
        const cardCategories = card.getAttribute('data-category').split(' '); // Separa múltiples categorías
        
        // Verifica si el filtro coincide con alguna de las categorías del proyecto
        if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

