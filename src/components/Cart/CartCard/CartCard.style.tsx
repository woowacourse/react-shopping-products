import { css } from "@emotion/react";

export const cartCardCss = css({
  display: "flex",
  width: "100%",
  gap: "16px",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  borderBottom: "1px solid #E0E0E0",
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
    borderRadius: "8px",
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
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  p: {
    fontSize: "32px",
    fontWeight: "600",
    color: "white",
  },
});
export const cartCardDeleteCss = css({
  width: "48px",
  height: "24px",
  backgroundColor: "white",
  color: "black",
  border: "1px solid #E0E0E0",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "auto",
  transition: "background-color 0.3s ease, color 0.3s ease",
  "&:hover": {
    backgroundColor: "#E0E0E0",
    color: "black",
    border: "1px solid #E0E0E0",
  },
  "&:hover:enabled:focus": {
    backgroundColor: "#E0E0E0",
    color: "black",
    border: "1px solid #E0E0E0",
  },
  "&:disabled": {
    backgroundColor: "#E0E0E0",
  },
  "&:disabled:hover": {
    backgroundColor: "#E0E0E0",
    color: "black",
  },
});
