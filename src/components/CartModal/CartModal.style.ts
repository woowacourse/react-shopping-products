import { css } from '@emotion/css';

export const ModalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
`;

export const ModalContainer = css`
  position: fixed;
  width: 430px;
  height: auto;
  max-height: 70vh;
  bottom: 0;
  background-color: white;
  border-radius: 8px;
  overflow-y: auto;
  padding: 24px 16px;
`;

export const ModalTitle = css`
  width: 67px;
  height: 22px;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const CloseButton = css`
  width: 100%;
  height: 44px;
  color: white;
  background-color: #333333;
  border-radius: 5px;
  margin-top: 24px;
`;
