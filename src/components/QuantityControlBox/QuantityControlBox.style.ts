import { css } from '@emotion/css';

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
