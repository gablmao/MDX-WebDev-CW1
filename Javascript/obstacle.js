import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty
} from "./update.js";

const SPEED = 0.05 //same as the speed of the ground
//min and max times to spawn an obstacle
const OBSTACLE_INTERVAL_MIN = 500
const OBSTACLE_INTERVAL_MAX = 3000
//retrieve game canvas to spawn the obstacles
const gameWorld = document.querySelector(".GameCanvas");

let nextObstacleTime;
export function setupObstacle() {
    nextObstacleTime = OBSTACLE_INTERVAL_MIN;
    document.querySelectorAll("[data-obstacle]").forEach(obs => {
        obs.remove()
    })
}

export function updateObstacle(delta, speedScale) {
    document.querySelectorAll("[data-obstacle]").forEach(obs => {
        incrementCustomProperty(obs, "--left", delta * speedScale * SPEED * -1)  //moves from right of screen to left

        if (getCustomProperty(obs, "--left") <= -100) {  //off-screen left by 100
            obs.remove()
        }
    })

    //after some time passes by, spawn a new obstacle
    if (nextObstacleTime <= 0) {
        createObstacle()
        nextObstacleTime = ranNumber(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedScale
    }
    nextObstacleTime -= delta
}

//generate random number within range
function ranNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//obstacle generation
function createObstacle() {
    const obs = document.createElement("img")
    obs.dataset.obs = true
    obs.src = "./Images/rat.png"
    obs.classList.add("obs")
    setCustomProperty(obs, "--left", 95)
    gameWorld.append(obs)
}

//obstacle hitbox
export function getObstacleRect() {
    return [...document.querySelectorAll("[data-obstacle]")].map(obs => {
        return obs.getBoundingClientRect()  //gives the top,bottom,left and right sides of the obstacle
    })
}