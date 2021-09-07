class Debug {
  static Log(msg) {
    if (debug) {
      print(msg);
    }
  }

  static ShowFPS() {
    if (debug) {
      push();
      textSize(12);
      fill(255);
      stroke(0);
      strokeWeight(2);
      let txt = `fps: ${frameRate().toFixed(0)}`;
      translate(width - textWidth(txt), 12);
      text(txt, 0, 0);
      pop();
    }
  }
}
