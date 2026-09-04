(() => {
    'use strict';

    const root = document.documentElement;
    const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = () => window.matchMedia('(pointer: coarse)').matches;

    function createAtmosphere() {
        if (document.querySelector('.floral-atmosphere')) return;
        const el = document.createElement('div');
        el.className = 'floral-atmosphere';
        el.setAttribute('aria-hidden', 'true');
        document.body.prepend(el);
    }

    function createProgress() {
        if (document.querySelector('.floral-scroll-progress')) return;
        const bar = document.createElement('div');
        bar.className = 'floral-scroll-progress';
        bar.setAttribute('aria-hidden', 'true');
        document.body.appendChild(bar);
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
        };
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update, { passive: true });
        update();
    }

    function createPetals() {
        if (document.querySelector('.floral-petals')) return;
        const container = document.createElement('div');
        container.className = 'floral-petals';
        container.setAttribute('aria-hidden', 'true');
        const symbols = ['🌸', '✿', '❀', '🌷', '🍃'];
        const count = window.innerWidth < 600 ? 9 : window.innerWidth < 900 ? 14 : 22;
        const frag = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const petal = document.createElement('span');
            petal.className = 'floral-petal';
            petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDelay = `${Math.random() * -18}s`;
            petal.style.animationDuration = `${10 + Math.random() * 11}s`;
            petal.style.fontSize = `${11 + Math.random() * 15}px`;
            petal.style.opacity = `${0.25 + Math.random() * 0.42}`;
            petal.style.setProperty('--petal-drift', `${-110 + Math.random() * 220}px`);
            petal.style.setProperty('--petal-rotate', `${180 + Math.random() * 540}deg`);
            frag.appendChild(petal);
        }
        container.appendChild(frag);
        document.body.appendChild(container);
    }

    function createCursorGlow() {
        if (coarse() || reduceMotion() || document.querySelector('.floral-cursor-glow')) return;
        const glow = document.createElement('div');
        glow.className = 'floral-cursor-glow';
        glow.setAttribute('aria-hidden', 'true');
        document.body.appendChild(glow);
        let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
        window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive:true });
        const animate = () => {
            x += (tx - x) * .11; y += (ty - y) * .11;
            glow.style.transform = `translate3d(${x}px,${y}px,0)`;
            requestAnimationFrame(animate);
        };
        animate();
    }

    function windEffect() {
        let target = 0, current = 0;
        window.addEventListener('mousemove', e => {
            const x = e.clientX / Math.max(innerWidth, 1) - .5;
            target = x * 2;
        }, { passive:true });
        const animate = () => {
            current += (target - current) * .045;
            root.style.setProperty('--floral-wind', `${current * 55}px`);
            requestAnimationFrame(animate);
        };
        animate();
    }

    function setupParallax() {
        if (coarse() || reduceMotion()) return;
        document.querySelectorAll('.hero-image-wrapper .image-bg-circle').forEach(el => el.dataset.parallax = '12');
        document.querySelectorAll('.hero-image-wrapper .hero-img').forEach(el => el.dataset.parallax = '5');
        document.querySelectorAll('.hero-content .badge').forEach(el => el.dataset.parallax = '3');
        const targets = document.querySelectorAll('[data-parallax]');
        if (!targets.length) return;
        let mx = 0, my = 0, x = 0, y = 0;
        window.addEventListener('mousemove', e => {
            mx = e.clientX / innerWidth - .5;
            my = e.clientY / innerHeight - .5;
        }, { passive:true });
        const animate = () => {
            x += (mx - x) * .06; y += (my - y) * .06;
            targets.forEach(el => {
                const strength = Number(el.dataset.parallax) || 8;
                el.style.transform = `translate3d(${x * strength}px,${y * strength}px,0)`;
            });
            requestAnimationFrame(animate);
        };
        animate();
    }

    function setupTilt() {
        if (coarse() || reduceMotion()) return;
        document.querySelectorAll('.card').forEach(card => {
            if (card.dataset.tiltBound) return;
            card.dataset.tilt = '';
            card.dataset.tiltBound = 'true';
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - .5;
                const y = (e.clientY - r.top) / r.height - .5;
                card.style.setProperty('--rotate-x', `${y * -5}deg`);
                card.style.setProperty('--rotate-y', `${x * 6}deg`);
                card.classList.add('floral-tilting');
            });
            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--rotate-x', '0deg');
                card.style.setProperty('--rotate-y', '0deg');
                card.classList.remove('floral-tilting');
            });
        });
    }

    function setupReveal() {
        const selectors = [
            '.section-title', '.hero-content', '.hero-image-wrapper',
            '.highlight-card', '.profile-layout > *', '.profile-details .card',
            '.timeline-item', '.education-highlights', '.hobby-card',
            '.contact-card', '.contact-form-card'
        ];
        const elements = document.querySelectorAll(selectors.join(','));
        if (!elements.length) return;
        elements.forEach((el, i) => {
            el.dataset.reveal = '';
            el.style.transitionDelay = `${Math.min((i % 4) * 70, 210)}ms`;
        });
        if (reduceMotion() || !('IntersectionObserver' in window)) {
            elements.forEach(el => el.classList.add('is-visible'));
            return;
        }
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold:.1, rootMargin:'0px 0px -35px 0px' });
        elements.forEach(el => observer.observe(el));
    }

    function decorateInteractions() {
        document.querySelectorAll('a, button').forEach(el => el.classList.add('floral-interactive'));
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('mouseenter', () => link.classList.add('floral-nav-hover'));
            link.addEventListener('mouseleave', () => link.classList.remove('floral-nav-hover'));
        });
    }

    function init() {
        createAtmosphere();
        createProgress();
        if (!reduceMotion()) {
            createPetals();
            createCursorGlow();
            windEffect();
            setupParallax();
            setupTilt();
        }
        setupReveal();
        decorateInteractions();
        if (!reduceMotion()) document.documentElement.style.scrollBehavior = 'smooth';
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
