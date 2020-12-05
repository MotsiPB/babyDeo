import { routes } from "../routes";

// Registro de microapps disponibles con sus settings de carga.
export interface MicroappLoadSettings {
  bundleUrl: string;
  exportName: string;
  baseName: string;
}
export type RegisteredMicroapps = "clock" | "quote";

export const microappRegistry: Record<RegisteredMicroapps, MicroappLoadSettings> = {
  clock: {
    bundleUrl: "microapps/clock.js",
    exportName: "MicroappClock",
    baseName: routes.clock,
  },
  quote: {
    bundleUrl: "microapps/quote.js",
    exportName: "MicroappQuote",
    baseName: routes.quote,
  },
};
