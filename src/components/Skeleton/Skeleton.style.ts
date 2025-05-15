import { css, keyframes } from '@emotion/css';

export const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const skeletonListContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const skeletonBase = css`
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

export const skeletonItemContainer = css`
  width: 100%;
  height: 224px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`;

export const skeletonImage = css`
  ${skeletonBase}
  width: 100%;
  height: 50%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const skeletonContent = css`
  padding: 10px;
`;

export const skeletonTitle = css`
  ${skeletonBase}
  height: 20px;
  width: 80%;
  margin-bottom: 8px;
`;

export const skeletonPrice = css`
  ${skeletonBase}
  height: 15px;
  width: 50%;
  margin-bottom: 8px;
`;

export const skeletonButton = css`
  ${skeletonBase}
  height: 36px;
  width: 36px;
  border-radius: 50%;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
