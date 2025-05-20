import { css } from "@emotion/react";
import React from "react";

interface ToastProps {
  children: React.ReactNode;
}

const ToastLayout = css`
  position: absolute;
  bottom: -36px;
  left: 0;
  padding: 12px 77px;
  width: 100%;
  background-color: #ffc9c9;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  color: black;
  box-sizing: border-box;
`;

export default function Toast({ children }: ToastProps) {
  return <div css={ToastLayout}>{children}</div>;
}
