import { parseColor } from '../../helpers';

interface Particle {
    x: number;
    y: number;
    size: number;
    speed: number;
    currentR: number;
    currentG: number;
    currentB: number;
    targetR: number;
    targetG: number;
    targetB: number;
    lightness: number;
    colorTransitionSpeed: number;
    reset: () => void;
    update: () => void;
    draw: (ctx: CanvasRenderingContext2D) => void;
    updateTargetColor: (r: number, g: number, b: number) => void;
}

interface ParticleConfig {
    canvasWidth: number;
    canvasHeight: number;
    baseR: number;
    baseG: number;
    baseB: number;
}

class OsuParticles {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: Particle[];
    private animationId: number | null = null;
    private baseR!: number;
    private baseG!: number;
    private baseB!: number;
    private spawnInterval: number;
    private maxParticles: number;
    private spawnIntervalId: number | null = null;

    constructor(canvasId: string) {
        const canvasElement = document.getElementById(canvasId);
        if (!canvasElement) {
            throw new Error(`Canvas element with id ${canvasId} not found`);
        }

        this.canvas = canvasElement as HTMLCanvasElement;
        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Could not get 2D context for canvas');
        }

        this.ctx = context;
        this.particles = [];
        this.updateBaseColor();
        this.spawnInterval = 400;
        this.maxParticles = 900;
        this.init();
    }

    private updateBaseColor(): void {
        const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--navbar-color');
        const rgb = parseColor(baseColor);
        
        if (rgb) {
            this.baseR = rgb.r;
            this.baseG = rgb.g;
            this.baseB = rgb.b;
            
            this.particles.forEach(particle => {
                particle.updateTargetColor(this.baseR, this.baseG, this.baseB);
            });
        }
    }

    private init(): void {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        document.addEventListener('page:changed', () => {
            updateNavColor();
            this.updateBaseColor();
        });

        document.addEventListener("page:transitionend", () => {
            logoThing = document.getElementById('logo-thing')
            updateNavColor();
            this.updateBaseColor();
        });

        this.createInitialParticles(50);
        this.animate();
        this.spawnIntervalId = window.setInterval(() => this.spawnParticle(), this.spawnInterval);
    }

    private spawnParticle(): void {
        this.particles.push(this.createParticle());
        if (this.particles.length > this.maxParticles) {
            this.particles.shift();
        }
    }

    private createParticle(x?: number, y?: number): Particle {
        const config: ParticleConfig = {
            canvasWidth: this.canvas.width,
            canvasHeight: this.canvas.height,
            baseR: this.baseR,
            baseG: this.baseG,
            baseB: this.baseB,
        };

        const size = Math.random() * 40 + 25;
        const LightnessPresets = [10, 30, 60, 100]
        const lightness = LightnessPresets[Math.floor(Math.random() * LightnessPresets.length)];
        const particleX = x !== undefined ? x : Math.random() * config.canvasWidth;
        const particleY = y !== undefined ? y : config.canvasHeight + size;
        const colorTransitionSpeed = 0.1;

        const particle: Particle = {
            x: particleX,
            y: particleY,
            size: size,
            speed: Math.random() * 0.8 + 0.4,
            currentR: config.baseR,
            currentG: config.baseG,
            currentB: config.baseB,
            targetR: config.baseR,
            targetG: config.baseG,
            targetB: config.baseB,
            lightness: lightness,
            colorTransitionSpeed: colorTransitionSpeed,
            reset: function () {
                this.x = Math.random() * config.canvasWidth;
                this.y = config.canvasHeight + 100;
            },
            update: function () {
                this.y -= this.speed;
                if (this.y < -300) {
                    this.reset();
                }

                this.currentR += (this.targetR - this.currentR) * this.colorTransitionSpeed;
                this.currentG += (this.targetG - this.currentG) * this.colorTransitionSpeed;
                this.currentB += (this.targetB - this.currentB) * this.colorTransitionSpeed;
            },
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.save();
                ctx.translate(this.x, this.y);
                
                const r = Math.max(0, Math.min(255, this.currentR + (this.lightness - 50)));
                const g = Math.max(0, Math.min(255, this.currentG + (this.lightness - 50)));
                const b = Math.max(0, Math.min(255, this.currentB + (this.lightness - 50)));

                ctx.fillStyle = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.lineTo(-this.size, this.size);
                ctx.lineTo(this.size, this.size);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            },
            updateTargetColor: function(r: number, g: number, b: number) {
                this.targetR = r;
                this.targetG = g;
                this.targetB = b;
            }
        };

        return particle;
    }
    
    private createInitialParticles(numInitialParticles: number): void {
        const halfWidth = this.canvas.width / 2;
        const halfHeight = this.canvas.height / 2;

        for (let i = 0; i < numInitialParticles; i++) {
            const x = Math.random() * (this.canvas.width);
            const y = Math.random() * (this.canvas.height * 2);
            this.particles.push(this.createParticle(x, y));
        }
    }

    private resizeCanvas(): void {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    private animate(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    public destroy(): void {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', () => this.resizeCanvas());
        document.removeEventListener('page:changed', () => this.updateBaseColor());
        if (this.spawnIntervalId !== null) {
            clearInterval(this.spawnIntervalId);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    nav = document.getElementById('main-nav');
    logoThing = document.getElementById('logo-thing')
    updateNavColor();

    const particleSystem = new OsuParticles('navbar_bg');

    document.addEventListener('astro:before-swap', () => {
        particleSystem.destroy();
    });
});

let nav: HTMLElement | null = null;
let logoThing: HTMLElement | null = null;
nav = document.getElementById('main-nav');

function updateNavColor() {
    if (nav) {
        const newColor = getComputedStyle(document.documentElement).getPropertyValue('--navbar-color');
        nav.style.backgroundColor = newColor;
    }
};
