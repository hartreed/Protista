//Override checkInput to control game
function checkInput(keypress) {
    //console.log(keypress.name+" key is "+keypress.action);
    switch(keypress.name) {
        case "Up":
            gamepad.up=keypress.isdown;
            break;
        case "Down":
            gamepad.down=keypress.isdown;
            break;
        case "Left":
            gamepad.left=keypress.isdown;
            break;
        case "Right":
            gamepad.right=keypress.isdown;
            break;
        case "Space":
            gamepad.space=keypress.isdown;
            break;
    }
}

//Called in game loop to check current state of gamepad
function applyInput() {
    //console.log("doin stuff");
    if (gamepad.up) {
        
        if(!bunny.ragdoll){checkJump();}//bunny.applyForce({x:0.0,y:-0.008});
        //thrust(true);
    }
    if (gamepad.down) {
        if(!bunny.ragdoll){checkFall();}
        //thrust(false);
    }else if (gamepad.left) {
        if(!bunny.ragdoll){bunny.applyForce({x:-0.004,y:0});}
        //space.vx += space.scrollSpeed;
    }else if (gamepad.right) {
        if(!bunny.ragdoll){bunny.applyForce({x:0.004,y:0});}
        //space.vx -= space.scrollSpeed;
    }
    if (gamepad.space) {
        //resetBunny();
    }
}