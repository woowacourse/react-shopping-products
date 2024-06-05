import COLOR_PALETTE from "../style/colorPalette";
import React from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const blink = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
`;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Dot: styled.div<{ type: "black" | "white" }>`
    background-color: ${({ type }) =>
      type === "black" ? COLOR_PALETTE.black : COLOR_PALETTE.white};
    width: 8px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    margin: 0 5px;
    display: inline-block;
    animation: ${blink} 1.4s infinite;
    animation-fill-mode: both;

    &:nth-of-type(1) {
      animation-delay: 0ms;
    }
    &:nth-of-type(2) {
      animation-delay: 200ms;
    }
    &:nth-of-type(3) {
      animation-delay: 400ms;
    }
  `,
};

interface LoadingDotsProps {
  type?: "black" | "white";
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ type = "black" }) => {
  return (
    <S.Container>
      <S.Dot type={type} />
      <S.Dot type={type} />
      <S.Dot type={type} />
    </S.Container>
  );
};

export default LoadingDots;
