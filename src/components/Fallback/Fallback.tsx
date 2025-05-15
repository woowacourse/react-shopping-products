import React from "react";
import * as styles from "./Fallback.style";

interface FallbackProps {
  message?: string;
}

const Fallback: React.FC<FallbackProps> = ({
  message = "서버와 연결이 좋지 않아요. 다시 시도해주세요.",
}) => {
  return (
    <div css={styles.fallbackContainerStyle}>
      <img
        css={styles.fallbackImageStyle}
        src="/assets/fallback.png"
        alt="머리 아픈 행성이"
      />
      <h1 css={styles.fallbackTitleStyle} id="fallback-details">
        {message}
      </h1>
    </div>
  );
};

export default Fallback;
