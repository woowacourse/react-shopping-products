import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const skeletonLoading = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const Skeleton = styled.div`
  display: inline-block;
  border-radius: 8px;

  background-color: #f0f0f0;
  background-image: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
  background-size: 200px 100%;
  background-repeat: no-repeat;
  background-position: 0 0;

  animation: ${skeletonLoading} 1.2s infinite;
`;
