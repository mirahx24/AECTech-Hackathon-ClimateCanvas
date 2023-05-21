let handposeModel; // Handpose model
let video; // Webcam video capture
let numHands = 0; // Number of hands raised
let timer; // Timer variable

function setup() {
  // Create a canvas that fills the entire window
  createCanvas(windowWidth, windowHeight);
  
  // Set up the camera for hand detection
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  
  // Load the handpose model
  handpose.load().then(model => {
    handposeModel = model;
    console.log('Handpose model loaded!');
    detectHands();
  });

  // Start the timer
  timer = setTimeout(redirectToGridPage, 180000); // 3 minutes = 180000 milliseconds
}

function redirectToGridPage() {
  // Redirect to the grid page
  window.location.href = 'grid.html';
}

function detectHands() {
  // Detect hands in the video frame
  handposeModel.estimateHands(video.elt).then(results => {
    if (results.length > 0) {
      numHands = results.length;
    } else {
      numHands = 0;
    }
    detectHands(); // Continuously detect hands
  });
}

function draw() {
  // Clear the canvas
  clear();
  
  // Customize the image based on the number of hands raised
  if (numHands === 0) {
    // Display the default image when no hands are raised
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Raise your hands!', width / 2, height / 2);
  } else if (numHands === 1) {
    // Display an image when one hand is raised
    background(255);
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Image 1', width / 2, height / 2);
  } else if (numHands === 2) {
    // Display a different image when two hands are raised
    background(200);
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Image 2', width / 2, height / 2);
  } else {
    // Display a different image when more than two hands are raised
    background(150);
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Image 3', width / 2, height / 2);
  }
}

function windowResized() {
  // Resize the canvas when the window size changes
  resizeCanvas(windowWidth, windowHeight);
}
