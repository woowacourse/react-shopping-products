import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Spinner = styled.img<{ size?: number; duration?: number }>`
  display: block;
  animation: ${spin} ${({ duration = 1 }) => duration}s linear infinite;
  width: ${({ size = 120 }) => size}px;
  height: ${({ size = 100 }) => size}px;
`;
