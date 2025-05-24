import { css, keyframes } from "@emotion/react";
import { colors } from "../../../../styles/theme";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const modalBackgroundCss = (position?: "center" | "bottom") =>
  css({
    position: "fixed",
    display: "flex",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: colors.overlayLight,
    animation: `${fadeIn} 0.3s ease-in-out`,
    justifyContent: "center",
    alignItems: position === "center" ? "center" : "end",
  });
