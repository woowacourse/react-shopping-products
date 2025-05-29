import { css, keyframes } from "@emotion/react";
import { colors, radius } from "../../styles/theme";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const smallCss = css({
  width: "30px",
  height: "30px",
  border: `3px solid ${colors.overlayLight}`,
});

export const mediumCss = css({
  width: "50px",
  height: "50px",
  border: `5px solid ${colors.overlayLight}`,
});

export const largeCss = css({
  width: "70px",
  height: "70px",
  border: `7px solid ${colors.overlayLight}`,
});

export const baseSpinnerCss = css({
  borderRadius: radius.circle,
  borderTopColor: colors.blue,
  animation: `${spin} 0.8s linear infinite`,
});

export const containerCss = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});
