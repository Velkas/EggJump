let bg;
let egg;
let barMask;
let barImage;
let barFrame;
let offscreenIndicator;
let gameFont;
let gravity;
let tokenValues = [];
let gameManager;

let debug = false;

// setup
function preload() {
  bg = loadImage("assets/background.png");
  gameFont = loadFont("assets/Scrambled_Eggs_Bold.ttf");
  offscreenIndicator = loadImage("assets/offscreen_indicator.png");
  egg = loadImage("assets/egg.png");
  barMask = loadImage("assets/powerBarMask.png");
  barFrame = loadImage("assets/powerBarFrame.png");
}

function setup() {
  document.oncontextmenu = function () {
    return false;
  };

  createCanvas(680, 540);
  frameRate(60);
  textFont(gameFont);
  imageMode(CENTER);

  barImage = createImage(barMask.width, barMask.height);
  barImage.loadPixels();
  for (let i = 0; i < barImage.width; i++) {
    for (let j = 0; j < barImage.height; j++) {
      barImage.set(i, j, color(255, 255, 255));
    }
  }
  barImage.updatePixels();
  barImage.mask(barMask);

  gravity = createVector(0, 0.981);
  tokenValues = [color(234, 138, 105), color(195, 199, 199), color(249, 188, 2)];

  gameManager = new GameManager();

  gameManager.state.push(new Title());
}

function draw() {
  gameManager.update();
  gameManager.render();

  Debug.ShowFPS();
}

function mousePressed(event) {
  gameManager.touchDown(event);
}

function mouseReleased(event) {
  gameManager.touchUp(event);
}

function keyPressed() {
  if (keyCode == 68) {
    debug = !debug;
  }

  gameManager.keyPressed(keyCode);
}
