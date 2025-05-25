import styled from '@emotion/styled';
import { createPortal } from 'react-dom';

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return createPortal(
    <ErrorContainer>{errorMessage}</ErrorContainer>,
    document.getElementById('main') as HTMLElement
  );
};

export default ErrorMessage;

const ErrorContainer = styled.div`
  width: 500px;
  min-height: 64px;
  background-color: #ffc9c9;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 63px;
`;
