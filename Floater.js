var f1 = PIXI.Texture.fromImage("assets/floaters/1.png");
var f2 = PIXI.Texture.fromImage("assets/floaters/2.png");
var f3 = PIXI.Texture.fromImage("assets/floaters/3.png");
var f4 = PIXI.Texture.fromImage("assets/floaters/4.png");
var f5 = PIXI.Texture.fromImage("assets/floaters/5.png");
var floaterTex = [f1,f2,f3,f4,f5];

var firstPass = true;

function addFloater(layer){
    var fChoice = randomChoice(floaterTex);
    var floater = new PIXI.Sprite(fChoice);
    floater._width = 20
    floater._height = 30;
    floater.anchor = {x:0.5,y:0.5};
    
    Floater.call(floater);
    floater.init();
    
    floaters.push(floater);
    layer.addChild(floater);
    
}

Floater = function(){
    var self = this;
    this.init = function(){
	self.position.x = Math.random()*stageWidth;
	if (firstPass) {
	    self.position.y = (Math.random()*stageHeight*2)-stageHeight;
	}else{
	    self.position.y = -Math.random()*stageHeight;
	}
	self.vx = (Math.random()*0.2)-0.1;
	self.vy = (Math.random()*0.2)+0.05;
	self.vr = (Math.random()*0.04)-0.02;
	self.alpha = (Math.random()*0.3)+0.15;
	
    }
    this.update = function(){
	self.position.x+= self.vx;
	self.position.y+= self.vy;
	self.rotation+= self.vr;
	
	if (self.position.x>stageWidth+30||self.position.x<-30||self.position.y>stageHeight+30) {
	    self.init();
	}
    }
}

function randomChoice(array) {
    var c = Math.floor(Math.random()*array.length);
    return array[c];
}