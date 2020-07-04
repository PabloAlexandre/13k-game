import { Player } from './player';
import { Scene } from '../../framework/SceneManager';

@Scene("Menu")
export class Menu {
  constructor() {
    new Player();
  }
}