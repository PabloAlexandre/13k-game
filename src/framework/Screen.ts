import { Vector2 } from "./Types";
import { get } from './IoC'; 

export const halfScreen = (): Vector2 => {
  const canvas: HTMLCanvasElement = get('canvas');
  
  return {
    x: canvas.width / 2,
    y: canvas.height / 2
  }
}