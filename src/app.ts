import { register } from './utils/ioc';
import { values } from './utils/helpers';

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

  scene.update(delta / 1000);
  values().forEach((it: Function) => it(delta / 1000));

  scene.render();

  lastUpdate = new Date().getTime();
  requestAnimationFrame(draw);
}

lastUpdate = new Date().getTime();
draw();
