import { OsuParticles } from "../OsuParticles.ts"

document.addEventListener('DOMContentLoaded', () => {
    const particleSystem = new OsuParticles('NF_bg', 900, 120, 3, 0.65, 0.1);
    particleSystem.init(120);
});
