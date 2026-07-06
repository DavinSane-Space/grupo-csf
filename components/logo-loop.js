// Logo Loop: infinite marquee of partner/company logos (React Bits) adapted to vanilla JS.
document.addEventListener('DOMContentLoaded', () => {
    const loops = document.querySelectorAll('[data-logo-loop]');
    if (!loops.length) return;

    loops.forEach((root) => {
        const track = root.querySelector('[data-logoloop-track]');
        const seq = root.querySelector('[data-logoloop-seq]');
        if (!track || !seq) return;

        const speed = parseFloat(root.dataset.speed) || 60;
        const hoverSpeed = root.dataset.hoverSpeed !== undefined ? parseFloat(root.dataset.hoverSpeed) : 15;
        const direction = root.dataset.direction === 'right' ? -1 : 1;

        let seqWidth = 0;
        let offset = 0;
        let velocity = 0;
        let lastTimestamp = null;
        let isHovered = false;

        const rebuildCopies = (copyCount) => {
            Array.from(track.children).forEach((child, i) => {
                if (i > 0) child.remove();
            });
            for (let i = 1; i < copyCount; i++) {
                const clone = seq.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            }
        };

        const measure = () => {
            seqWidth = Math.ceil(seq.getBoundingClientRect().width);
            if (seqWidth <= 0) return;
            const containerWidth = root.clientWidth;
            const copiesNeeded = Math.ceil(containerWidth / seqWidth) + 2;
            rebuildCopies(Math.max(2, copiesNeeded));
        };

        if (window.ResizeObserver) {
            new ResizeObserver(measure).observe(root);
        } else {
            window.addEventListener('resize', measure);
        }

        const images = seq.querySelectorAll('img');
        let remaining = images.length;
        if (remaining === 0) {
            measure();
        } else {
            images.forEach((img) => {
                const done = () => {
                    remaining -= 1;
                    if (remaining === 0) measure();
                };
                if (img.complete) done();
                else {
                    img.addEventListener('load', done, { once: true });
                    img.addEventListener('error', done, { once: true });
                }
            });
        }

        root.addEventListener('mouseenter', () => { isHovered = true; });
        root.addEventListener('mouseleave', () => { isHovered = false; });

        const animate = (timestamp) => {
            if (lastTimestamp === null) lastTimestamp = timestamp;
            const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000;
            lastTimestamp = timestamp;

            const target = isHovered ? hoverSpeed : speed;
            const easingFactor = 1 - Math.exp(-deltaTime / 0.25);
            velocity += (target - velocity) * easingFactor;

            if (seqWidth > 0) {
                offset = ((offset + velocity * deltaTime * direction) % seqWidth + seqWidth) % seqWidth;
                track.style.transform = `translate3d(${-offset}px, 0, 0)`;
            }

            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    });
});
