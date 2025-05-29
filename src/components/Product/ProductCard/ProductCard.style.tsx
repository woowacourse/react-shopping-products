import { css, keyframes } from "@emotion/react";
import { colors, radius } from "../../../styles/theme";

export const cardCss = css({
  position: "relative", // 추가: 자식의 absolute 포지셔닝 기준
  overflow: "hidden", // 추가: 영역 벗어나는 부분 숨김
  display: "flex",
  width: "182px",
  height: "250px",
  flexDirection: "column",
  borderRadius: radius.md,
  backgroundColor: colors.white,
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
  },
});

export const imageCss = css({
  position: "relative",
  height: "50%",
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: `${radius.md} ${radius.md} 0 0`,
    display: "block",
  },
});

export const detailCss = css({
  padding: "15px 8px 0 8px",
  h2: {
    fontWeight: "700",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "20px",
  },
  p: { fontWeight: "500", fontSize: "14px", marginBottom: "1rem" },
});

export const soldOutCss = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: colors.overlay,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: `${radius.md} ${radius.md} 0 0`,
  p: {
    fontSize: "32px",
    fontWeight: "600",
    color: colors.white,
  },
});

export const detailsContainerCss = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto",
  p: {
    margin: "0",
    fontSize: "14px",
    fontWeight: "500",
    color: colors.gray[500],
  },
});
/* 1) 컬러: 채도를 조금 낮춘 버건디 + 살짝 밝아지는 브리드 */
const calmBase = "#8B1E3F"; // 기본 배경
const calmLight = "#9C2A4A"; // 10% 밝아진 톤

/* 2) 텍스트 흐르는 애니메이션 */
const marquee = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

/* 3) 배경이 미세하게 밝아졌다 어두워지는 ‘breathing’ */
const breathe = keyframes`
  0%, 100% { background-color: ${calmBase};  }
  50%      { background-color: ${calmLight}; }
`;

export const soldOutSoonCss = css({
  position: "absolute",
  inset: 0, // top/left/right 0
  height: 24,
  overflow: "hidden",
  zIndex: 10,
  borderRadius: `${radius.sm} ${radius.sm} 0 0`,

  /* 부드러운 호흡 효과 (2.5 s 주기) */
  animation: `${breathe} 2.5s ease-in-out infinite`,

  ".track": {
    display: "flex",
    width: "200%",
    animation: `${marquee} 10s linear infinite`,
    willChange: "transform",
  },

  ".msg": {
    flex: "0 0 50%",
    whiteSpace: "nowrap",
    fontSize: 12,
    fontWeight: 700,
    lineHeight: "24px",
    color: colors.white,
    textAlign: "center",
    letterSpacing: "0.4px",
  },
});
