//A basic PixiJS & PhysicsJS game world
Game = function(stageWidth,stageHeight){
    renderer = Physics.renderer('pixi', {
	    el: 'game', // The DOM element to append the stage to
	    width: stageWidth,
	    height: stageHeight,
	    meta: false, // Turns debug info on/off
	});
	
	world = Physics({
	    timestep: 1000.0 / 160
	});
	world.add(renderer);
    
	stage = renderer.stage;
	
	texture = PIXI.Texture.fromImage("assets/darkSea.png");
	background = new PIXI.TilingSprite(texture,stageWidth,stageHeight);
	background.vx = 0;
	background.scrollSpeed = 1.2;
	background.angularDampening = 0.001;
	stage.addChild(background);
	
	var viewportBounds = Physics.aabb(0, 0, stageWidth, stageHeight);
	
	world.add(Physics.behavior('edge-collision-detection', {
	    aabb: viewportBounds,
	    restitution: 0.6,
	    cof: 0.99,
	    label:'bounds'
	}));
	
	world.add(Physics.behavior('body-impulse-response') );
	world.add(Physics.behavior('body-collision-detection') );
	world.add(Physics.behavior('sweep-prune') );
	world.add(Physics.behavior('interactive', { el: renderer.el }));
	
	var attractor = Physics.behavior('attractor', {
	    order: 0,
	    strength: .001
	});
	world.on({
	    'interact:poke': function( pos ){
		attractor.position( pos );
		world.add( attractor );
	    }
	    ,'interact:move': function( pos ){
		attractor.position( pos );
	    }
	    ,'interact:release': function(){
		world.remove( attractor );
	    }
	});
	
	world.on('step', function(){
	    world.render();
	});
	Physics.util.ticker.on(function( time ){
	    applyInput();
	    animate();
	    world.step( time );
	});
	
	window.addEventListener('resize', function () {
    
	    stageWidth = $("#game").width();
	    stageHeight = $("#game").height();
    
	    renderer.el.width = stageWidth;
	    renderer.el.height = stageHeight;
    
	    viewportBounds = Physics.aabb(0, 0, stageWidth, stageHeight);
	    // update the boundaries
	    world.add(Physics.behavior('edge-collision-detection', {
		aabb: viewportBounds,
		restitution: 0.00,
		cof: 0.3
	    }));
    
	}, true);
	
	this.world = world;
	this.graphics = new PIXI.Graphics();
	
	//Create the controller object
	this.gamepad = new Gamepad();
	
	//Start the simulation
	this.timer = Physics.util.ticker;//Physics.util.ticker.start();
	
	this.simRunning = true;
	
	this.renderer = renderer;
	this.stage = stage;
	this.toggleSim = function(){
	    if (this.simRunning) {
		console.log("Stopping physics simulation");
		this.timer.stop();
	    }else{
		console.log("Starting physics simulation");
		this.timer.start();
	    }
	    this.simRunning = !this.simRunning;
	}
}