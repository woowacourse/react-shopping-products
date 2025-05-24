import { css } from "@emotion/react";
import { colors, radius } from "../../styles/theme";

export const buttonCss = css({
  width: "64px",
  height: "26px",
  padding: "4px 8px",
  borderRadius: radius.xs,
  border: "none",

  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  span: {
    display: "inline-block",
  },
  justifySelf: "flex-end",
});

export const inCartCss = css({
  backgroundColor: colors.gray[100],
  color: colors.black,
});

export const notInCartCss = css({
  backgroundColor: colors.black,
  color: colors.white,
});
