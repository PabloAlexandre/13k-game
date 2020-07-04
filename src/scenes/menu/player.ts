import sprite from './sprite.png';

import { GameObject, halfScreen, SpriteMetadata, loadSprite, Renderer, Rect, createAnimation, Animator, Autowired } from "../../framework";

export class Player extends GameObject {
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

  constructor() {
    super();

    this.position = halfScreen();
    this.scale = { x: 0.95, y: 0.95 };
    this.sprite.onLoad(this.init.bind(this));
  }

  init() {
    this.addComponent(new Renderer(this.sprite.image, new Rect(0, 0, this.sprite.spriteSize.x, this.sprite.spriteSize.y)));
    const anim: Animator = this.addComponent(createAnimation(this.sprite));
    anim.play('run');
  }
}