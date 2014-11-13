function Keypress(keycode,name,action,isdown)
{
    this.keycode = keycode;
    this.name = name;
    this.action = action;
    this.isdown = isdown;
    return this;
}

function Gamepad()
{
    this.up=false;
    this.down=false;
    this.left=false;
    this.right=false;
    this.space=false;
}


$(document).keyup(function(e) {
            //console.log(e.which);
            switch(e.which)
            {
                case 32:
                    checkInput(new Keypress(32,"Space","Up",false));
                    game.toggleSim(); //**BAD HACK**//Please fix me by expanding the controller object!
                    break;
                case 37:
                    checkInput(new Keypress(37,"Left","Up",false));
                    break;
                case 38:
                    checkInput(new Keypress(38,"Up","Up",false));
                    break;
                case 39:
                    checkInput(new Keypress(39,"Right","Up",false));
                    break;
                case 40:
                    checkInput(new Keypress(40,"Down","Up",false));
                    break;
                default:
                    //console.log("No Binding");
                    break;
            }
});
$(document).keydown(function(e) {
            //console.log(e.which);
            switch(e.which)
            {
                case 32:
                    checkInput(new Keypress(32,"Space","Down",true));
                    break;
                case 37:
                    checkInput(new Keypress(37,"Left","Down",true));
                    break;
                case 38:
                    checkInput(new Keypress(38,"Up","Down",true));
                    break;
                case 39:
                    checkInput(new Keypress(39,"Right","Down",true));
                    break;
                case 40:
                    checkInput(new Keypress(40,"Down","Down",true));
                    break;
                default:
                    //console.log("No Binding");
                    break;
            }
});

function checkInput(keypress) {
    //console.log(keypress.name+" key is "+keypress.action);
}
