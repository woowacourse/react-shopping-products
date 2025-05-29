import * as styles from "./Spinner.style.tsx";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
}

const Spinner = ({ size = "medium" }: SpinnerProps) => {
  return (
    <div css={styles.containerCss} data-testid="loading-spinner">
      <div
        css={[
          size === "small" && styles.smallCss,
          size === "medium" && styles.mediumCss,
          size === "large" && styles.largeCss,
          styles.baseSpinnerCss,
        ]}
      />
    </div>
  );
};

export default Spinner;
