import { css } from '@emotion/css';

export const ItemContainer = css`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ItemInfo = css`
  display: flex;
  gap: 16px;
`;
export const ItemContent = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`;
export const CountContainer = css`
  display: flex;
  gap: 4.5px;
  align-items: center;
`;

export const ProductImage = css`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ItemTitle = css`
  font-size: 16px;
  font-weight: 700;
`;
export const ItemPrice = css`
  font-size: 12px;
  font-weight: 500;
`;

export const CountControlButton = css`
  width: 24px;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: white;
`;

export const DeleteButton = css`
  width: 40px;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: white;
`;
