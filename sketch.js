// let capture;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   capture = createCapture(VIDEO);
//   capture.hide();
// }

// function draw() {
//   background(0);
//   image(capture, 0, 0, width, height);

//   // Add your interactive elements and effects here based on the camera feed
//   // For example, you can use image manipulation functions, apply filters, etc.
// }

// // Optional: Resize the canvas when the window size changes
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
// let video;
// let handRaised = false;
// let pointCloudData;

// function preload() {
//   // Load point cloud data (replace with your own)
//   pointCloudData = loadJSON('path/to/point_cloud_data.json');
// }

// function setup() {
//   // Create video capture
//   video = createCapture(VIDEO);
//   video.size(600, 400);
//   video.hide();

//   // Create canvas
//   const canvas = createCanvas(600, 400);
//   canvas.parent('canvas-container');

//   // Start detecting hand-raising
//   detectHandRaising();
// }

// function draw() {
//   background(0);
//   image(video, 0, 0, width, height);

//   // Display point cloud if hand is raised
//   if (handRaised) {
//     displayPointCloud();
//   }
// }

// function detectHandRaising() {
//   const handPose = ml5.handPose(video, modelReady);
//   handPose.on('predict', (results) => {
//     if (results && results[0] && results[0].handInViewConfidence > 0.7) {
//       const landmarks = results[0].landmarks;
//       const thumbTip = landmarks[4];
//       const indexTip = landmarks[8];
//       const distance = dist(thumbTip[0], thumbTip[1], indexTip[0], indexTip[1]);

//       // Check if hand is raised (distance between thumb and index finger is below a threshold)
//       if (distance < 50) {
//         handRaised = true;
//       } else {
//         handRaised = false;
//       }
//     }
//   });
// }

// function displayPointCloud() {
//   // Draw the point cloud based on the data
//   // Replace this with your own point cloud rendering logic
//   // You can access the point cloud data using the 'pointCloudData' variable

//   // Example code to display a single point cloud
//   const points = pointCloudData.points;
//   for (let i = 0; i < points.length; i++) {
//     const x = points[i].x;
//     const y = points[i].y;
//     const z = points[i].z;
    
//     // Map the x, y, z coordinates to the canvas size
//     const mappedX = map(x, -1, 1, 0, width);
//     const mappedY = map(y, -1, 1, 0, height);
    
//     // Draw a point at the mapped coordinates
let data; // Variable to store the weather data

function preload() {
  // Load the weather data CSV file
  data = loadTable('USA_CA_Bakersfield-Meadows.Field.723840_TMY3.csv', 'csv', 'header');
}

function setup() {
  // Create a canvas that fills the entire window
  createCanvas(windowWidth, windowHeight);
  
  // Set up the camera for hand detection
  const video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  
  // Start detecting hand-raising
  const handpose = ml5.handpose(video, modelReady);
  handpose.on('predict', gotPoses);
}

function modelReady() {
  console.log('Model loaded and ready!');
}

function gotPoses(poses) {
  // Iterate through all the detected poses
  for (let i = 0; i < poses.length; i++) {
    const pose = poses[i].pose;
    
    // Check if the hand is raised (you can customize this logic)
    if (pose.rightWrist.y < pose.rightElbow.y && pose.leftWrist.y < pose.leftElbow.y) {
      // Hand is raised, update the point cloud image
      updatePointCloudImage(pose);
    }
  }
}

function updatePointCloudImage(pose) {
  // Clear the canvas
  clear();
  
  // Draw the point cloud based on the weather data
  const numDataPoints = data.getRowCount();
  for (let i = 0; i < numDataPoints; i++) {
    const x = data.getNum(i, 'x');
    const y = data.getNum(i, 'y');
    
    // Customize the drawing based on the pose and weather data
    // For example, you can change the color or size of the points
    const r = map(x, 0, width, 0, 255);
    const g = map(y, 0, height, 0, 255);
    const b = 255;
    
    const size = 5;
    
    fill(r, g, b);
    noStroke();
    ellipse(x, y, size, size);
  }
}

function windowResized() {
  // Resize the canvas when the window size changes
  resizeCanvas(windowWidth, windowHeight);
}
