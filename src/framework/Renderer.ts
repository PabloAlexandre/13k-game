import { Component } from "./Component";
import { GameObject } from './GameObject';
import { onDraw } from './Decorators';
import { Rect, Vector2 } from "./Types";

export class Renderer extends Component {
  image: HTMLImageElement;
  uv: Rect;
  flip: boolean;

  constructor(image: HTMLImageElement, uv: Rect) {
    super();
    this.image = image;
    this.uv = uv;

    this.render(null, null);
  }

  @onDraw
  render(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    if(this.gameObject && this.image) {
      const { flip, image, uv, gameObject: { position, scale } } = this;
      context.save();
      context.translate(position.x + 30, position.y);
      context.scale(flip ? -1 : 1, 1);

      const pos: Vector2 = {
        x: -(scale.x * uv.w) / 2, 
        y: -(scale.y * uv.h) / 2 
      }

      context.drawImage(image, uv.x, uv.y, uv.w, uv.h, pos.x, pos.y, scale.x * uv.w, scale.y * uv.h);

      if(this.gizmos) {
        context.strokeStyle = 'green';
        context.strokeRect(pos.x, pos.y, scale.x * uv.w, scale.y * uv.h);
      }

      context.restore();
    }
  }
}