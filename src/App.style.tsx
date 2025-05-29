import { css } from "@emotion/react";
import { colors, radius } from "./styles/theme";

export const dropdownDivCss = css({
  display: "flex",
  width: "380px",
  justifyContent: "space-between",
  marginBottom: "24px",
});

export const appCss = css({
  width: "420px",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: `0px 0px 2px ${colors.overlayLight}`,
  borderRadius: radius.md,
});

export const titleCss = css({
  marginTop: "80px",
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "24px",
  alignSelf: "flex-start",
});
