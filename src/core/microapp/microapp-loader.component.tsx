import React from "react";
import { sharedHistory } from "../history";
import { globalStore } from "../global-store";
import { MicroappInterface } from "./microapp.model";
import { microappRegistry, RegisteredMicroapps, MicroappLoadSettings } from "./microapp.registry";

// Cache
const microappInterfacesCache: Partial<Record<RegisteredMicroapps, MicroappInterface>> = {};
const isMicroappLoaded = (microapp: RegisteredMicroapps) =>
  microappInterfacesCache.hasOwnProperty(microapp);
const renderMicroapp = (microapp: RegisteredMicroapps, container: HTMLElement) =>
  microappInterfacesCache[microapp]?.render(container, {
    history: sharedHistory,
    baseName: microappRegistry[microapp].baseName,
    globalStore,
  });

// Business
const appendScript = (settings: MicroappLoadSettings, onLoad: () => void) => {
  const script = document.createElement("script");
  script.src = settings.bundleUrl;
  script.type = "text/javascript";
  script.onload = onLoad;
  script.onerror = () => script.remove();
  document.body.appendChild(script);
};

// Componente Microapp Loader
export interface MicroappLoaderProps {
  microapp: RegisteredMicroapps;
}

export const MicroappLoader: React.FC<MicroappLoaderProps> = ({ microapp }) => {
  const containerRef = React.useRef();

  React.useEffect(() => {
    if (isMicroappLoaded(microapp)) {
      renderMicroapp(microapp, containerRef.current);
    } else {
      const settings = microappRegistry[microapp];
      appendScript(settings, () => {
        microappInterfacesCache[microapp] = window[settings.exportName]?.MicroappInterface;
        renderMicroapp(microapp, containerRef.current);
      });
    }

    return () => microappInterfacesCache[microapp]?.unmount(containerRef.current);
  }, [microapp]);

  return <div ref={containerRef} />;
};
