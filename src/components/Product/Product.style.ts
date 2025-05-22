import { css } from '@emotion/css';

export const productContainer = css`
  width: 100%;
  height: 224px;
  border-radius: 8px;
  position: relative;
`;

export const productImage = css`
  width: 100%;
  height: 50%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const productContent = css`
  padding: 10px;
`;

export const productTitle = css`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

export const productPrice = css`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
`;

export const buttonWrapper = css`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
