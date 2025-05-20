import { css } from "@emotion/react";

export const modalHeader = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const headerContainer = css({
  position: "relative",
});

export const closeButton = css({
  "&:hover": {
    cursor: "pointer",
  },
});

export const title = css({
  fontFamily: "Noto Sans KR",
  fontWeight: 700,
  fontSize: "18px",
  margin: 0,
  marginBlock: 0,
  marginInline: 0,
  lineHeight: "100%",
  letterSpacing: "0px",
  verticalAlign: "middle",
  width: "fit-content",
  whiteSpace: "nowrap",
});
