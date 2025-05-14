import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface ErrorToastProps {
  errorMessage: string;
}

const ErrorToast = ({ errorMessage }: ErrorToastProps) => {
  return <ErrorToastContainer>{errorMessage}</ErrorToastContainer>;
};

const fadeInout = keyframes`
    0%{
        opacity: 0;
        transform: translateY(-10px);
    }
    10%{
        opacity: 1;
        transform: translateY(0);
    }
    90%{
        opacity: 1;
        transform: translateY(0);
    }
    100%{
        opacity: 0;
        transform: translateY(-10px);
    }
`;

const ErrorToastContainer = styled.div`
  width: 100%;
  background-color: var(--color-red);
  padding: 12px 0;
  box-sizing: border-box;
  text-align: center;
  color: var(--color-dark-grey);
  animation: ${fadeInout} 3s ease-in-out;
`;

export default ErrorToast;
