import { css } from "@emotion/react";

export const header = css({
  position: "fixed",
  top: "0%",
  left: "50%",
  transform: "translate(-50%, 0)",
  height: "64px",
  width: "382px",
  backgroundColor: "black",
  padding: "24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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
    backgroundColor: "black",
    color: "white",
    borderRadius: "8px",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    width: "100%",
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
