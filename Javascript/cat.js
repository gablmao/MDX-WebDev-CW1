import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./update.js";

const catElement = document.querySelector(".cat");
/**
 to change how high the cat can jump, adjust JUMP_SPEED and GRAVITY
 JUMP_SPEED refers to how quick and high the cat jumps
 GRAVITY refers to how quick the cat will descend after a jump
 */
const JUMP_SPEED = 0.35
const GRAVITY = 0.001
const CAT_FRAME_COUNT = 2 //2 for two different images for the cat (animation)
const FRAME_TIME = 350 //how long one image lasts before switching to the next


let isJumping;
let catFrame;
let cuurentFrameTime;
let yVel;

//create cat
export function setupCat() {
    isJumping = false;
    catFrame = 0;
    cuurentFrameTime = 0;
    yVel = 0;
    setCustomProperty(catElement, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}


//cat functions
export function updateCat(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}


//cat hitbox
export function getCatRect() {
    return catElement.getBoundingClientRect()
}

//display different image when collided with obstacle (rat)
export function setCatLose() {
    catElement.src = `./Images/player_lost.png`
}


//go through different images when it's runnning
function handleRun(delta, speedScale) {
    if (isJumping) {
        catElement.src = `./Images/player.png`
        return
    }

    if (cuurentFrameTime >= FRAME_TIME) {
        catFrame = (catFrame + 1) % CAT_FRAME_COUNT
        catElement.src = `./Images/player_run${catFrame}.png`  //0 or 1
        cuurentFrameTime -= FRAME_TIME
    }
    cuurentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(catElement, "--bottom", yVel * delta)

    if (getCustomProperty(catElement, "--bottom") <= 0) {
        setCustomProperty(catElement, "--bottom", 0)
        isJumping = false;
    }

    yVel -= GRAVITY * delta
}

//user input for jump
function onJump(event) {
    if (event.code !== "ArrowUp" || isJumping) return

    yVel = JUMP_SPEED
    isJumping = true;
}