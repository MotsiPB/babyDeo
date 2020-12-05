import React from "react";
import { css, globalStore } from "../../core";
import { GlobalState } from "../../core/global-store/global-store.model";

const styles = {
  container: css`
    margin: 2rem 1rem;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 2rem;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-size: 0.75rem;
  `,
};

export const Footer: React.FC = () => {
  const [config, setConfig] = React.useState(() => globalStore.getAll());

  React.useEffect(() => {
    const callback = (currentGlobalState: GlobalState) => setConfig({ ...currentGlobalState });
    globalStore.subscribe(callback, this);
    return () => globalStore.unsubscribe(callback);
  }, []);

  return (
    <div className={styles.container}>
      {Object.entries(config).map(([key, value]) => (
        <p key={key}>
          <b>{key}</b> = {value?.toString?.() ?? value}
        </p>
      ))}
    </div>
  );
};
