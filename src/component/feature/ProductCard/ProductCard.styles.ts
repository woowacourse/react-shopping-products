import { css } from '@emotion/react';

export const productCardStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border-radius: 8px;
  width: 18.2rem;
  border: 1px solid black;
`;

export const productCardImageContainerStyle = css`
  width: 18.2rem;
  height: 11.2rem;
`;

export const productCardImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export const productCardContentStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.7rem;
  padding: 0 0.8rem 0.8rem 0.8rem;
  box-sizing: border-box;
`;

export const productCardContentHeaderStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
`;

export const productCardButtonContainerStyle = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;
