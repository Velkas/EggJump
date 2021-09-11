class Player {
  constructor(x, y, sprite) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.sprite = sprite || egg;
    this.size = createVector(this.sprite.width, this.sprite.height);
    this.onPlatform = false;
    this.offScreenInd = false;
  }

  update(deathLevel) {
    this.vel.y += 0.8;

    if (this.pos.x - this.size.x / 2 < 0 || this.pos.x + this.size.x / 2 > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y > deathLevel) {
      return true;
    }

    this.offScreenInd = this.pos.y < this.size.y + 5;

    this.pos.add(this.vel);
  }

  render() {
    image(this.sprite, this.pos.x, this.pos.y);

    if (this.offScreenInd) {
      image(offscreenIndicator, this.pos.x, 0 + offscreenIndicator.width / 2);
    }
  }
}
