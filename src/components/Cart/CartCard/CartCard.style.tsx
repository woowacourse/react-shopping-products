import { css } from "@emotion/react";

export const cartCardCss = css({
  display: "flex",
  width: "182px",
  height: "250px",
  flexDirection: "column",
  borderRadius: "8px 8px 0 0",
  backgroundColor: "white",
});

export const cartCardImageCss = css({
  position: "relative",
  height: "50%",
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px 8px 0 0",
  },
});

export const cartCardDetailCss = css({
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

export const cartCardSoldOutCss = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px 8px 0 0",
  p: {
    fontSize: "32px",
    fontWeight: "600",
    color: "white",
  },
});
