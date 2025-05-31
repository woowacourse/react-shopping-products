import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const SkeletonBox = styled.div`
  animation: ${shimmer} 1.5s infinite linear;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #e0e0e0 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  background-size: 800px 104px;
  border-radius: 8px;
`;

export const SkeletonWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ImageSkeleton = styled(SkeletonBox)`
  width: 100%;
  height: 160px;
`;

export const TextSkeleton = styled(SkeletonBox)<{ width?: string }>`
  height: 20px;
  width: ${({ width }) => width || '100%'};
`;

export const ButtonSkeleton = styled(SkeletonBox)`
  height: 36px;
  width: 100%;
`;
