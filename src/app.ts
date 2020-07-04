import { getEvents, register, loadScene } from './framework';
import './scenes';

const canvas = <HTMLCanvasElement> document.getElementById("game"); 
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

register('canvas', canvas);
register('context', ctx);

loadScene("Menu");

let lastUpdate;
function draw() {
  var t = new Date().getTime();
  var delta = t - lastUpdate;

  ctx.clearRect(0,0, canvas.width, canvas.height);

  ctx.fillStyle = '#00B9FC';
  ctx.fillRect(0,0, canvas.width, canvas.height);

  getEvents('update').forEach((it: Function) => it(delta / 1000));
  getEvents('draw').forEach((it: Function) => it(delta / 1000));

  lastUpdate = new Date().getTime();
  requestAnimationFrame(draw);
}

lastUpdate = new Date().getTime();
draw();
