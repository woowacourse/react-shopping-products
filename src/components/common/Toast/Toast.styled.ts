import { SIZE } from '@styles/style.constant';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const ToastContainer = styled.div<{ $isOpen: boolean }>`
  font-size: 15px;

  background-color: red;
  color: white;
  width: ${SIZE.layoutWidth};
  height: 50px;
  position: fixed;
  top: ${SIZE.navigationHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.5s ease-out;
`;
