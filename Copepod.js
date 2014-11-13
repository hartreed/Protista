Copepod = function(){
    var self = this;
    
    this.view = renderer.createDisplay('sprite',{
	    texture : 'assets/copepod.png',
	    anchor: {
		x: 0.5,
		y: 0.5
	    }
	}
    );
    this.view._width = this.radius*1.6;
    this.view._height = this.radius*1.2;
    this.label = 'copepod';
    
    self.hit = false;
    var hitTint = 0xFF0000;
    var clearTint = 0xFFFFFF;
    
    this.checkHit = function(){
	if (self.hit) {
	    console.log("Ouch!!");
	    self.view.tint = hitTint;
	    self.hit = false;
	}else{
	    self.view.tint = clearTint;
	}
    }
}

function addCopepod() {
    var magnitude = Math.ceil(Math.random()*6)+40;
    var radius = magnitude;
    var mass = magnitude/4;
    cope = newCopepod(radius,mass);
    Meanderthal.call(cope,0,1,0,true);
    entities.push(cope);
    world.add(cope);   
}

function newCopepod(radius,mass){
    var copepod = newSphere(radius,mass);
    Copepod.call(copepod);
    return copepod;
}

function updateCope(){
    var dx = tracker.position.x-cope.state.pos.x;
    var dy = tracker.position.y-cope.state.pos.y;
    var speed = 0.00013;
    dx*=speed;
    dy*=speed;
    cope.applyForce({x:dx,y:dy});
    cope.checkHit();
}