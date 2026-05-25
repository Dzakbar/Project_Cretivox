import type { ReactNode } from "react";

type SceneLayerProps = {
  children: ReactNode;
  className: string;
  label: string;
};

export function SceneLayer({ children, className, label }: SceneLayerProps) {
  return (
    <section aria-label={label} className={`story-scene ${className}`}>
      {children}
    </section>
  );
}
