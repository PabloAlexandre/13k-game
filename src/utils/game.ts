import { get } from './ioc';
import { subscribe } from './helpers';

export const canvas = defaultDecorator('canvas');
export const context = defaultDecorator('context');

export const loop = (target, propertyKey, descriptor) => {
  subscribe((...args) => { 
    console.log(target.isPlaying);
    descriptor.value.apply(target, args);
  });
}

function defaultDecorator(property) {
  return function(target, propertyKey) {
    target[propertyKey] = get(property);
  }
}

type AnimData = {
  [name: string]: {
    framerate: number
    frames: Array<number>
  }
}

export type SpriteMetadata = {
  image: HTMLImageElement
  imageSize: Vector2
  spriteSize: Vector2
  anim: AnimData
}

export const loadSprite = (path: string, w: number, h: number, animData: AnimData = {}): any => {
  return function(target, propertyKey, d): void{
    const img = new Image();
    img.src = path;

    Object.defineProperty(target, propertyKey, {
      get: (): SpriteMetadata => {

        return {
          image: img,
          spriteSize: {
            x: w,
            y: h
          },
          imageSize: {
            x: img.width,
            y: img.height
          },
          anim: animData
        }
      }
    })
  }
}

export type Vector2 = {
  x: number
  y: number
}

export const halfScreen = (): Vector2 => {
  const canvas: HTMLCanvasElement = get('canvas');
  
  return {
    x: canvas.width / 2,
    y: canvas.height / 2
  }
}