import { css } from "@emotion/react";

export const ProductContainer = css`
  position: relative;
  z-index: 1;
  width: 182px;
  height: 224px;
  border-radius: 8px;
`;

export const ProductImage = css`
  width: 100%;
  height: 112px;
  border-radius: 8px 8px 0 0;
`;

export const ContentContainer = css`
  padding: 15px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProductTitle = css`
  font-size: 14px;
  font-weight: 700;
`;

export const ProductPrice = css`
  font-size: 12px;
  font-weight: 500;
`;

export const ButtonContainer = css`
  display: flex;
  justify-content: flex-end;
`;

export const SoldOutText = css`
  position: absolute;
  top: 56px;
  left: 50%;
  width: 100%;
  height: 112px;
  text-align: center;
  line-height: 300%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  font-size: 35px;
  font-weight: 600;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  pointer-events: none;
`;
