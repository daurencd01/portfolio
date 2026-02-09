document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Initialization
    // Check localStorage first, fallback to 'en'
    const savedLang = localStorage.getItem('portfolio_lang') || 'en';
    window.switchLanguage(savedLang);

    // 2. Observer for Fade Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// Global Switch Language Function
window.switchLanguage = function (lang) {
    console.log('Switching language to:', lang);

    // Save preference
    localStorage.setItem('portfolio_lang', lang);

    // Update Content Visibility
    // Select ALL elements that have a data-lang attribute
    const allLangElements = document.querySelectorAll('[data-lang]');

    allLangElements.forEach(el => {
        // If element's lang matches selected lang -> Show it
        if (el.getAttribute('data-lang') === lang) {
            el.classList.remove('hidden');
        } else {
            // Otherwise -> Hide it
            el.classList.add('hidden');
        }
    });

    // Update Buttons Active State
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update HTML Tag Lang Attribute
    document.documentElement.lang = lang;
};
