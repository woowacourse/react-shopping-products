import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { fadeIn, fadeOut } from '../animations/animations';

interface ErrorToastProps {
  errorMessage: string;
}

const ErrorToast = ({ errorMessage }: ErrorToastProps) => {
  return (
    <ErrorToastContainer $isVisible={errorMessage.length !== 0}>{errorMessage}</ErrorToastContainer>
  );
};

const ErrorToastContainer = styled.div<{ $isVisible: boolean }>`
  max-width: var(--max-width-container);
  width: 100%;
  background-color: var(--color-red);
  padding: 12px 0;
  box-sizing: border-box;
  text-align: center;
  color: var(--color-dark-grey);
  position: fixed;
  top: var(--height-header);
  z-index: var(--z-index-toast);

  ${({ $isVisible }) =>
    css`
      animation: ${$isVisible ? fadeIn : fadeOut} 0.3s ease-in-out;
    `}
`;

export default ErrorToast;
