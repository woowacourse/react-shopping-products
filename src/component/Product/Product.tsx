import { css } from "@emotion/react";
import React from "react";

interface ProductProps {
  imgSrc: string;
  productName: string;
  price: string;
  children: React.ReactNode;
}

const productLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 8px;
  border-radius: 8px;
  width: 182px;
  height: 224px;
  gap: 15px;
`;

const imgLayout = css`
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 50%;
`;

const contentLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 27px;
  width: 100%;
  height: 50%;
`;

const descriptionLayout = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

const productNameLayout = css`
  font-size: 14px;
  font-weight: 700;
`;

const priceLayout = css`
  font-size: 12px;
  font-weight: 500;
`;

export default function Product({
  imgSrc,
  productName,
  price,
  children,
}: ProductProps) {
  return (
    <div css={productLayout}>
      <img css={imgLayout} src={imgSrc} />
      <div css={contentLayout}>
        <div css={descriptionLayout}>
          <p css={productNameLayout}>{productName}</p>
          <p css={priceLayout}>{price}</p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
