
import Ball from "./Ball";


const ball = new Ball(document.querySelector('.ball'))

let lastTime = null;

function update(time) {
    if (lastTime) {
        const delta = time - lastTime;
        ball.update(delta);
    }
    lastTime = time;
    // window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)