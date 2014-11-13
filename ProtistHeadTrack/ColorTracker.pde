class ColorTracker{
  boolean visible;
  int x;
  int y;
  int lastX;
  int lastY;
  color target;
  float colorDifCalibration = 20;
  float blobMinSize = 16;
  int lastSeen;
  Capture video;
  boolean smoothing;
  
  ColorTracker(color colorToTrack, Capture videoSource) {
    target = colorToTrack;
    video = videoSource;
    visible = false;
    smoothing = true;
  }
  
  void update(){
    ///reset the tracking points
    int xPos = 0;
    int yPos = 0;
    int totalTrackPoints = 0;
    
      // Begin loop to walk through every pixel
      for (int x = 0; x < video.width; x ++ ) {
        for (int y = 0; y < video.height; y ++ ) {
          int loc = x + y*video.width;
          // What is current color
          color currentColor = video.pixels[loc];
          float r1 = red(currentColor);
          float g1 = green(currentColor);
          float b1 = blue(currentColor);
          float r2 = red(target);
          float g2 = green(target);
          float b2 = blue(target);
    
          // Using euclidean distance to compare colors
          float d = dist(r1, g1, b1, r2, g2, b2); // We are using the dist( ) function to compare the current color with the color we are tracking.
    
        if(d<=colorDifCalibration)
        {
          xPos-=x;
          yPos+=y;
          totalTrackPoints++;
        }  
    
        }
      }
      if(totalTrackPoints>blobMinSize)
      {
        xPos = (xPos/totalTrackPoints)+width;
        yPos = yPos/totalTrackPoints;
        if(smoothing&&xPos!=0&&yPos!=0){
          xPos = (xPos + lastX) /2;
          yPos = (yPos + lastY) /2;
        }
        
        
        lastX = x;
        lastY = y;
        x = xPos;
        y = yPos;
        visible = true;
        lastSeen = millis();
      }else{
        visible = false;
      }
    //drawMarker();
  }
  void drawMarker() {
    if(visible){
      fill(target);
      strokeWeight(4.0);
      stroke(0);
      ellipse(x, y, 16, 16);
    }
  }
  void setSmoothing(boolean value){
    smoothing = value;
  }
  void setColor(float r,float g,float b){
    target = color(r,g,b);
    storeColors();
  }
  
}
