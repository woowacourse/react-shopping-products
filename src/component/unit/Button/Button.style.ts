import { css } from "@emotion/react";

const buttonLayout = (
  backgroundColor: string,
  color: string,
  border: string = "none",
  size: "sm" | "full" = "sm"
) => {
  const sizeVarient = {
    sm: "fit-content",
    full: "100%",
  };

  return css`
    display: flex;
    align-items: center;
    padding: 4px 8px;
    background-color: ${backgroundColor};
    border-radius: 4px;
    color: ${color};
    gap: 4px;
    font-weight: 600;
    font-family: "Noto Sans";
    font-size: 12px;
    border: ${border};
    white-space: nowrap;
    width: ${sizeVarient[size]};
  `;
};

export { buttonLayout };
