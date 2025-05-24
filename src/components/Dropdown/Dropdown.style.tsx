import { css, keyframes } from "@emotion/react";
import { colors, radius } from "../../styles/theme";

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const wrapperCss = css({
  position: "relative",
  width: "125px",
});

export const selectBoxCss = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "125px",
  borderRadius: radius.md,
  padding: "12px",
  fontSize: "14px",
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray[300]}`,
  cursor: "pointer",
  textAlign: "left",

  img: {
    transition: "transform 0.3s ease",
  },
  // 열릴때 살짝 들뜨는 느낌을 준다고 하네요.
  "&:focus": {
    boxShadow: `0 0 0 2px ${colors.primary}33`,
  },
});

export const openCss = css({
  borderColor: colors.primary,
  img: {
    transform: "rotate(180deg)",
  },
});

export const selectedCss = css({
  color: colors.gray[600],
});

export const unSelectedCss = css({
  color: colors.gray[400],
});

export const listCss = css({
  position: "absolute",
  top: "100%",
  left: 0,
  zIndex: 10,
  width: "100%",
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray[300]}`,
  borderTop: "none",
  maxHeight: "200px",
  overflowY: "auto",
  animation: `${slideDown} 0.2s ease-out forwards`,
});

export const itemCss = css({
  width: "125px",
  padding: "10px 12px",
  fontSize: "14px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: colors.gray[50],
  },
});
