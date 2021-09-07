class GameManager {
  constructor(s) {
    this.state = new StateStack();
    this.highScore = 0;

    if (s != null) {
      randomSeed(s);
    }
  }

  update() {
    this.state.update();
  }

  render() {
    this.state.render();
  }

  touchDown(event) {
    this.state.touchDown(event);
  }

  touchUp(event) {
    this.state.touchUp(event);
  }

  keyPressed(key) {
    this.state.keyPressed(key);
  }
}
