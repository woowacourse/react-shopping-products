import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ErrorToastProps {
  errorMessage: string;
}

const ErrorToast = ({ errorMessage }: ErrorToastProps) => {
  return (
    <ErrorToastContainer $isVisible={errorMessage.length !== 0}>{errorMessage}</ErrorToastContainer>
  );
};

const fadeIn = keyframes`
    from{
        opacity: 0;
        transform: translateY(-10px);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeOut = keyframes`
    from{
        opacity: 1;
        transform: translateY(0);
    }
    to{
        opacity: 0;
        transform: translateY(-10px);
    }
`;

const ErrorToastContainer = styled.div<{ $isVisible: boolean }>`
  max-width: var(--max-width-container);
  width: 100%;
  background-color: var(--color-red);
  padding: 12px 0;
  box-sizing: border-box;
  text-align: center;
  color: var(--color-dark-grey);
  position: fixed;
  left: 0;
  top: var(--height-header);
  z-index: var(--z-index-toast);

  ${({ $isVisible }) =>
    css`
      animation: ${$isVisible ? fadeIn : fadeOut} 0.3s ease-in-out;
    `}
`;

export default ErrorToast;
