class Common {
  static uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  }

  static ShowTimePlayed(time) {
    push();
    textSize(16);
    fill(127);
    textStyle(BOLD);
    stroke(255);
    strokeWeight(2);
    var txt = Common.zeroPad(time.toFixed(0), 5);
    translate(width - textWidth(txt) - textSize() / 2, textSize());
    text(txt, 0, 0);
    pop();
  }

  static ShowHighScore(time) {
    push();
    textSize(16);
    fill(255);
    textStyle(BOLD);
    stroke(127);
    strokeWeight(2);
    var txt = Common.zeroPad(time.toFixed(0), 5);
    translate(width - textWidth(txt) * 2 - textSize(), textSize());
    text(txt, 0, 0);
    pop();
  }

  static ShowPressPlay(t, position, alpha) {
    push();
    let a = map(sin(alpha), -1, 1, 255, 0);
    translate(position.x || width / 2, position.y || height / 2);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(16);
    fill(255, a);
    stroke(127, a);
    strokeWeight(2);
    text(t, 0, 0);
    pop();
  }

  static digits(n) {
    return n.toString().length;
  }

  static zeroPad(num, place) {
    return String(num).padStart(place, "0");
  }
}
