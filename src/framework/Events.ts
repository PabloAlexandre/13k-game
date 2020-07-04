const eventMap: Map<string, Set<Function>> = new Map();

eventMap.set('update', new Set());
eventMap.set('draw', new Set());

export function addEvent(fn, type = 'update') {
  const events: Set<Function> = eventMap.get(type);
  events.add(fn);
}

export function getEvents(type: string = 'update'): Array<Function> {
  return Array.from(eventMap.get(type).values());
}