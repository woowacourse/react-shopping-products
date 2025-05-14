import React from "react";
import { css } from "@emotion/react";

interface FallbackProps {
  message?: string;
}

const fallbackContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4rem",
  height: "800px",
  width: "320px",
});

const fallbackImageStyle = css({
  width: "400px",
});

const fallbackTitleStyle = css({
  fontWeight: "bold",
});

const Fallback: React.FC<FallbackProps> = ({
  message = "서버와 연결이 좋지 않아요. 다시 시도해주세요.",
}) => {
  return (
    <div css={fallbackContainerStyle}>
      <img
        css={fallbackImageStyle}
        src="/assets/fallback.png"
        alt="머리 아픈 행성이"
      />
      <h1 css={fallbackTitleStyle} id="fallback-details">
        {message}
      </h1>
    </div>
  );
};

export default Fallback;
