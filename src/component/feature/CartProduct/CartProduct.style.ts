import { css } from "@emotion/react";

const CartProductListLayout = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CartProductLayout = css`
  display: flex;
  gap: 16px;
  width: 100%;
  padding-top: 8px;
  border-top: 1px solid #0000001a;
`;

const ProductImg = css`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

const TitleLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

const ProductName = css`
  font-weight: 700;
  font-size: 16px;
`;

const ProductPrice = css`
  font-weight: 500;
  font-size: 12px;
`;

const deleteButton = css`
  display: flex;
  height: fit-content;
`;

export {
  CartProductListLayout,
  CartProductLayout,
  ProductImg,
  TitleLayout,
  ProductName,
  ProductPrice,
  deleteButton,
};
