import { css, keyframes } from '@emotion/react';
import { theme } from '../../../style';

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;

  }
`;

export const ToastStyle = ({ isSuccess }: { isSuccess: boolean }) => css`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 6.4rem;
  width: 42.9rem;
  padding: 1.2rem 7.7rem;
  background-color: ${isSuccess ? theme.color.green : theme.color.pink};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${fadeInOut} 1.5s ease-out forwards;
`;
