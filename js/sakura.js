/**
 * AnimeVerse Sakura Petal Particle Engine
 * Realistic, high-performance HTML5 Canvas Cherry Blossom Flutter System
 */

class SakuraEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        
        this.petals = [];
        this.maxPetals = 45; // balanced for aesthetic beauty and high performance
        this.isActive = true;
        this.mouseX = 0;
        this.mouseY = 0;
        this.windForce = 0;
        this.targetWind = 0;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);

        this.petalColors = [
            { r: 255, g: 183, b: 197, a: 0.85 }, // classic sakura pink
            { r: 255, g: 192, b: 203, a: 0.75 }, // soft light pink
            { r: 255, g: 105, b: 180, a: 0.65 }, // vibrant hot neon pink
            { r: 255, g: 220, b: 235, a: 0.90 }, // luminous pastel white-pink
            { r: 244, g: 143, b: 177, a: 0.70 }  // deep blossom magenta
        ];

        this.init();
    }

    init() {
        this.resize();
        this.createPetals();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.scale(this.dpr, this.dpr);
    }

    createPetal() {
        const color = this.petalColors[Math.floor(Math.random() * this.petalColors.length)];
        return {
            x: Math.random() * (this.width + 200) - 100,
            y: Math.random() * -this.height,
            size: Math.random() * 9 + 7, // 7px - 16px
            speedY: Math.random() * 1.2 + 0.8,
            speedX: Math.random() * 0.8 - 0.2,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.03,
            flip: Math.random() * Math.PI,
            flipSpeed: Math.random() * 0.03 + 0.015,
            oscillation: Math.random() * Math.PI * 2,
            oscillationSpeed: Math.random() * 0.02 + 0.01,
            color: color,
            alpha: color.a * (Math.random() * 0.4 + 0.6),
            petalShape: Math.floor(Math.random() * 3) // distinct natural petal shapes
        };
    }

    createPetals() {
        this.petals = [];
        for (let i = 0; i < this.maxPetals; i++) {
            const petal = this.createPetal();
            // Stagger initial positions across viewport
            petal.y = Math.random() * this.height;
            this.petals.push(petal);
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());

        window.addEventListener('mousemove', (e) => {
            const deltaX = (e.clientX - this.width / 2) / (this.width / 2);
            this.targetWind = deltaX * 1.5;
        });

        // Ambient wind fluctuation loop
        setInterval(() => {
            if (!this.isActive) return;
            const naturalWind = (Math.sin(Date.now() * 0.001) * 0.8) + (Math.cos(Date.now() * 0.0005) * 0.4);
            this.targetWind += (naturalWind - this.targetWind) * 0.1;
        }, 100);
    }

    drawPetal(p) {
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.scale(1, Math.sin(p.flip)); // 3D flutter rotation effect

        this.ctx.beginPath();
        const r = p.size;

        if (p.petalShape === 0) {
            // Heart-notched traditional sakura petal
            this.ctx.moveTo(0, 0);
            this.ctx.bezierCurveTo(-r * 0.8, -r * 0.6, -r * 0.9, -r * 1.4, 0, -r * 1.8);
            this.ctx.bezierCurveTo(r * 0.9, -r * 1.4, r * 0.8, -r * 0.6, 0, 0);
        } else if (p.petalShape === 1) {
            // Slender elongated wind petal
            this.ctx.moveTo(0, 0);
            this.ctx.quadraticCurveTo(-r * 0.7, -r * 0.9, 0, -r * 1.9);
            this.ctx.quadraticCurveTo(r * 0.7, -r * 0.9, 0, 0);
        } else {
            // Curved organic blossom petal
            this.ctx.moveTo(0, 0);
            this.ctx.bezierCurveTo(-r * 0.6, -r * 0.5, -r * 0.8, -r * 1.2, -r * 0.2, -r * 1.7);
            this.ctx.bezierCurveTo(r * 0.5, -r * 1.5, r * 0.7, -r * 0.6, 0, 0);
        }

        // Gradient for delicate translucent depth
        const gradient = this.ctx.createLinearGradient(0, 0, 0, -r * 1.8);
        gradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.95})`);
        gradient.addColorStop(0.7, `rgba(255, 235, 245, ${p.alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${p.alpha * 0.9})`);

        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Subtle glowing edge highlight
        this.ctx.strokeStyle = `rgba(255, 180, 210, ${p.alpha * 0.4})`;
        this.ctx.lineWidth = 0.6;
        this.ctx.stroke();

        this.ctx.restore();
    }

    update() {
        // Smooth wind interpolation
        this.windForce += (this.targetWind - this.windForce) * 0.04;

        for (let i = 0; i < this.petals.length; i++) {
            const p = this.petals[i];

            p.oscillation += p.oscillationSpeed;
            p.rotation += p.rotationSpeed;
            p.flip += p.flipSpeed;

            // Physics calculation: gravity + sway oscillation + global wind
            p.y += p.speedY;
            p.x += p.speedX + Math.sin(p.oscillation) * 0.9 + this.windForce * 0.7;

            // Reset when going off screen (bottom or sides)
            if (p.y > this.height + 40 || p.x > this.width + 120 || p.x < -120) {
                this.petals[i] = this.createPetal();
                this.petals[i].y = -20;
                this.petals[i].x = Math.random() * (this.width + 100) - 50;
            }
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let i = 0; i < this.petals.length; i++) {
            this.drawPetal(this.petals[i]);
        }
    }

    animate() {
        if (this.isActive) {
            this.update();
            this.render();
        }
        requestAnimationFrame(() => this.animate());
    }

    toggle() {
        this.isActive = !this.isActive;
        if (!this.isActive) {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
        return this.isActive;
    }

    setDensity(count) {
        this.maxPetals = count;
        this.createPetals();
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.sakuraEngine = new SakuraEngine('sakura-canvas');
});
