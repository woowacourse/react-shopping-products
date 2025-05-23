import { css } from '@emotion/css';

export const headerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 429px;
  height: 64px;
  background-color: #000000;
  padding: 0px 20px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

export const headerTitle = css`
  color: #ffffff;
  font-size: 20px;
  font-weight: 800;
  line-height: 16px;
`;

export const cartImg = css`
  width: 20px;
  height: 24px;
`;

export const count = css`
  width: 19px;
  height: 19px;
  background-color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 50%;
  position: absolute;
  right: 20px;
  bottom: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
