const container = new Map();

export const register = (name: string, value: any) => {
  if (container.has(name)) return;

  container.set(name, value);
}

export function get(name: string): any {
  return container.get(name);
}
