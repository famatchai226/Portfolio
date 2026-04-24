/* ============================================
   PORTFOLIO - Main JavaScript
   Gestion des animations, parallaxe et navigation
   Author: Ibrahim Aboubacar Antoine KY
   ============================================ */

/* ============================================
   1. NAVIGATION
   - Active state selon section visible
   - Navbar background au scroll
   - Smooth scroll vers sections
   ============================================ */

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section, .hero');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');

        this.init();
    }

    init() {
        // Scroll event pour navbar background
        this.handleNavbarScroll();
        window.addEventListener('scroll', () => this.handleNavbarScroll());

        // Active state avec Intersection Observer
        this.observeSections();

        // Smooth scroll
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.smoothScroll(e));
        });

        // Menu hamburger mobile
        this.hamburger.addEventListener('click', () => this.toggleMenu());

        // Fermer menu au clic sur lien
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Fermer menu au clic en dehors
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                this.closeMenu();
            }
        });
    }

    // Navbar devient opaque au scroll
    handleNavbarScroll() {
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    // Observe sections pour active state
    // ⚡ Approche scroll-based au lieu d'Intersection Observer pur
    // Pourquoi ? Les sections longues (ex: Compétences) ne trigger pas
    // correctement un threshold élevé. En calculant quelle section
    // est la plus proche du centre du viewport, on obtient un résultat fiable.
    observeSections() {
        const updateActiveLink = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            
            let currentSection = null;
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            if (currentSection) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }
        };
        
        // Throttle pour performance (16ms ≈ 60fps)
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveLink();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Initial check
        updateActiveLink();
    }

    // Smooth scroll vers sections
    smoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');

        // Uniquement pour les anchor links
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80; // Offset pour navbar fixed
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Toggle menu mobile
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Close menu
    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ============================================
   2. PARALLAX EFFECT
   - Effet subtil sur Hero section
   - Vitesses différentielles pour profondeur
   - Optimisé 60fps avec requestAnimationFrame
   ============================================ */

class ParallaxEffect {
    constructor() {
        this.parallaxBg = document.getElementById('parallaxBg');
        this.heroContent = document.getElementById('heroContent');
        this.isDesktop = window.innerWidth > 768;
        this.ticking = false;

        if (this.isDesktop && this.parallaxBg && this.heroContent) {
            this.init();
        }
    }

    init() {
        // Scroll event avec requestAnimationFrame pour performance
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.updateParallax();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });

        // Update on resize (check si toujours desktop)
        window.addEventListener('resize', () => {
            this.isDesktop = window.innerWidth > 768;
        });
    }

    updateParallax() {
        if (!this.isDesktop) return;

        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        // Uniquement si on est dans la hero section
        if (scrolled < heroHeight) {
            // Background shapes: vitesse 0.5x (plus lent = arrière-plan)
            this.parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;

            // Content: vitesse 1.2x (plus rapide = premier plan)
            // Effet de profondeur subtil
            this.heroContent.style.transform = `translateY(${scrolled * -0.2}px)`;

            // Opacity fade out pour transition smooth
            const opacity = 1 - (scrolled / heroHeight) * 0.5;
            this.heroContent.style.opacity = opacity;
        }
    }
}

/* ============================================
   3. SCROLL ANIMATIONS
   - Fade-in au scroll avec Intersection Observer
   - Transition delay progressive pour cartes
   ============================================ */

class ScrollAnimations {
    constructor() {
        this.fadeElements = document.querySelectorAll('.fade-in');
        this.init();
    }

    init() {
        const options = {
            threshold: 0.15, // 15% de l'élément visible
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class pour trigger animation
                    entry.target.classList.add('visible');

                    // Stop observing une fois visible (performance)
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.fadeElements.forEach(element => observer.observe(element));
    }
}

/* ============================================
   4. SKILL CARDS STAGGER ANIMATION
   - Apparition progressive des cartes
   - Delay de 100ms entre chaque carte
   ============================================ */

class SkillsAnimation {
    constructor() {
        this.skillCards = document.querySelectorAll('.skill-card');
        this.init();
    }

    init() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.skill-card');

                    // Stagger animation avec delay progressif
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100); // 100ms delay entre chaque
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observer chaque catégorie de skills
        const categories = document.querySelectorAll('.skills-category');
        categories.forEach(category => {
            // Initial state
            const cards = category.querySelectorAll('.skill-card');
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });

            observer.observe(category);
        });
    }
}

/* ============================================
   5. PERFORMANCE MONITORING
   - Log FPS en dev mode (optionnel)
   - Détection de lag
   ============================================ */

class PerformanceMonitor {
    constructor(debug = false) {
        this.debug = debug;
        this.lastTime = performance.now();
        this.frames = 0;
        this.fps = 60;

        if (this.debug) {
            this.monitorFPS();
        }
    }

    monitorFPS() {
        const currentTime = performance.now();
        this.frames++;

        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
            console.log(`FPS: ${this.fps}`);

            // Warning si FPS < 30
            if (this.fps < 30) {
                console.warn('⚠️ Performance dégradée, considérer désactiver certaines animations');
            }

            this.frames = 0;
            this.lastTime = currentTime;
        }

        requestAnimationFrame(() => this.monitorFPS());
    }
}

/* ============================================
   6. UTILITIES
   - Détection mobile
   - Prefere reduced motion
   ============================================ */

const Utils = {
    // Check si mobile
    isMobile() {
        return window.innerWidth <= 768;
    },

    // Check si user préfère reduced motion (accessibilité)
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    // Debounce pour resize events
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

/* ============================================
   7. INITIALIZATION
   - DOMContentLoaded pour sécurité
   - Initialisation de toutes les classes
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio initialized');

    // Check si reduced motion est activé
    if (Utils.prefersReducedMotion()) {
        console.log('♿ Reduced motion detected - Animations simplifiées');
    }

    // Init Navigation
    const navigation = new Navigation();

    // Init Parallax (uniquement desktop)
    if (!Utils.isMobile()) {
        const parallax = new ParallaxEffect();
    }

    // Init Scroll Animations
    const scrollAnimations = new ScrollAnimations();

    // Init Skills Animation
    const skillsAnimation = new SkillsAnimation();

    // Performance Monitor (debug mode OFF en production)
    // Mettre à true pour monitorer les FPS
    const perfMonitor = new PerformanceMonitor(false);

    // Resize handler avec debounce
    window.addEventListener('resize', Utils.debounce(() => {
        console.log('📱 Window resized');
        // Logique de resize si nécessaire
    }, 250));

    console.log('✅ All systems ready');
});

/* ============================================
   8. ERROR HANDLING
   - Global error handler
   - Log errors sans casser l'expérience
   ============================================ */

window.addEventListener('error', (e) => {
    console.error('❌ Error detected:', e.message);
    // En production, logger vers service externe (Sentry, etc.)
});

/* ============================================
   9. EASTER EGG (optionnel)
   - Console message pour recruteurs curieux
   ============================================ */

console.log(
    '%c👋 Hello fellow developer!',
    'color: #81FF39; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cCe portfolio a été codé avec attention aux détails.',
    'color: #B3B3B3; font-size: 14px;'
);
console.log(
    '%cStack: HTML5 + CSS3 + Vanilla JS',
    'color: #FAFAFA; font-size: 12px;'
);
console.log(
    '%cContactez-moi: ibrahim.antoine@example.com',
    'color: #81FF39; font-size: 12px;'
);
