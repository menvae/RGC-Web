import { OsuParticles } from "../../OsuParticles";
import { getPageColor } from "../../helpers";

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

    let baseColor = getPageColor("/");
    updateNavColor(baseColor[0], baseColor[1], baseColor[2]);

    const canvas = document.getElementById('navbar_bg') as HTMLCanvasElement;
    if (canvas) {
        particleSystem = new OsuParticles('navbar_bg', baseColor[0], baseColor[1], baseColor[2]);
        particleSystem.init(70);
    }
}

export function destroyNavbarBg() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
    
    particleSystem?.destroy();
    particleSystem = null;
}

function updateNavColor(r: number, g: number, b: number) {
    if (nav) {
        nav.style.backgroundColor = `rgba(${r}, ${g}, ${b})`;
    }
}

function updateParticleColor(r: number, g: number, b: number) {
    if (particleSystem) {
        particleSystem.updateBaseColor(r, g, b);
    }
}

export function updateNavbarColors(r: number, g: number, b: number) {
    updateNavColor(r, g, b);
    updateParticleColor(r, g, b);
}

if (typeof window !== 'undefined') {
    document.addEventListener('page:changed', (e: any) => {
        let href = e.detail.href;
        let rgb = getPageColor(href);

        nav = document.getElementById('main-nav');
        logoThing = document.getElementById('logo-thing');
        updateNavbarColors(rgb[0], rgb[1], rgb[2]);
    });
}