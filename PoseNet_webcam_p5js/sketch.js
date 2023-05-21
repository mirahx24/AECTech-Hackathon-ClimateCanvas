// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
var confi = 0.2;
let hands;

let timer = 5000;
let nextChange = timer;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select("#status").html("Model Loaded");
}

function draw() {
  image(video, 0, 0, width, height);
  textSize(24);

  // We can call both functions to draw all keypoints and the skeletons
  
  //-------
  drawKeypoints(); // this works w multiple ppl
  // drawSkeleton();
  
//   startTimer(20, drawKeypoints);
  // Count amount of hands-up
  // hands = counthandsup();
  // console.log('# of hands ',hands);

  // console.log(counthandsup());
  
  // // scheduling events with millis()
  // if (millis() > nextChange){
  //   hands = drawKeypoints();
  //   nextChange = millis() + timer;
  //   console.log('# of hands ',hands);
  // }

  // text(`${hands} hands are up`, 20, height/4);
  // text(`${round(millis()/1000)} seconds have gone by!`, 20, height/2);
  
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  handsup = 0;
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i += 1) {
    // For each pose detected, loop through all the keypoints
    const pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j += 1) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      const keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
    
    if ((pose.leftElbow.y > pose.leftWrist.y) && (pose.leftElbow.confidence > confi) && (pose.leftWrist.confidence > confi)) {
        // console.log('raised hand');
        handsup++;
        // console.log('handsup');
    }

    if ((pose.rightElbow.y > pose.rightWrist.y) && (pose.rightElbow.confidence > confi) && (pose.rightWrist.confidence > confi)) {
      // console.log('raised hand');
      handsup++;
      // console.log('handsup');
    }
  console.log('number of people ',poses.length);
  console.log(handsup);
  return handsup;
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i += 1) {
    const skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j += 1) {
      const partA = skeleton[j][0];
      const partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

// A function to count amount of hands-up
function counthandsup(){
  handsup = 0;
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i += 1) {
    const pose = poses[i].pose;
    if ((pose.leftElbow.y > pose.leftWrist.y) && (pose.leftElbow.confidence > confi) && (pose.leftWrist.confidence > confi)) {
        // console.log('raised hand');
        handsup++;
        // console.log('handsup');
    }
    if ((pose.rightElbow.y > pose.rightWrist.y) && (pose.rightElbow.confidence > confi) && (pose.rightWrist.confidence > confi)) {
      // console.log('raised hand');
      handsup++;
      // console.log('handsup');
  }
  return handsup;
}
}
