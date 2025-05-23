import { css } from "@emotion/react";

const pageLayout = css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 430px;
  background-color: white;
  border: 1px solid black;
`;

const selectorBoxLayout = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  > div {
    width: 125px;
  }
`;

const cartIcon = css`
  cursor: pointer;
`;

const cartIconContainer = css`
  position: relative;
  width: fit-content;
`;

const cartItemCount = css`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  inset: 19px 0 0 20px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 50%;
  font-size: 10px;
  width: 19px;
  height: 19px;
`;

const loadingLayout = css`
  display: grid;
  grid-column: span 2;
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
`;

const PaymentsLayout = css`
  display: flex;
  justify-content: space-between;
`;

const PaymentsLabel = css`
  font-weight: 700;
  font-size: 16px;
`;

const PaymentsValue = css`
  font-weight: 700;
  font-size: 24px;
`;

export {
  pageLayout,
  selectorBoxLayout,
  cartIcon,
  cartIconContainer,
  cartItemCount,
  loadingLayout,
  PaymentsLayout,
  PaymentsLabel,
  PaymentsValue,
};
