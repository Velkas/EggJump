class Title {
  constructor() {
    this.name = "Title";
    this.titleText = "EGGjUMP";
    this.titlePos = createVector(width / 2, height / 4);
    this.titleSize = 48;
    this.instructions = "Click and drag to aim and set power.\nDon't let the egg fall in the lava!";
    this.instructionPos = createVector(width / 2, height - height / 3);
    this.instructionSize = 16;
    this.copyright = `© * ${new Date().getFullYear()}`;
    this.copyrightPos = createVector(width - textSize(this.copyright), height - 12);
    this.clickText = "Press ENTER or tap to play...";
    this.clickAlpha = 255;
    this.clickTextPos = createVector(width / 2, height / 2);
  }

  onEnter() {}

  onExit() {
    gameManager.state.push(new Game());
  }

  update() {
    this.clickAlpha > 255 ? (this.clickAlpha = 0) : (this.clickAlpha += 0.1);
  }

  render() {
    image(bg, width / 2, height / 2, width, height);

    fill(255);
    stroke(45);
    textAlign(CENTER, CENTER);

    // TITLE
    textFont(gameFont);
    textStyle(BOLD);
    strokeWeight(6);
    textSize(this.titleSize);
    text(this.titleText, this.titlePos.x, this.titlePos.y);
    // INSTRUCTIONS
    textStyle(NORMAL);
    strokeWeight(4);
    textSize(this.instructionSize);
    text(this.instructions, this.instructionPos.x, this.instructionPos.y);
    // HS
    if (gameManager.highScore > 0) {
      strokeWeight(4);
      textSize(18);
      let txt = `Hi-Score: ${gameManager.highScore}`;
      text(txt, textWidth(txt) / 2 + 10, textSize() / 2);
    }
    // COPYRIGHT
    textFont("Helvetica");
    strokeWeight(2);
    textSize(this.copyrightSize);
    textAlign(RIGHT, CENTER);
    text(this.copyright, this.copyrightPos.x, this.copyrightPos.y);

    Common.ShowPressPlay(this.clickText, this.clickTextPos, this.clickAlpha);
  }

  touchDown(event) {
    gameManager.state.pop();
  }

  keyPressed(key) {
    if (key == ENTER) {
      gameManager.state.pop();
    }
  }
}
