class Platform {
  constructor(x, y, index) {
    this.pos = createVector(x, y);
    this.size = createVector(100, 32);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 2);

    this.hasCoin = index == 0 ? false : this.getRandomCoinChance(4);
    this.coinSize = 25;
    this.value = round(random(0, 2));
  }

  update() {
    this.pos.y += gravity.y;

    if (this.pos.y > height) {
      this.size.x = random(100, 125);
      this.pos.x = random(this.size.x / 2 + 20, width - this.size.x / 2 - 20);
      this.pos.y = -100;
      this.hasCoin = this.getRandomCoinChance(2);
      this.value = round(random(0, 2));
    }
  }

  render() {
    // platform
    fill(143, 86, 59, 255);
    stroke(0);
    strokeWeight(4);
    rect(this.pos.x - this.size.x / 2, this.pos.y - this.size.y / 2, this.size.x, this.size.y, 0, 0, 5, 5);

    // coin
    if (this.hasCoin) {
      fill(tokenValues[this.value]);
      stroke(0);
      strokeWeight(4);
      ellipse(this.pos.x, this.pos.y - this.size.y / 2 - this.coinSize - 3, this.coinSize);
    }
  }

  getRandomCoinChance(chance) {
    return random() <= 1 / chance ? true : false;
  }
}
