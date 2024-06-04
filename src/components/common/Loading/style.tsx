import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  width: 60px;
`;

const bounce = keyframes`
  50% {
    transform: translateY(-90px);
    scale: 0.3;
  }
`;

export const Ball = styled.li`
  list-style: none;

  width: 12px;
  height: 12px;

  border-radius: 50%;

  background-color: #333;

  &:nth-of-type(1) {
    animation: ${bounce} 2.1s ease-in-out infinite;
  }

  &:nth-of-type(2) {
    animation: ${bounce} 2.1s ease-in-out 0.3s infinite;
  }

  &:nth-of-type(3) {
    animation: ${bounce} 2.1s ease-in-out 0.6s infinite;
  }
`;
