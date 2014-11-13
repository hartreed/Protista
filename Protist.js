//Entity classes and prototypes for Protista game

//Reconfigure this into a Factory
//Create object pools for different kinds of protists
//Add method to return object to pool
//Improve scaling method to allow for better feeding behavior
//Add methods to check surrounding area, pursue food, determine how much energy to use, and flee from predators
function newEntity(radius,mass) {
    tints = {clear:0xFFFFFF,green:0x98f8ca,blue:0x98e9f8};
    
    var entity = Physics.body('circle', {
        x: Math.floor(Math.random()*stageWidth), // x-coordinate
        y: Math.floor(Math.random()*stageHeight), // y-coordinate
        vx: 0.2-Math.random()*0.4, // velocity in x-direction
        vy: 0.2-Math.random()*0.4, // velocity in y-direction,
	angularVelocity: 0.001-Math.random()*0.002,
        restitution: 0.99,
        radius: radius,
        mass: mass,
        label: 'entity',
	
	//My properties:
	maxSize: 50,
	minSize: 5
    });
    entity.view = renderer.createDisplay('sprite', {
            texture: 'assets/protist.png',
            anchor: {
                x: 0.5,
                y: 0.5,
            },
        }
    );
    /*for(var prop in entity.view){
	console.log(prop);
    }*/
    entity.view._width = radius*4.4;
    entity.view._height = radius*4.2;
    //entity.view.alpha = 0.6;
    var tintNames = Object.getOwnPropertyNames(tints);
    var num = Math.floor(Math.random()*tintNames.length);
    var tint = tints[tintNames[num]];
    //entity.view.tint = tint;
    //console.log(entity.view.scale); //Alternate method of scaling
    //entity.view.scale.x = 0.5;
    //entity.view.scale.y = 0.5;

    return entity;
}
function newSphere(radius,mass){
    var entity = Physics.body('circle', {
        x: Math.floor(Math.random()*stageWidth), // x-coordinate
        y: Math.floor(Math.random()*stageHeight), // y-coordinate
        vx: 0.02-Math.random()*0.04, // velocity in x-direction
        vy: 0.02-Math.random()*0.04, // velocity in y-direction,
	angularVelocity: 0.0001-Math.random()*0.0002,
        restitution: 0.99,
        radius: radius,
        mass: mass,
        label: 'entity',
    });
    return entity;
}

function newProtist(radius,mass){
    var protist = newEntity(radius,mass);
    Protist.call(protist);
    return protist;
}

Protist = function(){
    var self = this;
    this.label = 'protist';
    this.alterSize = function(ratio){
	var oldRadius = self.radius;
	self.radius *= ratio;
	if (self.radius>self.maxSize&&ratio>1) {
	    //console.log("Reached Max Size");
	    return
	}else if (self.radius<self.minSize&&ratio<1) {
	    //console.log("I'm too small!");
	    return
	}
	self.geometry = Physics.geometry('circle', {
		radius: self.radius
	    });
	var scaleFactor = self.radius/oldRadius;
	//console.log("Radius is now "+this.radius);
	self.mass = (self.radius-10)/2;
	if (self.mass<1) {
	    self.mass = 1;
	}else if (self.mass>20) {
	    self.mass = 20;
	}
	self.view.scale.x *= scaleFactor;
	self.view.scale.y *= scaleFactor;
	self.recalc();
    }
    this.feed = function(calories){
	self.alterSize(self.radius+calories/self.radius);
    }
}
