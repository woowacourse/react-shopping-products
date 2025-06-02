import { css } from "@emotion/react";
import { Z_INDEX } from "../../constants";

const headerLayout = css`
  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
  width: 100%;
  min-height: 64px;

  background-color: black;
  color: #fff;
  font-size: 20px;
  font-weight: 800;

  z-index: ${Z_INDEX.HEADER};
`;

export { headerLayout };
