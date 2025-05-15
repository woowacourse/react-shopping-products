import { css, keyframes } from "@emotion/react";
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const smallStyle = css({
  width: "30px",
  height: "30px",
  border: "3px solid rgba(0, 0, 0, 0.1)",
});

export const mediumStyle = css({
  width: "50px",
  height: "50px",
  border: "5px solid rgba(0, 0, 0, 0.1)",
});

export const largeStyle = css({
  width: "70px",
  height: "70px",
  border: "7px solid rgba(0, 0, 0, 0.1)",
});

export const baseSpinnerStyle = css({
  borderRadius: "50%",
  borderTopColor: "#3498db",
  animation: `${spin} 0.8s linear infinite`,
});

export const containerStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});
