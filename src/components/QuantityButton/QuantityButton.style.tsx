import { css } from "@emotion/react";
import { colors, radius } from "../../styles/theme";

export const quantityButtonCss = css({
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
  lineHeight: "12px",
  borderRadius: radius.xs,
  border: `1px solid ${colors.gray[300]}`,
  cursor: "pointer",
  transition: "background-color 0.3s ease, color 0.3s ease",

  "&:hover:not(:disabled)": {
    backgroundColor: colors.gray[200],
    color: colors.black,
    border: `1px solid ${colors.gray[200]}`,
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
    pointerEvents: "none",
    // disabled 상태에서는 hover 효과가 적용되지 않습니다
  },
});

export const quantityButtonContainerCss = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "80px",
  gap: "8px",
  justifySelf: "flex-end",
});
