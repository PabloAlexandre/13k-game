import { Menu } from './menu';

export const loadScene = (sceneName) => {
  switch (sceneName) {
    case 'Menu':
      return new Menu();
    default:
      return null;
  }
}