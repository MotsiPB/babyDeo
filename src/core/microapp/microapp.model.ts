import { History } from "history";

// Tipado común de la interfaz de Microapps.
export interface MicroappConfiguration {
  history: History;
  baseName: string;
  globalStore: object;
}
export type MicroappRenderFunction = (container: Element, config?: MicroappConfiguration) => void;
export type MicroappUnmountFunction = (container: Element) => boolean;

export interface MicroappInterface {
  render: MicroappRenderFunction;
  unmount: MicroappUnmountFunction;
}
