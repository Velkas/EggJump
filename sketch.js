let bg;
let egg;
let offscreenIndicator;
let platformSprite;
let gameFont;
let gravity;
let tokenValues = [];
let gameManager;

let debug = true;

// setup
function preload() {
  bg = loadImage("/assets/background.png");
  gameFont = loadFont("/assets/Scrambled_Eggs_Bold.ttf");
  offscreenIndicator = loadImage("/assets/offscreen_indicator.png");
  platformSprite = loadImage("/assets/platform.png");
  egg = loadImage("/assets/egg.png");
}

function setup() {
  document.oncontextmenu = function () {
    return false;
  };

  createCanvas(680, 540);
  frameRate(60);
  textFont(gameFont);
  imageMode(CENTER);

  gravity = createVector(0, 0.8);
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
  gameManager.keyPressed(keyCode);
}
