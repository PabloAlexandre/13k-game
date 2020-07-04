import { SpriteMetadata, Vector2, loop } from './game';
import { subscribe } from './helpers';


type AnimationClip = {
  name: string
  frames: Array<Vector2>
  framerate: number;
}

export type Animation = {
  clip: AnimationClip
  clips: Array<AnimationClip>
  play: Function
}

class AnimController {
  frameCount = 0;
  currentFrame = 0;
  clip: AnimationClip = null;
  clips: Array<AnimationClip> = [];
  isPlaying = false;
  frame: Vector2

  constructor(clips: Array<AnimationClip>) {
    this.clips = clips;
    this.clip = clips[0];
    this.update = this.update.bind(this);
    this.play = this.play.bind(this);
  }

  update(delta) {

    if(this.isPlaying) {
      this.frameCount ++;

      if(this.frameCount > this.clip.framerate) {
        this.frameCount = 0;
        this.currentFrame++;

        if(this.currentFrame >= this.clip.frames.length) {
          this.currentFrame = 0;
        }
        this.frame = this.clip.frames[this.currentFrame];
      }
    } else {
      console.log('Not Playing', this.isPlaying);
    }
  }

  play(animName?: string) {
    
    //Replace for current clip
    this.clip = animName ? this.clips.find(it => it.name === animName) : this.clips[0];
    this.frameCount = 0;
    this.isPlaying = true;
    console.log(animName, this.clip)
  }
}

export function anim(metadata: SpriteMetadata): AnimController {
  const animationClips = Object.entries(metadata.anim).map(([key, value]) => {
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

  const controller = new AnimController(animationClips);
  subscribe(controller.update);
  return controller;
}