class Game {
  constructor() {
    this.name = "Game";
    this.score = 0;
    this.platforms = [];
    this.uiFade = 255;
    this.uiFadeMinMax = createVector(80, 245);
    this.uiFadeHit = false;

    this.mouseLastX;
    this.mouseLastY;
    this.clicked = false;

    this.lavaP = random(100);
    this.lavaP2 = random(100);
    this.lavaP3 = random(100);
    this.lavaH;
    this.lavaH2;
    this.lavaH3;

    // initial platforms
    for (let i = 0; i < 5; i++) {
      let nx = random(platformSprite.width / 2 + 20, width - platformSprite.width / 2 - 20);
      let ny = i * (height / 4);
      this.platforms.push(new Platform(nx, -ny, i));
    }

    // create player on first platform
    this.player = new Player(this.platforms[0].pos.x, this.platforms[0].pos.y - 50);
  }

  onEnter() {
    textFont(gameFont);
  }

  onExit() {
    gameManager.highScore = max(this.score, gameManager.highScore);
    gameManager.state.push(new Title());
  }

  update() {
    this.lavaH = map(sin(this.lavaP), -1, 1, height - 25, height - 75);
    this.lavaH2 = map(sin(this.lavaP2), -1, 1, height - 20, height - 65);
    this.lavaH3 = map(sin(this.lavaP3), -1, 1, height - 15, height - 55);
    this.lavaP += random(0.01, 0.011);
    this.lavaP2 += random(0.011, 0.012);
    this.lavaP3 += random(0.012, 0.013);

    this.uiFadeHit = false;
    for (let plat of this.platforms) {
      plat.update();

      this.checkPlatformCollision(plat);
    }

    // adjust UI alpha
    if (this.uiFadeHit) {
      this.uiFade > this.uiFadeMinMax.x ? (this.uiFade -= 8) : this.uiFadeMinMax.x;
    } else {
      this.uiFade < this.uiFadeMinMax.y ? (this.uiFade += 5) : this.uiFadeMinMax.y;
    }

    let deathLevel = min(min(this.lavaH, this.lavaH2), this.lavaH3);
    this.player.update(deathLevel) ? gameManager.state.pop() : null;
  }

  render() {
    image(bg, width / 2, height / 2, width, height);

    for (let plat of this.platforms) {
      plat.render();
    }

    this.player.render();
    this.drawTrajectory();

    this.drawLava();

    this.drawUI();
  }

  // input
  touchDown(event) {
    // cancel on right click
    if (this.clicked && event.which == 3) {
      this.clicked = false;
      return;
    }

    if (event.which == 1) {
      this.clicked = true;
      this.mouseLastX = mouseX;
      this.mouseLastY = mouseY;
    }
  }

  touchUp(event) {
    if (this.clicked && event.which == 1) {
      this.clicked = false;

      if (this.player.onPlatform) {
        this.player.pos.y -= this.player.size.y / 4;

        let newVel = createVector(mouseX, mouseY).sub(this.mouseLastX, this.mouseLastY);
        this.player.vel = newVel.mult(0.08);
        this.player.onPlatform = false;
      }

      this.mouseLastX = null;
      this.mouseLastY = null;
    }
  }

  drawUI() {
    // score bg
    fill(255, this.uiFade);
    stroke(47, this.uiFade);
    strokeWeight(6);
    rect(6, 6, textSize() * Common.digits(this.score) + 6, 50, 0, 0, 10, 10);
    // score text
    fill(0, this.uiFade);
    noStroke();
    textSize(32);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(this.score, (textSize() * Common.digits(this.score)) / 2 + 12, 12);
  }

  drawLava() {
    // draw lava
    strokeWeight(6);

    stroke(255, 85, 15);
    fill(225, 55, 9, 255);
    rect(-6, this.lavaH, width + 12, height + 6);

    stroke(255, 145, 30);
    fill(255, 163, 34, 200);
    rect(-6, this.lavaH2, width + 12, height + 6);

    stroke(255, 145, 30);
    fill(255, 160, 30, 150);
    rect(-6, this.lavaH3, width + 12, height + 6);
  }

  checkPlatformCollision(plat) {
    // check if player is on a platform
    // platform coords
    let platx1 = plat.pos.x - plat.size.x / 2;
    let platy1 = plat.pos.y - plat.size.y / 2;

    // player point coord
    let pointx = this.player.pos.x;
    let pointy = this.player.pos.y; //+ this.player.size / 2;
    // platform line coord
    let plx1 = plat.pos.x - plat.size.x / 2;
    let ply1 = plat.pos.y - plat.size.y / 2;
    let plx2 = plat.pos.x + plat.size.x / 2;
    // coin line coord
    let clx1 = plat.pos.x;
    let cly1 = plat.pos.y - plat.size.y / 2 - 3 - plat.coinSize;
    let cly2 = plat.pos.y - plat.size.y / 2;

    //let hit = this.collideRectRect(px1, py1, px2, py2, platx1, platy1, platx2, platy2);
    let hit = this.collidePointLine(pointx, pointy, plx1, ply1, plx2, ply1, 15);

    // check if player hit coin
    if (plat.hasCoin) {
      let hit = this.collidePointLine(pointx, pointy, clx1, cly1, clx1, cly2, 30);

      if (hit) {
        plat.hasCoin = false;
        this.score += plat.value + 1;
      }
    }

    // check if score overlaps
    if (platx1 <= textSize() * Common.digits(this.score) + 20 && platy1 < 100 && platy1 > -10) {
      this.uiFadeHit = true;
    }

    // update player info if hit
    if (hit && this.player.vel.y > 0) {
      this.player.onPlatform = true;
      this.player.pos.y = plat.pos.y - this.player.size.y;
      this.player.vel.x *= 0.5;
      this.player.vel.y = 0;
    }
  }

  drawTrajectory() {
    if (this.clicked && this.player.onPlatform) {
      // draw line from player to mouse

      let vel = createVector(
        mouseX + (this.player.pos.x - this.mouseLastX),
        mouseY + (this.player.pos.y - this.mouseLastY)
      )
        .sub(
          this.mouseLastX + (this.player.pos.x - this.mouseLastX),
          this.mouseLastY + (this.player.pos.y - this.mouseLastY)
        )
        .mult(0.8);

      stroke(255, 255, 0);
      strokeWeight(6);
      noFill();
      beginShape();
      let len = 50;
      for (let i = 0; i < len; i++) {
        let t = i / len;
        let x = vel.x * t;
        let y = vel.y * t - cos(-gravity.y * pow(t, 2)) / 2;
        vertex(x + this.player.pos.x, y + this.player.pos.y);
      }
      endShape();
    }
  }

  collidePointLine(px, py, x1, y1, x2, y2, buffer) {
    // get distance from the point to the two ends of the line
    var d1 = dist(px, py, x1, y1);
    var d2 = dist(px, py, x2, y2);

    // get the length of the line
    var lineLen = dist(x1, y1, x2, y2);

    // since floats are so minutely accurate, add a little buffer zone that will give collision
    if (buffer === undefined) {
      buffer = 0.1;
    } // higher # = less accurate

    // if the two distances are equal to the line's length, the point is on the line!
    // note we use the buffer here to give a range, rather than one #
    if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
      return true;
    }
    return false;
  }
}
