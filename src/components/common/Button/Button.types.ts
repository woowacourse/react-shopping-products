import { ComponentProps } from "react";

export type ButtonProps = {
  children: React.ReactNode;
  color: "light" | "dark";
} & ComponentProps<"button">;
