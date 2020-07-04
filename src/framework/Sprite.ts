import { AnimData } from "./Animation";
import { Vector2 } from "./Types";

export type SpriteMetadata = {
  image: HTMLImageElement
  imageSize: Vector2
  spriteSize: Vector2
  anim: AnimData
  loaded: boolean
  onLoad: Function
}

export const loadSprite = (path: string, w: number, h: number, animData: AnimData = {}): any => {
  return <T>(target: T, propertyKey: keyof T, descriptor: PropertyDescriptor): void => {
    const img = new Image();
    img.src = path;

    let loaded = false;

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
          anim: animData,
          loaded,
          onLoad: fn => img.onload = fn
        }
      }
    })
  }
}