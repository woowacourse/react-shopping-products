import { css, keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const modalBackground = (position?: "center" | "bottom") =>
  css({
    position: "fixed",
    display: "flex",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#3333331A",
    animation: `${fadeIn} 0.3s ease-in-out`,
    justifyContent: "center",
    alignItems: position === "center" ? "center" : "end",
  });
