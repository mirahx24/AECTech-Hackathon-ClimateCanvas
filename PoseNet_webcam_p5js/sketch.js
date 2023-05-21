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

  // We can call both functions to draw all keypoints and the skeletons
  
  drawKeypoints();
  drawSkeleton();
  
//   startTimer(20, drawKeypoints);
  // Count amount of hands-up
//   counthandsup();
}

// A function to count amount of hands-up
function counthandsup(){
    handdown = true;
    const pose = poses[0].pose;
    if (((pose.leftElbow.y > pose.leftWrist.y) && (pose.leftElbow.confidence > 0.2)) && (pose.leftWrist.confidence > 0.2)) {
        console.log('raised hand');
    }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
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
    
    // console.log("elbow ",pose.leftElbow.y," confidence ", pose.leftElbow.confidence);
    // console.log("wrist ",pose.leftWrist.y);
    // 
    // handdown = true;
    // handsup = 0;
    if ((pose.leftElbow.y > pose.leftWrist.y) && (pose.leftElbow.confidence > 0.2) && (pose.leftWrist.confidence > 0.2)) {
        // console.log('raised hand');
        // handsup++;
        console.log('handsup');
    }
    
/*
    if (time % 20 == 0){

        if (((pose.leftElbow.y > pose.leftWrist.y) && (pose.leftElbow.confidence > 0.2)) && (pose.leftWrist.confidence > 0.2)) {
            // console.log('raised hand');
            handsup++;
            console.log(handsup);
            // handdown = false;
        }
    // if (((pose.leftElbow.y > pose.leftWrist.y) && (pose.leftElbow.confidence > 0.2)) && (pose.leftWrist.confidence > 0.2) &&(handdown = true)) {
    //     // console.log('raised hand');
    //     handsup++;
    //     console.log(handsup);
    //     handdown = false;
    // }
    // else {
    //     handdown = true;
    //     console.log('handdown');
    // }
    }
  */  
    // console.log("left eye", pose.leftEye.y)
    // console.log("left shoulder", pose.leftShoulder.y)
    //if pose.left
  }
}

function raisedHand(){
    if ((pose.leftElbow.y > pose.leftWrist.y) && (pose.leftElbow.confidence > 0.2) && (pose.leftWrist.confidence > 0.2)) {
        return true;
    }
    else return false;
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

// function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
    
//     var intervalId = setInterval(function() {
//       minutes = parseInt(timer / 60, 10);
//       seconds = parseInt(timer % 60, 10);
      
//       minutes = minutes < 10 ? "0" + minutes : minutes;
//       seconds = seconds < 10 ? "0" + seconds : seconds;
      
//       display.textContent = minutes + ":" + seconds;
      
//     //   if (--timer < 0) {
//     //     clearInterval(intervalId);
//     //     // You can perform any action here when the timer reaches zero
//     //     alert("Timer completed!");
//     //   }
//     }, 1000);
//   }