export class Emitter {
  private eventMap: { [P: string]: Array<any> };

  constructor() {
    this.eventMap = {};
  }

  emit(event: string, ...args) {
    if (!event || !this.eventMap[event]) return this;
    for (const fn of this.eventMap[event]) {
      fn.apply(fn.ctx, [...args]);
      if (fn.off_event === true) this.off(event, fn);
    }
    return this;
  }

  on(event: string, fn: any, ctx: any) {
    if (!event) return this;
    if (!this.eventMap[event]) this.eventMap[event] = [];
    fn.ctx = ctx;
    this.eventMap[event] = [...this.eventMap[event], fn];
    return this;
  }

  once(event: string, fn: any, ctx: any) {
    if (!event) return this;
    fn.ctx = ctx;
    fn.off_event = true;
    return this.on(event, fn, ctx);
  }

  off(event: string, fn: any) {
    if (!event || !this.eventMap[event]) return this;
    const fnList = this.eventMap[event];
    if (!fn) {
      delete this.eventMap[event];
      return this;
    }
    this.eventMap[event] = fnList.filter(f => f !== fn);
    return this;
  }
}
