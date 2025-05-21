import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const skeletonLoading = keyframes`
  0% {
    background-color: #d7dadc;
  }
  100% {
    background-color:rgb(245, 245, 245)
  }
`;

export const Skeleton = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 100%;

  animation: ${skeletonLoading} 1s linear infinite alternate;
`;
