import { css } from '@emotion/css';

export const cartModalContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 429px;
  margin: 0 auto;
  padding-top: 10px;
`;

export const cartModalContent = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const cartItem = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  gap: 12px;

  &:last-child {
    border-bottom: none;
  }
`;

export const cartItemContent = css`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const cartItemInfoContainer = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const cartItemImage = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

export const cartItemInfo = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px;
`;

export const cartItemName = css`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
`;

export const cartItemPrice = css`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const cartItemControls = css`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const totalPrice = css`
  width: 100%;

  margin-top: 24px;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const totalLabel = css`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const totalAmount = css`
  font-size: 20px;
  font-weight: 700;
  color: #000;
`;

export const emptyCart = css`
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
`;

export const closeButton = css`
  width: 100%;
  height: 44px;
  background-color: #333333;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;
