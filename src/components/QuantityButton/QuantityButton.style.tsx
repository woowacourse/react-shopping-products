import { css } from "@emotion/react";
export const quantityButton = css({
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
  lineHeight: "12px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  cursor: "pointer",
  transition: "background-color 0.3s ease, color 0.3s ease",

  "&:hover:not(:disabled)": {
    backgroundColor: "#E0E0E0",
    color: "black",
    border: "1px solid #E0E0E0",
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
    pointerEvents: "none",
    // disabled 상태에서는 hover 효과가 적용되지 않습니다
  },
});

export const quantityButtonContainer = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "80px",
  gap: "8px",
  justifySelf: "flex-end",
});
