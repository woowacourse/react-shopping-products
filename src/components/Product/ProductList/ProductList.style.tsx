import { css } from "@emotion/react";
export const listCss = css({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  width: "380px",
  placeItems: "center",
  margin: "0 auto",
  gap: "20px",
  minHeight: "800px",
});
