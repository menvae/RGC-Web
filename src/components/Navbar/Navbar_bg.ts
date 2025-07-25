import { OsuParticles } from "../../OsuParticles";

let particleSystem: OsuParticles | null = null;

document.addEventListener('DOMContentLoaded', () => {

    nav = document.getElementById('main-nav');
    logoThing = document.getElementById('logo-thing')
    updateNavColor();

    particleSystem = new OsuParticles('navbar_bg');
    particleSystem.init(70);

    document.addEventListener('astro:before-swap', () => {
        particleSystem?.destroy();
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

function updateParticleNavLoop() {
    try {
        particleSystem?.updateBaseColor();
        updateNavColor();

        setTimeout(updateParticleNavLoop, 500);
    } catch (error) {
        console.error('Failed to update nav color:', error);
        setTimeout(updateParticleNavLoop, 500);
    }
}

document.addEventListener('page:changed', () => {
    updateNavColor();
    particleSystem?.updateBaseColor();
});

document.addEventListener("page:transitionend", () => {
    logoThing = document.getElementById('logo-thing')
    updateNavColor();
    particleSystem?.updateBaseColor();
});

updateParticleNavLoop()