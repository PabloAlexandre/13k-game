import { register } from './framework/IoC';
import { getEvents } from './framework';
const canvas = <HTMLCanvasElement> document.getElementById("game"); 
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

register('canvas', canvas);
register('context', ctx);

const { loadScene } = require('./scenes');
const scene = loadScene("Menu");

let lastUpdate;
function draw() {
  var t = new Date().getTime();
  var delta = t - lastUpdate;

  ctx.clearRect(0,0, canvas.width, canvas.height);

  getEvents('update').forEach((it: Function) => it(delta / 1000));
  getEvents('draw').forEach((it: Function) => it(delta / 1000));

  lastUpdate = new Date().getTime();
  requestAnimationFrame(draw);
}

lastUpdate = new Date().getTime();
draw();
