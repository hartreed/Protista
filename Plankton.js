pid = 0;
p1 = PIXI.Texture.fromImage("assets/plankton.png");
p2 = PIXI.Texture.fromImage("assets/plankton2.png");
p3 = PIXI.Texture.fromImage("assets/plankton3.png");
var pTex = [p1,p2,p3];

Plankton = function(){
    this.view = renderer.createDisplay('sprite',{
	    texture : 'assets/plankton.png',
	    anchor: {
		x: 0.5,
		y: 0.5
	    }
	}
    );
    /*var tex = Math.floor(Math.random()*pTex.length);
    this.view.texture = pTex[tex];
    switch (tex){
	case 0:
	    this.view._width = this.radius*2.4;
	    this.view._height = this.radius*4.4;
	    break;
	case 1:
	    this.view._width = this.radius/32;
	    this.view._height = this.radius/32;
	    break;
	case 2:
	    this.view._width = this.radius/32;
	    this.view._height = this.radius/32;
	    break;
    }*/
    this.view._width = this.radius*2.4;
    this.view._height = this.radius*4.4;
    this.label = 'plankton';
    this.id = pid++;
    this.view.alpha = 0;
    
    this.energy = 40;
    
    this.init = function(){
	this.view.alpha = 1.0;
    }
    
    this.reset = function(){
	this.state.pos.x = Math.floor(Math.random()*stageWidth), // x-coordinate
        this.state.pos.y = Math.floor(Math.random()*stageHeight), // y-coordinate
        this.state.vel.x = 0.2-Math.random()*0.4, // velocity in x-direction
        this.state.vel.y = 0.2-Math.random()*0.4, // velocity in y-direction,
	this.state.angular.vel = 0.001-Math.random()*0.002
	this.view.alpha = 0.0;
	world.removeBody(this);
    }
}
function bleh() {
    console.log("bleh");
}

function addPlankton(radius,mass){
    var p = planktonPool.requestObject();
    p.init();
    plankton.push(p);
    numPlankton++;
    world.add(p);
}
function newPlankton() {
    //console.log("adding plankton");
    var magnitude = Math.ceil(Math.random()*3)+4;
    var radius = magnitude;
    var mass = magnitude/4;
    var plankton = newSphere(radius,mass);
    Plankton.call(plankton);
    Meanderthal.call(plankton,0.003,0.3,1,false);
    return plankton;
}

function removePlankton(p) {
    numPlankton--;
    for (var i=0;i<plankton.length;i++){
	if (plankton[i].id==p.id) {
	    plankton.splice(i,1);
	    break;
	}
    }
    planktonPool.returnObject(p);
}

PlanktonPool = function(startingSize, batchSize){
    ObjectPool.call(this,startingSize,batchSize);
    
    this.addObject = function(){
	var p = newPlankton();
	this.pool.push(p);
    }
    this.init();
}