// Hero animation: SplitText-style reveal (React Bits) adapted to vanilla GSAP.
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(window.SplitText);

    // Logos: staggered fade/slide-up
    const logos = document.querySelectorAll('[data-hero-logo]');
    if (logos.length) {
        gsap.fromTo(
            logos,
            { opacity: 0, y: 20 },
            {
                opacity: 0.7,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.1,
                delay: 0.1
            }
        );
    }

    // Hero paragraph: single blur + zoom-out reveal (no per-word stagger, appears all at once)
    document.querySelectorAll('[data-blur-in]').forEach((el) => {
        gsap.fromTo(
            el,
            { opacity: 0, filter: 'blur(12px)', scale: 1.08 },
            {
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1,
                duration: 1.1,
                ease: 'power2.out',
                delay: 0.4
            }
        );
    });

    // Hero headline: char or word split reveal
    document.querySelectorAll('[data-split-text]').forEach((el, index) => {
        const splitType = el.getAttribute('data-split-text') || 'chars';
        const split = new SplitText(el, {
            type: splitType,
            charsClass: 'split-char',
            wordsClass: 'split-word'
        });

        const targets = splitType === 'words' ? split.words : split.chars;

        gsap.fromTo(
            targets,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
                stagger: splitType === 'words' ? 0.06 : 0.03,
                delay: 0.3 + index * 0.15
            }
        );
    });
});
