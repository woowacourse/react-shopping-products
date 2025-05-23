import { css } from "@emotion/react";

export const ProductContainer = css`
  width: 182px;
  height: 224px;
  border-radius: 8px;
`;

export const ImageContainer = css`
  position: relative;
  width: 100%;
  height: 112px;
  border-radius: 8px 8px 0 0;
`;

export const SoldOutImage = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  color: white;
  letter-space: 10%;
  font-weight: 600;
  position: absolute;
  width: 182px;
  height: 112px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 0 0;
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
