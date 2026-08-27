/**
 * AnimeVerse 3D Tilt & Mouse Parallax Engine
 * Creates interactive 3D depth, specular sheen reflections, and dynamic mouse tracking.
 */

class TiltEngine {
    constructor() {
        this.init();
    }

    init() {
        this.bindTiltCards();
        this.bindHeroParallax();
    }

    bindTiltCards() {
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.tilt-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                // Check if cursor is near/over card
                const isHovered = (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                );

                if (isHovered) {
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = ((y - centerY) / centerY) * -12; // tilt angle
                    const rotateY = ((x - centerX) / centerX) * 12;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;

                    // Dynamic specular glare shine calculation
                    const glare = card.querySelector('.card-glare');
                    if (glare) {
                        const glareX = (x / rect.width) * 100;
                        const glareY = (y / rect.height) * 100;
                        glare.style.opacity = '0.6';
                        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 42, 133, 0.15) 30%, transparent 70%)`;
                    }
                } else if (card.style.transform && card.style.transform !== '') {
                    // Reset smoothly
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
                    const glare = card.querySelector('.card-glare');
                    if (glare) {
                        glare.style.opacity = '0';
                    }
                }
            });
        });
    }

    bindHeroParallax() {
        const heroSection = document.querySelector('.hero-section');
        const heroCharacter = document.querySelector('.hero-character-wrap');
        const heroAura = document.querySelector('.hero-aura');
        const heroContent = document.querySelector('.hero-content');

        if (!heroSection || !heroCharacter) return;

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
            const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

            // Character responds smoothly with multi-layer parallax
            heroCharacter.style.transform = `translate(${mouseX * 25}px, ${mouseY * 20}px) rotateY(${mouseX * 12}deg)`;
            if (heroAura) {
                heroAura.style.transform = `translate(${mouseX * -35}px, ${mouseY * -30}px) scale(1.05)`;
            }
            if (heroContent) {
                heroContent.style.transform = `translate(${mouseX * -10}px, ${mouseY * -10}px)`;
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            heroCharacter.style.transform = 'translate(0px, 0px) rotateY(0deg)';
            if (heroAura) {
                heroAura.style.transform = 'translate(0px, 0px) scale(1)';
            }
            if (heroContent) {
                heroContent.style.transform = 'translate(0px, 0px)';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.tiltEngine = new TiltEngine();
});
