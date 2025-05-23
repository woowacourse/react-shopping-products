import { css } from "@emotion/react";

const selectorContainer = (width: string = "100%") => {
  return css`
    display: flex;
    width: ${width};
    height: 24px;
    gap: 4px;
  `;
};

export { selectorContainer };
