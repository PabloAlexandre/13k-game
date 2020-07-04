import sprite from './sprite.png';

import { 
  context, 
  canvas, loadSprite, halfScreen, Vector2, SpriteMetadata 
} from '../../utils/game';
import { anim } from '../../utils/animation';

export class Menu {
  @context
  ctx: CanvasRenderingContext2D;

  @canvas
  canvas: HTMLCanvasElement;
  
  @loadSprite(sprite, 32, 32, { 
    run: {
      frames: [0, 6],
      framerate: 5
    }, 
    idle: {
      frames: [8, 14],
      framerate: 12
    }
  })
  sprite: SpriteMetadata;
  animation;

  constructor() {
    setTimeout(() => {
      this.animation = anim(this.sprite);
      this.animation.play('run');
    }, 100);
  }

  time = 0;
  render() {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const half: Vector2 = halfScreen();

    const size = 600;

    half.x = half.x / 2;
    half.y = 100;

    this.ctx.fillStyle = "white";
    this.ctx.font = "48px Verdana";
    this.ctx.fillText("GUNSLINGER", half.x, half.y, size);

    this.drawSprite();
  }

  update(delta) {
    // this.time += delta;
    // console.log(`Ùpdate ${this.time}s`)
  }

  drawSprite() {
    if(this.animation && this.animation.frame) {
      this.ctx.drawImage(this.sprite.image, this.animation.frame.x, this.animation.frame.y, this.sprite.spriteSize.x, this.sprite.spriteSize.y, 300, 300, 32, 32);
    }
  }
}