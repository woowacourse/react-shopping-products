import { css } from "@emotion/react";
import { HTMLAttributes } from "react";

type TextVariant = "title-1" | "title-2" | "title-3" | "body-1" | "body-2" | "body-3";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  variant: TextVariant;
  color?: string;
  children: React.ReactNode;
}

const Text = ({ variant, color = "#000", children, ...props }: TextProps) => {
  return (
    <span css={textStyle(variant, color)} {...props}>
      {children}
    </span>
  );
};

export default Text;

const textStyle = (variant: TextVariant, color: string) => {
  return css`
    font-style: normal;
    line-height: normal;

    ${selectVariant(variant)}
    color: ${color};
  `;
};

const selectVariant = (variant: TextVariant) => {
  switch (variant) {
    case "title-1":
      return css`
        font-size: 24px;
        font-weight: 700;
      `;
    case "title-2":
      return css`
        font-size: 14px;
        font-weight: 700;
      `;
    case "body-1":
      return css`
        font-size: 14px;
        font-weight: 500;
      `;
    case "body-2":
      return css`
        font-size: 12px;
        font-weight: 500;
      `;
  }
};
