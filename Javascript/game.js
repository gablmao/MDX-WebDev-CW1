const canvas = document.getElementById("GameCanvas");
const ctx = canvas.getContext("2d");

//main class
let shape = {
    x: 365, // Initial location of shape, in the x-axis
    y: 400, // Initial location of shape, in the y-axis
    width: 50,
    height: 50,
    speed: 2, // Speed of vertical movement
    direction: 1, // 1 for down, -1 for up
};


/*
//main class for player and enemies
//create child class for enemies

const object = {
    //attributes
    health = 100;
    alive = true;

    //function to check state of object
    //if alive, stay on canvas.
    //if dead, update alive=false; then remove from canvas
    state: function(alive){
        console.log(this.alive);
    ammoRate = 1;
    }


    //creates object
    const objStr = JSON.stringify(object);
    console.log(objStr);
}
*/


function drawShape() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#edc192";
    ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
}

function updateShapePosition() {

    shape.y += shape.speed * shape.direction;  // Shape moves in the y-direction 

    if (shape.y < 0 || shape.y + shape.height > canvas.height) {
    shape.direction *= -1;
    }  // Changes direction when reaching canvas borders
}

function animate() {
    drawShape();
    updateShapePosition();
    requestAnimationFrame(animate);
}

animate();



window.onload = ()=> {
    window.onkeydown = (event)=>{
        console.log(event);
    }
}