import * as styles from "./Spinner.styles";

interface SpinnerProps {
  size: "small" | "medium" | "large";
}

const Spinner = ({ size = "medium" }: SpinnerProps) => {
  return (
    <div css={styles.containerStyle}>
      <div
        css={[
          size === "small" && styles.smallStyle,
          size === "medium" && styles.mediumStyle,
          size === "large" && styles.largeStyle,
          styles.baseSpinnerStyle,
        ]}
      />
    </div>
  );
};

export default Spinner;
