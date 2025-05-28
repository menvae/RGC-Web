const body: HTMLElement = document.body;
let posX: number = 0;
let posY: number = 0;
const speedX: number = 0.5;
const speedY: number = -0.5;

let styleSheet: HTMLStyleElement;

styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);

document.addEventListener('page:changed', () => {
    styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);
})

function animateBackground(): void {
    posX += speedX;
    posY += speedY;

    styleSheet.textContent = `
        body::before {
            background-position: ${posX}px ${posY}px;
        }
    `;

    requestAnimationFrame(animateBackground);
}

animateBackground();
