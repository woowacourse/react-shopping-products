import { ComponentProps } from "react";

export interface ButtonProps extends ComponentProps<"button"> {
  children: React.ReactNode;
  color: "light" | "dark";
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
