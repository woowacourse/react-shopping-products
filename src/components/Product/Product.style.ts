import { css } from '@emotion/css';

export const productContainer = css`
  width: 100%;
  height: 224px;
  border-radius: 8px;
  position: relative;
`;

export const productSoldOutOverlay = css`
  position: absolute;
  width: 100%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  & span {
    color: white;
    font-size: 35px;
    font-weight: 600;
    letter-spacing: 3px;
  }
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

export const quantityControlContainer = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const quantityButton = css`
  width: 24px;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-radius: 8px;
  color: #363636;
  font-size: 18px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #e9ecef;
  }

  &:disabled {
    color: #adb5bd;
    cursor: not-allowed;
  }
`;

export const quantityDisplay = css`
  font-size: 12px;
  font-weight: 500;
`;
