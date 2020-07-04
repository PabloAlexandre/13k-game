import { addEvent } from './Events';
import { Component } from './Component';
import { Vector2, Rect } from './Types';
import { SpriteMetadata } from './Sprite';

type AnimMetadata = {
  framerate: number
  frames: Array<number>
}
export type AnimData = {
  [name: string]: AnimMetadata
}

export type AnimationClip = {
  name: string
  frames: Array<Vector2>
  framerate: number;
}

export class Animator extends Component {
  frameCount = 0;
  currentFrame = 0;
  clip: AnimationClip = null;
  clips: Array<AnimationClip> = [];
  isPlaying = false;
  frame: Vector2

  constructor(metadata: SpriteMetadata) {
    super();
    
    const clips = Object.entries(metadata.anim).map(([key, value]: [string, AnimMetadata]) => {
      return {
        name: key,
        framerate: value.framerate,
        frames: new Array(value.frames[1] - value.frames[0]).fill('').map((_, i) => {
  
          let spritesPerRow = metadata.imageSize.x / metadata.spriteSize.x;
          let column = (i + value.frames[0]) % spritesPerRow;
          let row = Math.floor((value.frames[0] + i) / spritesPerRow);
  
          return {
            x: metadata.spriteSize.x * column,
            y: metadata.spriteSize.y * row,
          }
        })
      }
    });

    this.clips = clips;
    this.clip = clips[0];
    this.update = this.update.bind(this);
    this.play = this.play.bind(this);
  }

  update(delta) {
    if(this.isPlaying && this.gameObject.renderer) {
      this.frameCount ++;

      if(this.frameCount > this.clip.framerate) {
        this.frameCount = 0;
        this.currentFrame++;

        if(this.currentFrame >= this.clip.frames.length) {
          this.currentFrame = 0;
        }
        
        const frame = this.clip.frames[this.currentFrame];
        this.gameObject.renderer.uv.setCoordinates(frame.x, frame.y);
      }
    } 
  }

  play(animName?: string) {
    this.clip = animName ? this.clips.find(it => it.name === animName) : this.clips[0];
    this.frameCount = 0;
    this.isPlaying = true;
  }
}

export function createAnimation(metadata: SpriteMetadata): Animator {
  const controller = new Animator(metadata);
  addEvent(controller.update);
  return controller;
}