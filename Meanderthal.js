var Meanderthal = function(baseSpeed,chance,meanderAngle,faceDir){
    var self = this;
    self.baseSpeed = baseSpeed;
    self.chance = chance;
    self.meanderRange = meanderAngle;
    self.follow = faceDir;
    self.meander = function(){
	var xPos = self.state.pos.x;
	var yPos = self.state.pos.y;
	var vx = self.state.vel.x;
	var vy = self.state.vel.y;
	var angle = self.state.angular.pos;
	
	if (Math.random()>self.chance) {
	    if (self.follow) {
		/*var turn = (Math.random()*self.meanderRange*2)-self.meanderRange;
		//self.state.angular.pos += turn;
		var cx = Math.cos(self.state.angular.pos+turn)*self.baseSpeed;
		var cy = Math.sin(self.state.angular.pos+turn)*self.baseSpeed;
		self.applyForce({x:cx,y:cy});*/
		//self.state.angular.vel = 0;
		//console.log(cx+", "+cy);
		
	    }else{
		var dx = (Math.random()*self.baseSpeed*2)-self.baseSpeed;
		var dy = (Math.random()*self.baseSpeed*2)-self.baseSpeed;
		self.applyForce({x:dx,y:dy});
	    }
	}
	if (self.follow) {
	    self.state.angular.pos = Math.atan2(self.state.vel.y,self.state.vel.x) + Math.PI/2;
	    self.state.angular.vel = 0;
	    //self.state.angular.acc = 0;
	}
	
	//console.log("meandering "+dx+" in the x axis and "+dx+" in the y axis");
    }
    //Physics.util.throttle(self.meander,50);
    self.quack = function(){
	console.log("I, an humble plankton, do solemnly quack");
    }
}