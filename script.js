document.addEventListener('DOMContentLoaded', () => {
    // Reveal on scroll logic
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check if this is a parent requiring staggering
                if (entry.target.hasAttribute('data-reveal-parent')) {
                    const children = entry.target.querySelectorAll('[data-reveal]');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('revealed');
                        }, index * 150); // 150ms delay between each child
                    });
                } else if (!entry.target.closest('[data-reveal-parent]')) {
                    // Standard reveal (not part of a stagger group)
                    entry.target.classList.add('revealed');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Slightly earlier trigger
    });

    // Observe parents and individual reveal elements
    document.querySelectorAll('[data-reveal-parent], [data-reveal]:not([data-reveal-parent] [data-reveal])').forEach(el => {
        revealOnScroll.observe(el);
    });

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-links a, .nav-cta a, .hero-btns a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Sticky Header transition (Transparent to Solid)
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close mobile menu on link click
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) navToggle.classList.remove('active');
            if (navLinksContainer) navLinksContainer.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
