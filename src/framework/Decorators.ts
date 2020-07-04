import { addEvent } from './Events';
import { get } from './IoC';

export const onDraw = <T>(target, propertyKey: keyof T, descriptor: PropertyDescriptor) => {
  const fn = descriptor.value;
  let hasSetted = false;

  return {
    configurable: true,
    get() {
      const newFn = fn.bind(this);

      if(!hasSetted) {
        addEvent(() => {
          newFn(get('context'), get('canvas'));
        }, 'draw');
      }
      
      hasSetted = true;

      return newFn;
    },
    set() {

    }
  }
}

export const onUpdate = <T>(target: T, propertyKey: keyof T, descriptor: PropertyDescriptor) => {
  addEvent(descriptor.value, 'update');
}