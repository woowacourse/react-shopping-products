import styled from '@emotion/styled';

export const SkeletonCard = styled.div`
  width: 11.375rem;
  height: 14rem;

  border-radius: 8px;
`;

export const SkeletonImg = styled.div`
  width: 100%;
  height: 112px;

  border-radius: 8px 8px 0 0;

  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;

  animation: skeleton-animation 5s ease infinite;

  @keyframes skeleton-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const SkeletonBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 0.5rem;

  height: 50%;
  padding: 0.5rem;
`;

export const SkeletonInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 0.5rem;
`;

export const SkeletonText = styled.div`
  width: 100%;
  height: 1rem;
  border-radius: 4px;

  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;

  animation: skeleton-animation 5s ease infinite;

  @keyframes skeleton-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
