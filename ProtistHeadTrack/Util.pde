color trackColor;
boolean videoToggle = true;
char ballChange = 'o';

void loadColors(){
  String[] colorValues = loadStrings("../data/colors.txt");
  for (int i=0;i<colorValues.length;i++){
    String[] rgbVals = colorValues[i].split(",");
    switch(i){
      case 0:
      redColor = color(int(rgbVals[0]),int(rgbVals[1]),int(rgbVals[2]));
      break;
      case 1:
      greenColor = color(int(rgbVals[0]),int(rgbVals[1]),int(rgbVals[2]));
      break;
      case 2:
      blueColor = color(int(rgbVals[0]),int(rgbVals[1]),int(rgbVals[2]));
      break;
    }
  }
}

void storeColors(){
  String[] colorValues = new String[3];
  colorValues[0] = str(red(red.target))+","+str(green(red.target))+","+str(blue(red.target));
  colorValues[1] = str(red(green.target))+","+str(green(green.target))+","+str(blue(green.target));
  colorValues[2] = str(red(blue.target))+","+str(green(blue.target))+","+str(blue(blue.target));
  saveStrings("../data/colors.txt",colorValues);
}



void mousePressed() {
  // Save color where the mouse is clicked in trackColor variable
  int loc = (video.width-mouseX) + mouseY*video.width;
  trackColor = video.pixels[loc];
  float r = red(trackColor);
  float g = green(trackColor);
  float b = blue(trackColor);
  println(r);
  println(g);
  println(b);
  if(ballChange!='o'){
    switch(ballChange){
      case 'r':
       red.setColor(r,g,b);
       break;
     case 'g':
       green.setColor(r,g,b);
       break;
     case 'b':
       blue.setColor(r,g,b);
       break;
     /*case 'y':
       yellowBall.setColor(r,g,b);
       break;
     case 'p':
       pinkBall.setColor(r,g,b);
       break;
     case 'a':
       grayBall.setColor(r,g,b);
       break;*/
    }
    ballChange='o';
  }
}


void keyReleased()
{
   switch(key) {
     case 'v':
       videoToggle=!videoToggle;
       break;
     /*case 'r':
       ballChange = key;
       break;*/
     case 'g':
       ballChange = key;
       break;
     case 'b':
       ballChange = key;
       break;
     /*case 'y':
       ballChange = key;
       break;
     case 'p':
       ballChange = key;
       break;
     case 'a':
       ballChange = key;
       break;*/
      case 'c':
        setOrigins();
        break;
      case 'u':
        setPitchMax();
        break;
      case 'd':
        setPitchMin();
        break;
      case 'l':
        setYawMin();
        break;
      case 'r':
        setYawMax();
        break;
   }
  
}

void captureEvent(Capture video) {
  // Read image from the camera
  video.read();
}
