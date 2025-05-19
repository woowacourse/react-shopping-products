import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const ProductItemSkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonImage />
      <SkeletonItemInfoContainer>
        <SkeletonTextContainer>
          <SkeletonTItle />
          <SkeletonPrice />
        </SkeletonTextContainer>
        <SkeletonButtonContainer>
          <SkeletonButton />
        </SkeletonButtonContainer>
      </SkeletonItemInfoContainer>
    </SkeletonContainer>
  );
};

export default ProductItemSkeleton;

const SkeletonContainer = styled.div`
  height: 240px;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
`;

const SkeletonItemInfoContainer = styled.div`
  height: 50%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const skeletonBackground = css`
  background: linear-gradient(90deg, #eeeeee 25%, #dddddd 50%, #eeeeee 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 50%;
  ${skeletonBackground};
  border-radius: 8px 8px 0 0;
`;

const SkeletonTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const SkeletonTItle = styled.div`
  border-radius: 4px;
  width: 100px;
  height: 20px;
  ${skeletonBackground};
  animation: ${shimmer} 1.5s infinite;
`;

const SkeletonPrice = styled.div`
  border-radius: 4px;
  width: 70px;
  height: 20px;
  ${skeletonBackground};
  animation: ${shimmer} 1.5s infinite;
`;

const SkeletonButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SkeletonButton = styled.div`
  border-radius: 4px;
  width: 70px;
  height: 30px;
  ${skeletonBackground};
  margin-left: auto;
`;
