import React from "react";

export const jsx = (
  type: React.ElementType,
  props: Record<string, unknown>,
  ...children: React.ReactNode[]
) =>
  React.createElement(
    type,
    { ...props, className: "emotion-class" },
    ...children
  );

export const keyframes = (...args: string[]) => args.join("");
export const css = () => ({ name: "mock-css-result" });
