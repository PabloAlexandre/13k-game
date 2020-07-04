export enum KeyCode {
  W='KeyA',
  A='KeyA',
  S='KeyS',
  D='KeyD',
  Space='Space',
  ArrowLeft='ArrowLeft',
  ArrowRight='ArrowRight',
  ArrowUp='ArrowUp',
  ArrowDown='ArrowDown'
}

class InputManager {
  pressedCombinations = [];
  cacheKeyDown = [];
  cacheKeyUp = [];

  constructor() {
    this.keyup = this.keyup.bind(this);
    this.keydown = this.keydown.bind(this);

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  private keydown(e: KeyboardEvent) {
    this.pressedCombinations.push(e.code);
  }

  private keyup(e: KeyboardEvent) {
    this.pressedCombinations = this.pressedCombinations.filter(code => code !== e.code);
    this.cacheKeyDown = this.cacheKeyDown.filter(code => code !== e.code);
    this.cacheKeyUp.push(e.code);

    requestAnimationFrame(() => {
      this.cacheKeyUp = [];      
    });
  }

  onKeyDown(key: KeyCode) {
    if(!this.cacheKeyDown.includes(key) && this.onKey(key)) {
      this.cacheKeyDown.push(key);
      return true;
    }

    return false;
  }

  onKeyUp(key: KeyCode) {
    return this.cacheKeyUp.includes(key);
  }

  onKey(key: KeyCode) {
    return this.pressedCombinations.includes(key);
  }

  axisRaw(axis: 'horizontal' | 'vertical') {
    switch(axis){
      case 'horizontal':
        if(this.onKey(KeyCode.A) || this.onKey(KeyCode.ArrowLeft)) return -1;
        if(this.onKey(KeyCode.D) || this.onKey(KeyCode.ArrowRight)) return 1;
      default:
        return 0;
    }
  }
}

export const Input: InputManager = new InputManager();