import { keyframes } from "@emotion/react";
interface SpinnerProps {
  size: "small" | "medium" | "large";
}
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = ({ size = "medium" }: SpinnerProps) => {
  // Size mapping in pixels
  const sizeMap = {
    small: { size: "30px", border: "3px" },
    medium: { size: "50px", border: "5px" },
    large: { size: "70px", border: "7px" },
  };

  // Get the appropriate dimensions based on size prop
  const dimensions = sizeMap[size] || sizeMap.medium;

  // Spinner styling using emotion
  const spinnerStyle = {
    width: dimensions.size,
    height: dimensions.size,
    borderRadius: "50%",
    border: `${dimensions.border} solid rgba(0, 0, 0, 0.1)`,
    borderTopColor: "#3498db", // Blue color for the spinner
    animation: `${spin} 0.8s linear infinite`,
  };

  // Simple container to center the spinner
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  return (
    <div css={containerStyle}>
      <div css={spinnerStyle} />
    </div>
  );
};

export default Spinner;
