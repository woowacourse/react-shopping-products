import { css } from "@emotion/react";

export const HeaderContainer = css`
  display: flex;
  justify-content: space-between;
  background-color: black;
  height: 64px;
  width: 430px;
  color: white;
  align-items: center;
  padding: 24px;
  position: sticky;
  z-index: 1;
`;

export const HeaderTitle = css`
  font-size: 20px;
  font-weight: 800;
`;
