import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingSpinner = styled.span<{ size?: 'small' | 'large' }>`
  display: inline-block;

  width: 48px;
  height: 48px;

  border-radius: 50%;
  border-top: 4px solid ${({ theme }) => theme.colors.spinnerColor};
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
  position: relative;

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-bottom: 4px solid ${({ theme }) => theme.colors.semiBlack};
    border-left: 4px solid transparent;
  }
`;

const bblFadInOut = keyframes`
  0%, 80%, 100% { box-shadow: 0 2.5em 0 -1.3em; }
  40% { box-shadow: 0 2.5em 0 0; }
`;

const loaderStyles = css`
  border-radius: 50%;
  width: 8px;
  height: 8px;
  animation-fill-mode: both;
  animation: ${bblFadInOut} 1.8s infinite ease-in-out;
`;

export const EllipsisLoader = styled.div`
  ${loaderStyles};
  color: #fff;
  font-size: 8px;
  position: absolute;
  animation-delay: -0.16s;

  &::before,
  &::after {
    display: block;
    position: absolute;
    ${loaderStyles};
    content: '';
  }

  &::before {
    left: -2em;
    animation-delay: -0.32s;
  }

  &::after {
    left: 2em;
  }
`;
