const sceneMap: Map<string, any> = new Map();
export function Scene(name) {
  return function(target) {
    if(sceneMap.has(name)) return sceneMap.get(name);

    sceneMap.set(name, target);
    return target;
  }
}

export function loadScene(name) {
  const scene = sceneMap.get(name);
  return new scene();
}