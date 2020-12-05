export interface GlobalState {
  timeZone: string;
  blurLevel: number;
  grayscale: boolean;
}

export interface GlobalStore<State extends object = GlobalState> {
  subscribe: (callback: (state?: State) => void, context?: any) => void;
  unsubscribe: (callback: (state?: State) => void) => void;
  get: <K extends keyof State>(prop: K) => State[K];
  getAll: () => State;
  set: <K extends keyof State>(prop: K, value: State[K]) => void;
  setAll: (value: State) => void;
}
