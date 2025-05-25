import { css } from '@emotion/react';
import { theme } from '../../../../style';

export const cartModalStyle = css`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(100%, 430px);
  background-color: ${theme.color.white};
  border-radius: 16px 16px 0 0;
  padding: 2.4rem 1.6rem;
  z-index: 1001;
`;

export const cartModalOverlayStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const cartModalItemListStyle = css`
  max-height: 50vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 2.4rem;
  border-top: 1px solid ${theme.color.gray1};
  padding: 1.6rem 0;

  & > * {
    border-bottom: 1px solid ${theme.color.gray1};
    padding-bottom: 1.6rem;
  }
`;

export const cartModalTotalPriceStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2.4rem 0;
`;
