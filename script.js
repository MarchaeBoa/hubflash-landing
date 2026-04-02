// ===== HUBFLASH LANDING PAGE — INTERACTIONS =====

document.addEventListener('DOMContentLoaded', () => {

    // --- Generate 100 Stars + Shooting Stars ---
    const starsContainer = document.getElementById('starsContainer');
    if (starsContainer) {
        const starColors = ['', 'star--blue', 'star--purple', 'star--orange'];
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = `star ${starColors[Math.floor(Math.random() * starColors.length)]}`;
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const twinkleDuration = Math.random() * 4 + 2;
            const driftDuration = Math.random() * 50 + 25;
            const delay = Math.random() * 5;
            const minOpacity = Math.random() * 0.3 + 0.1;
            const glowSize = size + Math.random() * 4;
            const dx1 = (Math.random() - 0.5) * 30;
            const dy1 = (Math.random() - 0.5) * 30;
            const dx2 = (Math.random() - 0.5) * 25;
            const dy2 = (Math.random() - 0.5) * 25;
            const dx3 = (Math.random() - 0.5) * 20;
            const dy3 = (Math.random() - 0.5) * 20;

            star.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                --twinkle-duration: ${twinkleDuration}s;
                --drift-duration: ${driftDuration}s;
                --min-opacity: ${minOpacity};
                --glow-size: ${glowSize}px;
                --dx1: ${dx1}px;
                --dy1: ${dy1}px;
                --dx2: ${dx2}px;
                --dy2: ${dy2}px;
                --dx3: ${dx3}px;
                --dy3: ${dy3}px;
                animation-delay: ${delay}s, ${delay * 1.5}s;
            `;
            starsContainer.appendChild(star);
        }

        // Add 15 bright glowing stars
        for (let i = 0; i < 15; i++) {
            const bright = document.createElement('div');
            bright.className = 'star star--bright';
            const size = Math.random() * 3 + 2.5;
            bright.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                --twinkle-duration: ${Math.random() * 3 + 1.5}s;
                --drift-duration: ${Math.random() * 60 + 40}s;
                --dx1: ${(Math.random() - 0.5) * 15}px;
                --dy1: ${(Math.random() - 0.5) * 15}px;
                --dx2: ${(Math.random() - 0.5) * 12}px;
                --dy2: ${(Math.random() - 0.5) * 12}px;
                --dx3: ${(Math.random() - 0.5) * 10}px;
                --dy3: ${(Math.random() - 0.5) * 10}px;
                animation-delay: ${Math.random() * 3}s, ${Math.random() * 5}s;
            `;
            starsContainer.appendChild(bright);
        }

    }

    // --- Globe blinking dots ---
    const globeDots = document.getElementById('globeDots');
    if (globeDots) {
        // Create 30 blinking dots scattered on the globe area
        const dotPositions = [
            {x:20,y:35},{x:25,y:42},{x:30,y:50},{x:18,y:55},{x:22,y:60},
            {x:35,y:30},{x:40,y:38},{x:45,y:45},{x:42,y:55},{x:38,y:62},
            {x:50,y:25},{x:55,y:35},{x:52,y:48},{x:48,y:58},{x:53,y:65},
            {x:60,y:28},{x:65,y:38},{x:62,y:50},{x:58,y:55},{x:63,y:42},
            {x:70,y:32},{x:75,y:40},{x:72,y:52},{x:68,y:60},{x:73,y:48},
            {x:80,y:35},{x:78,y:45},{x:82,y:55},{x:33,y:45},{x:57,y:30}
        ];
        dotPositions.forEach((pos, i) => {
            const dot = document.createElement('div');
            dot.className = 'globe-dot';
            const size = Math.random() * 3 + 3;
            const speed = Math.random() * 3 + 1.5;
            const delay = Math.random() * 5;
            dot.style.cssText = `
                left: ${pos.x}%;
                top: ${pos.y}%;
                --dot-size: ${size}px;
                --blink-speed: ${speed}s;
                animation-delay: ${delay}s;
            `;
            globeDots.appendChild(dot);
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // --- Mobile Menu ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // --- Cursor Glow ---
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });
        function animateGlow() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(animateGlow);
        }
        animateGlow();
    } else if (cursorGlow) {
        cursorGlow.style.display = 'none';
    }

    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    // Only observe elements outside the hero (hero uses CSS animations)
    animatedElements.forEach(el => {
        if (!el.closest('.hero')) {
            observer.observe(el);
        }
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const duration = 2000;
                const startTime = performance.now();
                function updateCounter(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 4);
                    const current = Math.round(target * eased);
                    el.textContent = current.toLocaleString('pt-BR');
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (target === '#') return;
            e.preventDefault();
            const el = document.querySelector(target);
            if (el) {
                const offset = navbar.offsetHeight + 20;
                const y = el.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // --- Pricing card hover tilt effect ---
    document.querySelectorAll('.pricing-card, .solution-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (y - centerY) / centerY * -3;
            const tiltY = (x - centerX) / centerX * 3;
            card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});
