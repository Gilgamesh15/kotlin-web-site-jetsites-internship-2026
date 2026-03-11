import React from "react";

import "./index.scss";

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={"kto-layout-section" + " " + className}>
      {children}
    </section>
  );
}

export interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <div className="kto-layout-container">{children}</div>;
}
