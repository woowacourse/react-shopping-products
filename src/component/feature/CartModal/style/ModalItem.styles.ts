import { css } from '@emotion/react';

export const modalItemStyle = css`
  display: flex;
  width: 100%;
  gap: 1.6rem;
  align-items: center;
`;

export const ModalItemImageStyle = css`
  width: 8rem;
  height: 8rem;
  border-radius: 0.8rem;
  object-fit: cover;
`;

export const ModalItemInfoStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
`;

export const ModalItemInfoHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
`;
