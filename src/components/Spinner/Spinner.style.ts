import styled, { keyframes } from 'styled-components';

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(720deg);
  }
`;

const colorAnimation = keyframes`
  0% {
    border-color: #3091e6;
    border-bottom-color: transparent;
  }
  33% {
    border-color: #0a5da9;
    border-bottom-color: transparent;
  }
  66% {
    border-color: #00bbd5;
    border-bottom-color: transparent;
  }
  100% {
    border-color: #3091e6;
    border-bottom-color: transparent;
  }
`;

export const SpinnerWrapper = styled.div`
  &:after {
    display: inline-block;
    border: 1.2em solid #004080;
    margin-top: 5em;
    position: absolute;
    right: calc(50% - 5em);
    width: 10em;
    height: 10em;
    font-size: 6.2px;
    animation: ${spinnerAnimation} 1s infinite cubic-bezier(0.53, 0.21, 0.57, 0.85),
      ${colorAnimation} 3s infinite cubic-bezier(0.45, -0.03, 1, 0.77);
    content: '';
    transform: translateZ(0);
    border-radius: 50%;
  }
`;
