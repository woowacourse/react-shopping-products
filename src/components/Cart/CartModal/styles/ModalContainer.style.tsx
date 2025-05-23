import { css, keyframes } from "@emotion/react";

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const getSizeStyles = (size?: "small" | "medium" | "large" | "full") => {
  switch (size) {
    case "full":
      return {
        width: "100%",
        animation: `${slideIn} 0.3s ease-in-out`,
      };
    case "small":
      return {
        minWidth: "min(400px, 95vw)",
        animation: `${zoomIn} 0.3s ease-in-out`,
      };
    case "medium":
      return {
        minWidth: "min(550px, 95vw)",
        animation: `${zoomIn} 0.3s ease-in-out`,
      };
    case "large":
      return {
        minWidth: "min(800px, 95vw)",
        animation: `${zoomIn} 0.3s ease-in-out`,
      };
    default:
      return {};
  }
};

export const modalContents = (size?: "small" | "medium" | "large" | "full") =>
  css({
    padding: "32px 32px",
    background: "white",
    color: "black",
    borderRadius: "8px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "flex-start",
    animation: `${slideIn} 0.3s ease-in-out`,
    ...getSizeStyles(size),
    "@media (max-width: 480px)": {
      minWidth: "95vw",
    },
  });
