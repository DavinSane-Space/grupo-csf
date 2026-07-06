// MagicBento (React Bits) adapted to vanilla GSAP — border glow, cursor spotlight,
// particles, tilt, magnetism and click ripple for card grids.
// Usage:
//   Wrap a card grid with [data-bento-section] and [data-spotlight-radius] (optional).
//   Mark each card with [data-magic-bento] and optional attributes:
//     data-glow-color="246, 18, 18"   (RGB, defaults to brand red)
//     data-particle-count="8"
//     data-tilt="false"               (default true)
//     data-magnetism="false"          (default true)
//     data-click-effect="false"       (default true)
//     data-particles="false"          (default true)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;

    const MOBILE_BREAKPOINT = 768;
    const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

    const createParticle = (x, y, color) => {
        const el = document.createElement('div');
        el.className = 'bento-particle';
        el.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: rgba(${color}, 1);
            box-shadow: 0 0 6px rgba(${color}, 0.6);
            pointer-events: none;
            z-index: 100;
            left: ${x}px;
            top: ${y}px;
        `;
        return el;
    };

    const initCard = (card) => {
        const glowColor = card.dataset.glowColor || '246, 18, 18';
        const enableTilt = card.dataset.tilt !== 'false';
        const enableMagnetism = card.dataset.magnetism !== 'false';
        const clickEffect = card.dataset.clickEffect !== 'false';
        const enableParticles = card.dataset.particles !== 'false';
        const particleCount = parseInt(card.dataset.particleCount, 10) || 8;

        card.style.setProperty('--glow-color', glowColor);

        let particles = [];
        let timeouts = [];
        let isHovered = false;

        const clearParticles = () => {
            timeouts.forEach(clearTimeout);
            timeouts = [];
            particles.forEach((particle) => {
                gsap.to(particle, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'back.in(1.7)',
                    onComplete: () => particle.remove()
                });
            });
            particles = [];
        };

        const spawnParticles = () => {
            if (!enableParticles) return;
            const { width, height } = card.getBoundingClientRect();

            for (let i = 0; i < particleCount; i++) {
                const timeoutId = setTimeout(() => {
                    if (!isHovered) return;

                    const particle = createParticle(Math.random() * width, Math.random() * height, glowColor);
                    card.appendChild(particle);
                    particles.push(particle);

                    gsap.fromTo(particle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
                    gsap.to(particle, {
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 100,
                        rotation: Math.random() * 360,
                        duration: 2 + Math.random() * 2,
                        ease: 'none',
                        repeat: -1,
                        yoyo: true
                    });
                    gsap.to(particle, {
                        opacity: 0.3,
                        duration: 1.5,
                        ease: 'power2.inOut',
                        repeat: -1,
                        yoyo: true
                    });
                }, i * 100);
                timeouts.push(timeoutId);
            }
        };

        card.addEventListener('mouseenter', () => {
            if (isMobile()) return;
            isHovered = true;
            spawnParticles();

            if (enableTilt) {
                gsap.to(card, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
            }
        });

        card.addEventListener('mouseleave', () => {
            if (isMobile()) return;
            isHovered = false;
            clearParticles();

            if (enableTilt) {
                gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
            }
            if (enableMagnetism) {
                gsap.to(card, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
            }
        });

        card.addEventListener('mousemove', (e) => {
            if (isMobile() || (!enableTilt && !enableMagnetism)) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            if (enableTilt) {
                gsap.to(card, {
                    rotateX: ((y - centerY) / centerY) * -10,
                    rotateY: ((x - centerX) / centerX) * 10,
                    duration: 0.1,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            }

            if (enableMagnetism) {
                gsap.to(card, {
                    x: (x - centerX) * 0.05,
                    y: (y - centerY) * 0.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        card.addEventListener('click', (e) => {
            if (!clickEffect || isMobile()) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const maxDistance = Math.max(
                Math.hypot(x, y),
                Math.hypot(x - rect.width, y),
                Math.hypot(x, y - rect.height),
                Math.hypot(x - rect.width, y - rect.height)
            );

            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: ${maxDistance * 2}px;
                height: ${maxDistance * 2}px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                left: ${x - maxDistance}px;
                top: ${y - maxDistance}px;
                pointer-events: none;
                z-index: 1000;
            `;
            card.appendChild(ripple);

            gsap.fromTo(
                ripple,
                { scale: 0, opacity: 1 },
                { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() }
            );
        });
    };

    const initSection = (section) => {
        const cards = Array.from(section.querySelectorAll('[data-magic-bento]'));
        if (!cards.length) return;

        cards.forEach(initCard);

        if (isMobile()) return;

        const spotlightRadius = parseFloat(section.dataset.spotlightRadius) || 300;
        const spotlightColor = section.dataset.spotlightColor || '246, 18, 18';
        const proximity = spotlightRadius * 0.5;
        const fadeDistance = spotlightRadius * 0.75;

        const spotlight = document.createElement('div');
        spotlight.className = 'bento-global-spotlight';
        spotlight.style.background = `radial-gradient(circle,
            rgba(${spotlightColor}, 0.12) 0%,
            rgba(${spotlightColor}, 0.06) 15%,
            rgba(${spotlightColor}, 0.03) 25%,
            transparent 60%)`;
        document.body.appendChild(spotlight);

        const handleMouseMove = (e) => {
            const rect = section.getBoundingClientRect();
            const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

            if (!inside) {
                gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
                cards.forEach((card) => card.style.setProperty('--glow-intensity', '0'));
                return;
            }

            let minDistance = Infinity;
            cards.forEach((card) => {
                const cardRect = card.getBoundingClientRect();
                const centerX = cardRect.left + cardRect.width / 2;
                const centerY = cardRect.top + cardRect.height / 2;
                const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                const effectiveDistance = Math.max(0, distance);
                minDistance = Math.min(minDistance, effectiveDistance);

                let glowIntensity = 0;
                if (effectiveDistance <= proximity) glowIntensity = 1;
                else if (effectiveDistance <= fadeDistance) glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);

                const relX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
                const relY = ((e.clientY - cardRect.top) / cardRect.height) * 100;
                card.style.setProperty('--glow-x', `${relX}%`);
                card.style.setProperty('--glow-y', `${relY}%`);
                card.style.setProperty('--glow-intensity', glowIntensity.toString());
                card.style.setProperty('--glow-radius', `${spotlightRadius}px`);
            });

            gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });

            const targetOpacity =
                minDistance <= proximity
                    ? 0.8
                    : minDistance <= fadeDistance
                        ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
                        : 0;
            gsap.to(spotlight, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: 'power2.out' });
        };

        document.addEventListener('mousemove', handleMouseMove);
    };

    document.querySelectorAll('[data-bento-section]').forEach(initSection);
});
