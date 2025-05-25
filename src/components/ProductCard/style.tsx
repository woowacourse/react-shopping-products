import { css } from "@emotion/css";

const CardFrame = css`
  width: 100%;
  height: 224px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ImageFrame = css`
  width: 182px;
  height: 112px;
  position: relative;
  overflow: hidden;
`;
const ImageOverlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 182px;
  height: 112px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  color: white;
  font-weight: 600;
  font-size: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardImage = css`
  width: 100%;
  height: 100%;
  border: none;
  object-fit: cover;
`;

const CardInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 8px 8px 8px;
  gap: 8px;
`;

const ProductName = css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonArea = css`
  display: flex;
  justify-content: space-between;
`;

export {
  CardFrame,
  ImageFrame,
  ImageOverlay,
  CardImage,
  CardInfo,
  ProductName,
  ButtonArea,
};
