import { css } from "@emotion/react";

export const globalStyle = css`
  body {
    max-width: 400px;
    width: 100%;
    justify-self: center;
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;
