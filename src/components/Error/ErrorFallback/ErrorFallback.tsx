import { RetryIcon } from "../../../assets";
import * as S from "./ErrorFallback.style";

interface ErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
}

function ErrorFallback({ message, onRetry }: ErrorFallbackProps) {
  console.log(123);
  return (
    <S.ErrorContainer>
      <S.ErrorIcon>⚠️</S.ErrorIcon>
      <S.ErrorMessage>{message}</S.ErrorMessage>
      {onRetry && <S.RetryIcon src={RetryIcon} onClick={onRetry}></S.RetryIcon>}
    </S.ErrorContainer>
  );
}

export default ErrorFallback;
