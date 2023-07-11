export default class EventManager {
  private listeners: Map<string, ((payload: any) => void)[]>;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, listener: (payload: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(listener);
  }

  emit(event: string, payload: any): void {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event)?.forEach((listener) => {
      listener(payload);
    });
  }

  removeListener(event: string, listenerToRemove: (payload: any) => void): void {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      return;
    }

    const filteredListeners = listeners.filter(
      (listener) => listener !== listenerToRemove,
    );

    this.listeners.set(event, filteredListeners);
  }
}
