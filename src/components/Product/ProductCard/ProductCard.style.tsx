import { css } from "@emotion/react";
import { colors, radius } from "../../../styles/theme";

export const cardCss = css({
  display: "flex",
  width: "182px",
  height: "250px",
  flexDirection: "column",
  borderRadius: radius.md,
  backgroundColor: colors.white,
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
  },
});

export const imageCss = css({
  position: "relative",
  height: "50%",
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: `${radius.md} ${radius.md} 0 0`,
  },
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

export const soldOutCss = css({
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
  borderRadius: `${radius.md} ${radius.md} 0 0`,
  p: {
    fontSize: "32px",
    fontWeight: "600",
    color: colors.white,
  },
});
