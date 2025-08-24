import { OsuParticles } from "../../OsuParticles";

let particleSystem: OsuParticles | null = null;
let nav: HTMLElement | null = null;
let logoThing: HTMLElement | null = null;
let updateInterval: NodeJS.Timeout | null = null;

export function initNavbarBg() {
    nav = document.getElementById('main-nav');
    logoThing = document.getElementById('logo-thing');
    
    if (!nav) {
        console.warn('main-nav element not found');
        return;
    }

    updateNavColor();

    const canvas = document.getElementById('navbar_bg') as HTMLCanvasElement;
    if (canvas) {
        particleSystem = new OsuParticles('navbar_bg');
        particleSystem.init(70);
    }

    startUpdateLoop();
}

export function destroyNavbarBg() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
    
    particleSystem?.destroy();
    particleSystem = null;
}

function updateNavColor() {
    if (nav) {
        const newColor = getComputedStyle(document.documentElement).getPropertyValue('--navbar-color');
        nav.style.backgroundColor = newColor;
    }
}

function startUpdateLoop() {
    updateInterval = setInterval(() => {
        try {
            particleSystem?.updateBaseColor();
            updateNavColor();
        } catch (error) {
            console.error('Failed to update nav color:', error);
        }
    }, 500);
}

export function updateNavbarColors() {
    updateNavColor();
    particleSystem?.updateBaseColor();
}

if (typeof window !== 'undefined') {
    document.addEventListener('sveltekit:navigated', () => {
        nav = document.getElementById('main-nav');
        logoThing = document.getElementById('logo-thing');
        updateNavbarColors();
    });
}