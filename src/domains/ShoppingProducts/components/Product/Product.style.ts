import { css } from "@emotion/react";

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
  position: relative;
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 50%;
`;

const productImg = css`
  width: 100%;
  height: 100%;
`;

const soldOutLayout = css`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #00000059;

  color: white;
  font-weight: 600;
  font-size: 35px;
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

export {
  productLayout,
  imgLayout,
  productImg,
  soldOutLayout,
  contentLayout,
  descriptionLayout,
  productNameLayout,
  priceLayout,
};
