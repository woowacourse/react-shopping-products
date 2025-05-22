import { css } from "@emotion/react";

export const header = css({
  position: "fixed",
  top: "0.5%",
  left: "50%",
  transform: "translate(-50%, 0)",
  height: "64px",
  width: "400px",
  backgroundColor: "black",
  padding: "24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(2px)",
  WebkitBackdropFilter: "blur(2px)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  zIndex: 100,
  p: { color: "white", fontWeight: 800, fontSize: "20px" },
});

export const cartIcon = css({
  position: "relative",

  img: {
    width: "32px",
    height: "32px",
  },
  span: {
    position: "absolute",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "white",
    bottom: "0%",
    right: "0%",
    textAlign: "center",
    fontSize: "14px",
    transition: "transform 0.2s ease",
  },
  transition: "filter 0.3s ease, transform 0.1s ease",
  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
    pointerEvents: "none",
  },
  "&:hover": {
    cursor: "pointer",
    img: {
      filter: "brightness(1.2)",
      transition: "filter 0.3s ease",
    },
    span: {
      transform: "scale(1.2)",
    },
  },
  "&:active": {
    transform: "scale(0.95)",
  },
});

export const totalPrice = css({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "16px",
  fontSize: "16px",
  button: {
    backgroundColor: "black",
    color: "white",
    borderRadius: "8px",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
  },
  label: {
    fontWeight: 700,
    fontSize: "16px",
  },
  span: {
    fontWeight: 800,
    lineHeight: "100%",
    letterSpacing: "0px",
    fontSize: "28px",
  },
});
export const buttonContainer = css({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "16px",
  gap: "8px",
  button: {
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s ease, transform 0.1s ease",
  },
  label: {
    fontWeight: 700,
    fontSize: "16px",
  },
  span: {
    fontWeight: 800,
    lineHeight: "100%",
    letterSpacing: "0px",
    fontSize: "28px",
  },
});

export const orderButton = css({
  backgroundColor: "black",
  color: "white",
  border: "none",
  transition:
    "background-color 0.3s ease, transform 0.1s ease, box-shadow 0.2s ease",
  "&:hover": {
    backgroundColor: "#333333",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  "&:active": {
    backgroundColor: "#111111",
    transform: "scale(0.95)",
  },
  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
    pointerEvents: "none",
  },
});

export const closeButton = css({
  backgroundColor: "white",
  color: "black",
  border: "1px solid #D0D0D0",
  transition:
    "background-color 0.3s ease, transform 0.1s ease, box-shadow 0.2s ease",
  "&:hover": {
    backgroundColor: "#f0f0f0",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.02)",
  },
  "&:active": {
    backgroundColor: "#E0E0E0",
    transform: "scale(0.95)",
  },
});

export const emptyCartContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "2rem",

  textAlign: "center",
  color: "#555",

  img: {
    width: "200px",
    marginBottom: "1rem",
  },

  "> p, > span": {
    fontSize: "1.25rem",
    marginBottom: "1.5rem",
    fontWeight: 500,
  },

  "> div": {
    marginTop: "1rem",
  },
});
