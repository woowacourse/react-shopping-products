import * as S from './ErrorToast.styles';

interface ErrorToastProps {
  errorMessage: string;
}

const ErrorToast = ({ errorMessage }: ErrorToastProps) => {
  return (
    <S.ErrorToastContainer data-testid="error-message" $isVisible={errorMessage.length !== 0}>
      {errorMessage}
    </S.ErrorToastContainer>
  );
};

export default ErrorToast;
