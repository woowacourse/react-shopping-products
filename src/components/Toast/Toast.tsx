import React from "react";
import { ToastLayout } from "./Toast.style";

interface ToastProps {
  children: React.ReactNode;
}

export default function Toast({ children }: ToastProps) {
  return <div css={ToastLayout}>{children}</div>;
}
