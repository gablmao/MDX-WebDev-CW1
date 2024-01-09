import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty
} from "./update.js";

const ground = document.querySelectorAll("[data-ground]");
const SPEED = 0.05;

//two copies of the same ground image, creating an illusion of an infinite loop
export function setupGround() {
    setCustomProperty(ground[0], "--left", 0)
    setCustomProperty(ground[1], "--left", 300)
}


export function updateGround(delta, speedScale) {
    ground.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)  //moves from right of screen to left

        //move ground back to the right after passing off-screen left for some distance
        if (getCustomProperty(ground, "--left") <= -300) {
            incrementCustomProperty(ground, "--left", 600)
        }
    })
}