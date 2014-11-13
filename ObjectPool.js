ObjectPool = function(startingSize, batchSize){
    console.log("creating new object pool with "+startingSize+" objects");
    this.pool = [];
    this.batch = batchSize;
    this.startingSize = startingSize;
    
    var self = this;
    
    this.addObject = function(){
	//override for the specific object
    }
    
    this.requestObject = function(){
	//console.log("retrieving an object from the pool");
	if (this.pool.length<1) {
	    this.addBatch();
	}
	var obj = this.pool.pop();
	//console.log("the pool now contains "+this.pool.length+" objects");
	return obj;
    }
    this.returnObject = function(objectToReturn){
	//console.log("returning an object to the pool");
	objectToReturn.reset();
	this.pool.unshift(objectToReturn);
	//console.log("the pool now contains "+this.pool.length+" objects");
    }
    this.addBatch = function(){
	//console.log("adding a new batch of objects");
	for (var i=0;i<this.batch;i++) {
	    this.addObject();
	}
    }
    
    this.init = function(){
	for(var i=0;i<startingSize;i++){
	    this.addObject();
	}
	//console.log("pool constructed with "+this.pool.length+" objects");
    }
}