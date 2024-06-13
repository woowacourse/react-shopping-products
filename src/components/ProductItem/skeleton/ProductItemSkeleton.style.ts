import { styled, css } from "styled-components";

import * as Styled from "../ProductItem.style";

const skeletonStyle = css`
  position: relative;
  overflow: hidden;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.2);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.4);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.2);
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 3s infinite ease-in-out;
  }
`;

export const ProductItemBoxSkeleton = styled(Styled.ProductItemBox)``;
export const ProductImageSkeleton = styled(Styled.ProductImage)`
  ${skeletonStyle}
`;
export const ProductContentBoxSkeleton = styled(Styled.ProductContentBox)``;
export const ProductDescriptionBoxSkeleton = styled(Styled.ProductDescriptionBox)`
  & > h2 {
    ${skeletonStyle}
  }
`;
export const ProductFooterSkeleton = styled(Styled.ProductFooter)``;
export const ProductCartButtonSkeleton = styled(Styled.ProductCartButton)`
  background-color: rgba(165, 165, 165, 0.1);

  ${skeletonStyle}
`;

export const ProductItemSkeletonContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 16px;
  margin-top: 28px;
`;
