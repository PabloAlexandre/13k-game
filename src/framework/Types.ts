export type Vector2 = {
  x: number
  y: number
}

export class Rect {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(x: number = 0, y: number = 0, w: number, h: number){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  setCoordinates(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}