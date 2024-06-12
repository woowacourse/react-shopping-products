import ErrorImage from "../../../assets/error-image.png";
import * as S from "@/error/error.style";

export interface ErrorProps {
  message: string;
  resetError: () => void;
}

const ErrorFallback = ({ message, resetError }: ErrorProps) => {
  return (
    <S.ErrorWrapper>
      <S.ErrorContentContainer>
        <S.ErrorImage src={ErrorImage} alt="error" />
        <S.ErrorHeading>{message}</S.ErrorHeading>
        <S.ErrorResetButton onClick={resetError}>{"새로고침"}</S.ErrorResetButton>
      </S.ErrorContentContainer>
    </S.ErrorWrapper>
  );
};

export default ErrorFallback;
