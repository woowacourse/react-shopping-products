import { css } from "@emotion/react";
import { colors } from "../../../styles/theme";

export const cartListCss = css({
  display: "flex",
  flexDirection: "column",
  borderTop: `1px solid ${colors.gray[200]}`,
  height: "300px",
  overflow: "scroll",
});
