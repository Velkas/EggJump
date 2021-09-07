class State {
  constructor() {
    this.name;
    this.update = function () {};
    this.render = function () {};
    this.onEnter = function () {};
    this.onExit = function () {};

    // might not need
    this.onPause = function () {};
    this.onResume = function () {};
  }
}

class StateList {
  constructor() {
    this.states = [];
  }

  pop() {
    return this.states.pop();
  }

  push(state) {
    this.states.push(state);
  }

  top() {
    return this.states[this.states.length - 1];
  }
}

class StateStack {
  constructor() {
    this.states = new StateList();
    this.states.push(new EmptyState());
  }

  update() {
    var state = this.states.top();
    if (state) {
      state.update();
    }
  }

  render() {
    var state = this.states.top();
    if (state) {
      state.render();
    }
  }

  touchDown(event) {
    var state = this.states.top();
    if (state && state.touchDown) {
      state.touchDown(event);
    }
  }

  touchUp(event) {
    var state = this.states.top();
    if (state && state.touchUp) {
      state.touchUp(event);
    }
  }

  keyPressed(key) {
    var state = this.states.top();
    if (state && state.keyPressed) {
      state.keyPressed(key);
    }
  }

  push(state) {
    Debug.Log(`Entering state: ${state.name}`);
    this.states.push(state);
    state.onEnter();
  }

  pop() {
    var state = this.states.pop();
    Debug.Log(`Exiting state: ${state.name}`);
    state.onExit();
    return state;
  }

  pause() {
    var state = this.states.top();
    if (state.onPause) {
      Debug.Log(`${state.name} PAUSED`);
      state.onPause();
    }
  }

  resume() {
    var state = this.states.top();
    if (state.onResume) {
      Debug.Log(`${state.name} RESUMED`);
      state.onResume();
    }
  }
}
