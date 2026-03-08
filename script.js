document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });
    }

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }

            // Set active class
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 2. Header Scroll Effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlighting on scroll
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Anatomy Visualizer Interactive Logic
    const hotspots = document.querySelectorAll('.hotspot-group');
    const ailmentCards = document.querySelectorAll('.ailment-card');
    const resultBox = document.getElementById('anatomy-result');

    const descriptions = {
        'neck': {
            title: 'Neck Pain Relief',
            desc: 'Our neck pain specialists treat cervical spondylosis, whiplash, stiff neck, and radiculopathy through gentle manipulation, posture correction, and targeted exercises.'
        },
        'shoulder': {
            title: 'Shoulder Rehabilitation',
            desc: 'We resolve frozen shoulder, rotator cuff injuries, and impingement syndrome to restore full range of motion and eliminate pain.'
        },
        'elbow': {
            title: 'Elbow Treatments',
            desc: 'Get fast relief from tennis elbow, golfer\'s elbow, and tendinitis with our specialized manual therapy and cold laser treatments.'
        },
        'hand': {
            title: 'Hand & Wrist Recovery',
            desc: 'Regain dexterity and strength after carpal tunnel syndrome, arthritis, or repetitive strain injuries (RSI).'
        },
        'hip': {
            title: 'Hip & Lower Back Pain',
            desc: 'Comprehensive care for sciatica, lower back pain, hip bursitis, and sacroiliac joint dysfunction. We treat the root cause, not just symptoms.'
        },
        'knee': {
            title: 'Knee Stabilization',
            desc: 'Expert rehabilitation for ACL tears, osteoarthritis, runner\'s knee, and post-surgical recovery. Regain confidence in your mobility.'
        },
        'ankle': {
            title: 'Ankle & Foot Care',
            desc: 'Say goodbye to plantar fasciitis severity, ankle sprains, and Achilles tendinopathy with custom biomechanical assessments and therapy.'
        }
    };

    function highlightPart(part) {
        // Reset all
        hotspots.forEach(h => h.classList.remove('active'));
        ailmentCards.forEach(c => c.classList.remove('active'));

        // Highlight active
        document.querySelectorAll(`.hotspot-group[data-target="${part}"]`).forEach(h => h.classList.add('active'));
        document.querySelectorAll(`.ailment-card[data-part="${part}"]`).forEach(c => c.classList.add('active'));

        // Update result box
        if (descriptions[part]) {
            resultBox.innerHTML = `
                <h3 style="color: var(--primary); margin-bottom: 10px;">${descriptions[part].title}</h3>
                <p>${descriptions[part].desc}</p>
                <a href="#appointment" class="btn btn-primary" style="margin-top: 15px; display: inline-block;">Book Consultation <i class="ri-arrow-right-line"></i></a>
            `;
            resultBox.classList.add('active');
        }
    }

    // Event listeners for hotspots
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function () {
            const part = this.getAttribute('data-target');
            highlightPart(part);
        });

        hotspot.addEventListener('mouseenter', function () {
            const part = this.getAttribute('data-target');
            // Hover effect without fully activating if we don't want to override click
        });
    });

    // Event listeners for ailment cards
    ailmentCards.forEach(card => {
        card.addEventListener('click', function () {
            const part = this.getAttribute('data-part');
            highlightPart(part);
        });

        // Hover effect for cards
        card.addEventListener('mouseenter', function () {
            const part = this.getAttribute('data-part');
            // Temporarily flag as active to trigger CSS glow effects
            document.querySelectorAll(`.hotspot-group[data-target="${part}"]`).forEach(h => {
                h.classList.add('hovered');
                h.classList.add('active');
            });
        });

        card.addEventListener('mouseleave', function () {
            const part = this.getAttribute('data-part');
            document.querySelectorAll(`.hotspot-group[data-target="${part}"]`).forEach(h => {
                h.classList.remove('hovered');
                // Remove active ONLY IF this card is not the actually selected one
                if (!card.classList.contains('active')) {
                    h.classList.remove('active');
                }
            });
        });
    });

    // 4. GSAP Animations with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Animations
    const heroTl = gsap.timeline();

    heroTl.from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    })
        .from(".hero-title", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.4")
        .from(".hero-text", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.6")
        .from(".hero-btns", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.4")
        .from(".hero-stats", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.4")
        .from(".hero-image", {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=1.5");

    // Scroll Animations

    // Animate elements individually as they enter the viewport
    const animateOnScroll = (selector, animationProps) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%", // Fire as soon as the top of the element hits the bottom 95% of screen
                    toggleActions: "play none none none"
                },
                ...animationProps
            });
        });
    };

    animateOnScroll(".feature-box", { y: 50, opacity: 0, duration: 0.6, ease: "power2.out" });

    animateOnScroll(".about-image img", { scale: 0.95, opacity: 0, duration: 1, ease: "power3.out" });
    animateOnScroll(".experience-badge", { y: 50, rotation: -5, opacity: 0, duration: 0.8, ease: "back.out(1.5)", delay: 0.3 });
    animateOnScroll(".about-content > *", { x: 30, opacity: 0, duration: 0.6, ease: "power2.out" });

    animateOnScroll(".section-header", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" });

    animateOnScroll(".service-card", { y: 50, opacity: 0, duration: 0.6, ease: "power2.out" });

    animateOnScroll(".modern-cta-wrapper", { scale: 0.95, opacity: 0, duration: 0.6, ease: "power2.out" });

    animateOnScroll(".human-body", { opacity: 0, scale: 0.95, duration: 1, ease: "power2.out" });

    animateOnScroll("#anatomy-info-left .ailment-card", { x: -30, opacity: 0, duration: 0.6, ease: "power2.out" });
    animateOnScroll("#anatomy-info-right .ailment-card", { x: 30, opacity: 0, duration: 0.6, ease: "power2.out" });

    // Ensure we trigger a layout refresh so scroll markers align properly after rendering
    window.addEventListener('load', () => {
        setTimeout(() => ScrollTrigger.refresh(), 100);
        setTimeout(() => ScrollTrigger.refresh(), 1000);
    });
});
