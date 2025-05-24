import { css } from "@emotion/react";
import { colors, radius } from "../../styles/theme";

export const toastCss = css({
  background: colors.errorBg,
  width: "382px",
  padding: "12px 20px",
  margin: "0 auto",
  marginTop: "32px",
  borderRadius: radius.md,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  position: "fixed",
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  opacity: 1,
  transition: "opacity 0.3s ease-in-out",
});

export const messageCss = css({
  margin: 0,
  fontSize: "16px",
  fontWeight: "500",
  color: colors.error,
});

export const closeButtonCss = css({
  background: "none",
  border: "none",
  color: colors.error,
  cursor: "pointer",
  fontSize: "18px",
  padding: "0 0 0 10px",
});
