import { GameObject } from "./GameObject";

export class Component {
  name: string;
  gameObject: GameObject;
  gizmos: boolean;
}