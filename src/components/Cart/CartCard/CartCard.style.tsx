import { css } from "@emotion/react";
import { colors, radius } from "../../../styles/theme";

export const cartCardCss = css({
  display: "flex",
  width: "100%",
  gap: "16px",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  borderBottom: `1px solid ${colors.gray[200]}`,
  minHeight: "120px",
});

export const cartCardImageCss = css({
  width: "90px",
  height: "90px",
  position: "relative",

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: radius.md,
  },
});

export const cartCardDetailCss = css({
  h2: {
    fontWeight: "700",
    fontSize: "20px",
  },
  p: { fontWeight: "500", fontSize: "14px", marginBottom: "1rem" },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const cartCardSoldOutCss = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: colors.overlay,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: radius.md,
  p: {
    fontSize: "32px",
    fontWeight: "600",
    color: colors.white,
  },
});
export const cartCardDeleteCss = css({
  width: "48px",
  height: "24px",
  backgroundColor: colors.white,
  color: colors.black,
  border: `1px solid ${colors.gray[200]}`,
  borderRadius: radius.xs,
  cursor: "pointer",
  marginLeft: "auto",
  transition: "background-color 0.3s ease, color 0.3s ease",
  "&:hover": {
    backgroundColor: colors.gray[200],
    color: colors.black,
    border: `1px solid ${colors.gray[200]}`,
  },
  "&:hover:enabled:focus": {
    backgroundColor: colors.gray[200],
    color: colors.black,
    border: `1px solid ${colors.gray[200]}`,
  },
  "&:disabled": {
    backgroundColor: colors.gray[200],
  },
  "&:disabled:hover": {
    backgroundColor: colors.gray[200],
    color: colors.black,
  },
});
