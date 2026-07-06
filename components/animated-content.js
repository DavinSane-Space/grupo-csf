// AnimatedContent (React Bits) adapted to vanilla GSAP + ScrollTrigger.
// Usage: add [data-animate-content] to any element, with optional data-anim-* attributes:
//   data-anim-distance, data-anim-direction ("vertical"|"horizontal"), data-anim-reverse ("true"|"false"),
//   data-anim-duration, data-anim-ease, data-anim-initial-opacity, data-anim-animate-opacity ("true"|"false"),
//   data-anim-scale, data-anim-threshold, data-anim-delay
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('[data-animate-content]').forEach((el) => {
        const distance = parseFloat(el.dataset.animDistance) || 100;
        const direction = el.dataset.animDirection || 'vertical';
        const reverse = el.dataset.animReverse === 'true';
        const duration = parseFloat(el.dataset.animDuration) || 0.8;
        const ease = el.dataset.animEase || 'power3.out';
        const initialOpacity = el.dataset.animInitialOpacity !== undefined ? parseFloat(el.dataset.animInitialOpacity) : 0;
        const animateOpacity = el.dataset.animAnimateOpacity !== 'false';
        const scale = parseFloat(el.dataset.animScale) || 1;
        const threshold = el.dataset.animThreshold !== undefined ? parseFloat(el.dataset.animThreshold) : 0.1;
        const delay = parseFloat(el.dataset.animDelay) || 0;

        const axis = direction === 'horizontal' ? 'x' : 'y';
        const offset = reverse ? -distance : distance;
        const startPct = (1 - threshold) * 100;

        gsap.set(el, {
            [axis]: offset,
            scale,
            opacity: animateOpacity ? initialOpacity : 1,
            visibility: 'visible'
        });

        const tl = gsap.timeline({ paused: true, delay });
        tl.to(el, {
            [axis]: 0,
            scale: 1,
            opacity: 1,
            duration,
            ease
        });

        ScrollTrigger.create({
            trigger: el,
            start: `top ${startPct}%`,
            once: true,
            onEnter: () => tl.play()
        });
    });
});
