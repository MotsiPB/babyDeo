import { Emitter } from "./emitter";
import { GlobalStore } from "./global-store.model";

// Singleton en aplicación contenedora.
const _globalState = {
  timeZone: "Local",
  blurLevel: 8,
  grayscale: false,
};

const _emitter = new Emitter();

export const globalStore: GlobalStore = {
  subscribe: (callback, context) => {
    _emitter.on("change", callback, context);
  },
  unsubscribe: callback => {
    _emitter.off("change", callback);
  },
  get: prop => _globalState[prop],
  getAll: () => _globalState,
  set: (prop, value) => {
    console.log("[GlobalStore] SET", prop, value);
    _globalState[prop] = value;
    _emitter.emit("change", _globalState);
  },
  setAll: value => {
    console.log("[GlobalStore] SET ALL", value);
    Object.assign(_globalState, value);
    _emitter.emit("change", _globalState);
  },
};

/**
 * Implementación sin emitter
 */

/*
let _subscribers = [];
const _informSubscribers = () => {
  _subscribers.forEach(callback => callback?.call(callback["context"], _globalState));
};

export const globalStore: GlobalStore = {
  subscribe: (callback, context) => {
    callback["context"] = context;
    if (_subscribers.indexOf(callback) < 0) _subscribers = [..._subscribers, callback];
    console.log("[GlobalStore] SUBSCRIBE", _subscribers);
  },
  unsubscribe: callback => {
    _subscribers = _subscribers.filter(fn => fn !== callback);
    console.log("[GlobalStore] UNSUBSCRIBE", _subscribers);
  },
  get: prop => _globalState[prop],
  getAll: () => _globalState,
  set: (prop, value) => {
    console.log("[GlobalStore] SET", prop, value);
    _globalState[prop] = value;
    _informSubscribers();
  },
  setAll: value => {
    console.log("[GlobalStore] SET", value);
    Object.assign(_globalState, value);
    _informSubscribers();
  },
};
*/
