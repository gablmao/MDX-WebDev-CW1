import {
    setupGround,
    updateGround
} from './ground.js'

import {
    setupCat,
    updateCat,
    getCatRect,
    setCatLose
} from './cat.js'

import {
    setupObstacle,
    updateObstacle,
    getObstacleRect
} from './obstacle.js'


const gameWorld = document.querySelector(".GameCanvas");
const scoreElement = document.querySelector("[data-score]");
const startScreenElement = document.querySelector("[data-startScreen]");
const game_width = 100;
const game_height = 30;
const SPEED_SCALE_INCREASE = 0.00001  //game progressively increases in speed by this amount

setPixelToGameScale();
window.addEventListener("resize", setPixelToGameScale)
document.addEventListener("keydown", handleStart, {
    once: true
})

let lastTime;
let speedScale;
let score;

function update(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return
    }
    const delta = time - lastTime;

    updateGround(delta, speedScale);
    updateCat(delta, speedScale);
    updateObstacle(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);
    if (didYouLose()) return handleLose();

    lastTime = time;
    window.requestAnimationFrame(update);
}

//game over handling
function didYouLose() {
    const catRect = getCatRect()
    return getObstacleRect().some(rect => isCollision(rect, catRect))
}

function isCollision(rect1, rect2) {
    return rect1.left < rect2.right && rect1.top < rect2.bottom && rect1.right > rect2.left && rect1.bottom > rect2.top
}


//updates how fast the game goes
function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
}

//increments score every second passes by
function updateScore(delta) {
    score += delta * 0.01
    scoreElement.textContent = Math.floor(score)
}

//game starts once keyboard input pressed down
function handleStart() {
    lastTime = null;
    speedScale = 1;
    score = 0
    setupGround();
    setupCat();
    setupObstacle();
    startScreenElement.classList.add("hide") //hides start text once a key is pressed
    window.requestAnimationFrame(update);
}


function handleLose() {
    setCatLose()
    setTimeout(() => {
        document.addEventListener("keydown", handleStart(), { once: true })
        startScreenElement.classList.remove("hide")
    }, 100)
}


//resize the game to whatever the browser window resolution is currently
function setPixelToGameScale() {
    let gameToPixelScale;
    if (window.innerWidth / window.innerHeight < game_width / game_height) {
        gameToPixelScale = window.innerWidth / game_width
    } else {
        gameToPixelScale = window.innerHeight / game_height
    }

    gameWorld.style.width = `${game_width * gameToPixelScale}px`
    gameWorld.style.height = `${game_height * gameToPixelScale}px`
}