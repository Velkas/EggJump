class Platform {
  constructor(x, y, index, sprite) {
    this.pos = createVector(x, y);
    this.sprite = sprite || platformSprite;
    this.size = createVector(this.sprite.width, this.sprite.height);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 2);

    this.hasCoin = index == 0 ? false : this.getRandomCoinChance(4);
    this.coinSize = 25;
    this.value = round(random(0, 2));
  }

  update() {
    this.pos.y += 0.8;

    if (this.pos.y > height) {
      this.pos.x = random(platformSprite.width / 2 + 20, width - platformSprite.width / 2 - 20);
      this.pos.y = -100;
      this.hasCoin = this.getRandomCoinChance(2);
      this.value = round(random(0, 2));
    }
  }

  render() {
    // platform
    image(this.sprite, this.pos.x, this.pos.y);

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
