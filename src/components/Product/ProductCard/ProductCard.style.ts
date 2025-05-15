import { css } from "@emotion/react";

export const cardCss = css({
  display: "flex",
  width: "182px",
  height: "250px",
  flexDirection: "column",
  borderRadius: "8px 8px 0 0",
  backgroundColor: "white",
});

export const imageCss = css({
  objectFit: "cover",
  borderRadius: "8px 8px 0 0 ",
  height: "50%",
});

export const detailCss = css({
  padding: "15px 8px 0 8px",
  h2: {
    fontWeight: "700",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "20px",
  },
  p: { fontWeight: "500", fontSize: "14px", marginBottom: "1rem" },
});
