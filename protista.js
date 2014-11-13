pitch = 0;
yaw = 0;

function init() {
    console.log("initializing");
    
    stageWidth = $("#game").width();
    stageHeight = $("#game").height();
    
    console.log(stageWidth),
    console.log(stageHeight)
    
    game = new Game(stageWidth,stageHeight);
    stage = game.stage;
    renderer = game.renderer;
    graphics = game.graphics;
    gamepad = game.gamepad;
    timer = game.timer;
    
    floatLayer = new PIXI.DisplayObjectContainer();
    floatLayer._width = 1440;
    floatLayer._height = 900;
    stage.addChild(floatLayer);
    
    entities = [];
    plankton = [];
    floaters = [];
    //create object pools:
    numPlankton = 0;
    planktonPool = new PlanktonPool(20,5);
    
    //Add entities here:
    numFloaters = 100;
    for(var i=0;i<numFloaters;i++){
	addFloater(floatLayer);
    }
    firstPass = false;
    
    var numEnts = 12;
    for(var i=0;i<numEnts;i++){addEntity();}
    var numPlank = 60;
    for (var i=0;i<numPlank;i++) {
	addPlankton();
    }
    addCopepod();
    
    addTracker();
    
    
    timer.start();
    
    var entityQuery = Physics.query({
        $or: [
            { bodyA: { label: 'protist' }, bodyB: { label: 'protist' } }
            ,{ bodyB: { label: 'protist' }, bodyA: { label: 'protist' } }
        ]
    });
    var copepodQuery = Physics.query({
        $or: [
            { bodyA: { label: 'copepod' }, bodyB: { label: 'plankton' } }
            ,{ bodyB: { label: 'copepod' }, bodyA: { label: 'plankton' } }
        ]
    });
    var feedQuery = Physics.query({
        $or: [
            { bodyA: { label: 'protist' }, bodyB: { label: 'plankton' } }
            ,{ bodyB: { label: 'protist' }, bodyA: { label: 'plankton' } }
        ]
    });
    var hurtQuery = Physics.query({
        $or: [
            { bodyA: { label: 'protist' }, bodyB: { label: 'copepod' } }
            ,{ bodyB: { label: 'protist' }, bodyA: { label: 'copepod' } }
        ]
    });
    game.world.on('collisions:detected', function( data, e ){
        /*var found = Physics.util.find( data.collisions, entityQuery );
        if ( found ){
	    if (found.bodyA.radius>found.bodyB.radius) {
		found.bodyA.alterSize(1.01);
		found.bodyB.alterSize(0.95);
	    }else{
		found.bodyA.alterSize(0.95);
		found.bodyB.alterSize(1.01);
	    }
	}*/
	var found = Physics.util.find( data.collisions, copepodQuery );
        if ( found ){
	    if (found.bodyA.label=="copepod"){
		removePlankton(found.bodyB);
	    }else{
		removePlankton(found.bodyA);
	    }
	}
	found = Physics.util.find( data.collisions, feedQuery );
        if ( found ){
	    if (found.bodyA.label=="protist"){
		found.bodyA.feed(found.bodyB.energy);
		removePlankton(found.bodyB);
	    }else{
		found.bodyB.feed(found.bodyA.energy);
		removePlankton(found.bodyA);
	    }
	}
	found = Physics.util.find( data.collisions, hurtQuery );
        if ( found ){
	    if (found.bodyA.label=="protist"){
		found.bodyB.hit = true;
	    }else{
		found.bodyA.hit = true;
	    }
	}
    });
    //game.world.timestep(1000/60);
    
    setInterval(runBehaviors,50);
    setInterval(sendHTTP,50);
}

function animate() {
    if (numPlankton<5&&Math.random()>0.9) {
	for(var i=0;i<50;i++){
	    addPlankton();
	}
    }
    for (var p of plankton){
	p.meander();
    }
    for(var f of floaters){
	f.update();
    }
    cope.meander();
}

function runBehaviors() {
    if (game.simRunning) {
	updateTracker();
	updateCope();
    }
}

function addTracker(){
    var trackTexture = PIXI.Texture.fromImage("assets/plankton3.png");
    tracker = new PIXI.Sprite(trackTexture);
    tracker._width = 60;
    tracker._height = 60;
    tracker.anchor = {x:0.5,y:0.5};
    tracker.position.x = (stageWidth/2)-tracker._width/2;
    tracker.position.y = (stageHeight/2)-tracker._height/2;
    tracker.lastX = tracker.position.x;
    tracker.lastY = tracker.position.y;
    stage.addChild(tracker);
}

function updateTracker(){
    if (yaw<0) {
	yaw=0;
    }else if (yaw>100) {
	yaw = 100;
    }
    if (pitch<0) {
	pitch=0;
    }else if (pitch>100) {
	pitch = 100;
    }
    var yt = (yaw/100)*stageWidth;
    var pt = (pitch/100)*stageHeight;
    //tracker.lastX = tracker.position.x;
    //tracker.lastY = tracker.position.y;
    tracker.position.x = (yt-(tracker._width/2));//+tracker.lastX)/2;
    tracker.position.y = (pt-(tracker._height/2));//+tracker.lastY)/2;
    tracker.rotation+=0.08;
    
}

function addEntity() {
    var magnitude = Math.ceil(Math.random()*20);
    var radius = magnitude + 10;
    var mass = magnitude/2;
    var entity = newProtist(radius,mass);
    entities.push(entity);
    world.add(entity);   
}