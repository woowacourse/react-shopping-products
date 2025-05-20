import * as S from "../Fallback.styled";
import planetErrorImage from "@assets/images/planet-error.png";

interface FallbackProps {
  message: string;
}

function ErrorFallback({ message }: FallbackProps) {
  return (
    <S.Container>
      <S.FallbackImage src={planetErrorImage} alt={`오류 행성이`} />
      <S.Message>{message}</S.Message>
    </S.Container>
  );
}

export default ErrorFallback;
