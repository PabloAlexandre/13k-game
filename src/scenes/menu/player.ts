import sprite from './sprite.png';

import { GameObject, halfScreen, SpriteMetadata, loadSprite, Renderer, Rect, createAnimation, Animator, onUpdate, Input } from "../../framework";

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
  speed: number = 2;
  anim: Animator;

  constructor() {
    super();

    this.position = {x: halfScreen().x, y: 350 };
    this.scale = { x: 0.95, y: 0.95 };
    this.sprite.onLoad(this.start.bind(this));

    //TODO: Without get this.update, update cycle don't run. Fix this
    this.update 
  }

  start() {
    this.addComponent(new Renderer(this.sprite.image, new Rect(0, 0, this.sprite.spriteSize.x, this.sprite.spriteSize.y)));
    
    this.anim = this.addComponent(createAnimation(this.sprite));
    this.anim.play('run');
  }

  @onUpdate
  update(){
    const direction: number = Input.axisRaw('horizontal');

    if(direction != 0) {
      if(this.renderer.flip && direction > 0) this.renderer.flip = false;
      if(!this.renderer.flip && direction < 0) this.renderer.flip = true;

      if(this.anim && !this.anim.IsPlaying("run")) {
        this.anim.play("run");
      }

      this.position.x += this.speed * direction;
    } else if(this.anim && !this.anim.IsPlaying("idle")) {
      this.anim.play("idle");
    }
  }
}