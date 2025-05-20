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

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
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
