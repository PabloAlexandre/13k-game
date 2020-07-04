const updateContainer = new Set();

export function subscribe(fn) {
  updateContainer.add(fn);
}

export function unsubscribe(fn) {
  updateContainer.delete(fn);
}

export function values() {
  return Array.from(updateContainer.values());
}