import processing.video.*;

Capture video;
ColorTracker red,green,blue;

float pitch;
float pitchOrigin;
float pitchMin;
float pitchMax;
float yaw;
float yawOrigin;
float yawMin;
float yawMax;

color redColor;
color greenColor;
color blueColor;

boolean calibrated = false;
boolean centered = false;
boolean lbound = false;
boolean rbound = false;
boolean ubound = false;
boolean dbound = false;

void setup(){
  size(640,480);
  video = new Capture(this, width, height);
  video.start();
  
  pitchOrigin = height/2;
  yawOrigin = width/2;
  
  loadColors();
  println(greenColor);
  
  red = new ColorTracker(redColor,video);
  green = new ColorTracker(greenColor,video);
  blue = new ColorTracker(blueColor,video);
  red.setSmoothing(false);
  red.blobMinSize = 6;
  green.setSmoothing(true);
  green.blobMinSize = 6;
  blue.setSmoothing(true);
  blue.blobMinSize = 6;
}

void draw(){
  video.loadPixels();
  //red.update();
  blue.update();
  green.update();
  if(lbound&&ubound&&rbound&&dbound&&centered){
    calibrated = true;
  }
  if(calibrated){
    processPosition();
    
    String [] data  = {str(yaw)+","+str(pitch)};
    saveStrings("../data/track.txt",data);
  }
  if(videoToggle){
    pushMatrix();
    scale(-1,1);
    translate(-width,0);
    image(video,0,0);
    popMatrix();
    //red.drawMarker();
    blue.drawMarker();
    green.drawMarker();
  }else if (calibrated){
    fill(0);
    rect(0,0,width,height);
    fill(255);
    ellipse((yaw/100)*width,(pitch/100)*height,15,15);
    fill(green.target);
    if(!green.visible){fill(100);}
    ellipse((width/2)-15,30,30,30);
    fill(blue.target);
    if(!blue.visible){fill(100);}
    ellipse((width/2)+15,30,30,30);
  }
  
}

void processPosition(){
  if(blue.visible&&green.visible){
    pitch = map(pitchOrigin - ((blue.y+green.y)/2),pitchMin,pitchMax,100,0);
    yaw = map(yawOrigin - ((blue.x+green.x)/2),yawMin,yawMax,0,100);
    println("Pitch: "+pitch);
    println("Yaw: "+yaw);
  }
}

void setOrigins(){
  if(blue.visible&&green.visible){
    pitchOrigin = (blue.y+green.y)/2;
    yawOrigin = (blue.x+green.x)/2;
  }
  centered = true;
}

void setPitchMax(){
  if(blue.visible&&green.visible){
  pitchMax = pitchOrigin-(blue.y+green.y)/2;
  }
  ubound = true;
}

void setPitchMin(){
  if(blue.visible&&green.visible){
  pitchMin = pitchOrigin-(blue.y+green.y)/2;
  }
  dbound = true;
}

void setYawMax(){
  if(blue.visible&&green.visible){
  yawMax = yawOrigin-(blue.x+green.x)/2;
  }
  rbound = true;
}

void setYawMin(){
  if(blue.visible&&green.visible){
  yawMin = yawOrigin-(blue.x+green.x)/2;
  }
  lbound = true;
}
