import * as S from './ErrorToast.styles';

interface ErrorToastProps {
  message: string;
  visible: boolean;
}

const ErrorToast = ({ message, visible }: ErrorToastProps) => {
  return (
    <S.ErrorToastContainer data-testid="error-message" $isVisible={visible}>
      {message}
    </S.ErrorToastContainer>
  );
};

export default ErrorToast;
