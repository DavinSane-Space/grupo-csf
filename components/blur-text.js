// BlurText (React Bits) adapted to vanilla JS/CSS: staggered blur/opacity/translateY reveal on scroll.
document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.blur-text');
    if (!containers.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delayStep = parseInt(el.getAttribute('data-blur-delay') || '80', 10);
            el.querySelectorAll('.blur-word').forEach((word, i) => {
                word.style.transitionDelay = `${i * delayStep}ms`;
            });
            el.classList.add('in-view');
            observer.unobserve(el);
        });
    }, { threshold: 0.1 });

    containers.forEach((el) => observer.observe(el));
});
