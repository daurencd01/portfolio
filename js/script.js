document.addEventListener('DOMContentLoaded', () => {
    // 0. Hide Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Ensure preloader shows for at least 300ms for smooth UX
        const minDisplayTime = 300;
        const startTime = performance.now();

        window.addEventListener('load', () => {
            const elapsedTime = performance.now() - startTime;
            const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

            setTimeout(() => {
                preloader.classList.add('hidden');
            }, remainingTime);
        });
    }

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

    // Observe all fade-on-scroll elements
    document.querySelectorAll('.fade-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Observe section titles for animated dividers
    document.querySelectorAll('.section-title, .gallery-group-title').forEach(el => {
        observer.observe(el);
    });

    // Observe content sections for smooth transitions
    document.querySelectorAll('.content-section').forEach(el => {
        observer.observe(el);
    });

    // 3. Initialize Premium Particles Background
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        const particleCount = 30; // Max 40 for performance

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random Properties
            const size = Math.random() * 3 + 1; // 1px to 4px
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 20; // 20s to 40s (Very slow)
            const delay = Math.random() * -40; // Start immediately (negative delay)
            const opacity = Math.random() * 0.4 + 0.1; // 0.1 to 0.5

            // Random Drift Vectors
            const tx = (Math.random() - 0.5) * 60; // -30px to 30px
            const ty = (Math.random() - 0.5) * 60; // -30px to 30px

            // Apply Styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.setProperty('--opacity', opacity);

            // Use CSS Animation
            particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;

            particlesContainer.appendChild(particle);
        }
    }

    // 4. Mobile Navigation Logic
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .btn-contact'); // Select nav links and contact button

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate close
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });

        // Close menu when clicking outside (on the backdrop part if width < 100vw, though here it is 100vw)
        // But good practice for future
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // 5. Smart Sticky Header & ScrollSpy (Performance Optimized)
    const nav = document.querySelector('.glass-nav');
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;

                // Toggle Scrolled State (Compact Mode)
                if (currentScrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }

                // Smart Hide/Show Logic
                // Hide when scrolling DOWN, Show when scrolling UP
                if (currentScrollY > lastScrollY && currentScrollY > 100 && !document.body.classList.contains('nav-open')) {
                    nav.classList.add('nav-hidden');
                } else {
                    nav.classList.remove('nav-hidden');
                }

                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    }, {
        passive: true
    });

    // ScrollSpy: Highlight Active Section
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    const observerSpy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id) {
                    navItems.forEach(link => {
                        // Check if link href matches section id
                        const href = link.getAttribute('href');
                        if (href === `#${id}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is in the upper middle of viewport
        threshold: 0
    });

    sections.forEach(section => observerSpy.observe(section));
});

// Global Switch Language Function
window.switchLanguage = function (lang) {
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
