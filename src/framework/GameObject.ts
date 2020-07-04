import { Component } from "./Component";
import { Vector2 } from "./Types";
import { Renderer } from "./Renderer";

export class GameObject {
  position: Vector2
  scale: Vector2
  name: string;
  components: Array<Component> = [];
  renderer: Renderer;

  constructor(name: string = '') {
    this.position = { x: 0, y: 0 }
    this.scale = { x: 1, y: 1 }
    this.name = name;
  }

  addComponent<T extends Component>(component: T): T {
    component.gameObject = this;

    if(component instanceof Renderer) {
      this.renderer = component;
    }

    this.components.push(component);
    return component;
  }

  getComponent<T extends Component>(x: T): Component {
    return this.components.find(it => it.constructor.name === x.name);
  }
}