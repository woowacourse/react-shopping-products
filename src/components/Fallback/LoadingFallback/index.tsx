import * as S from "../Fallback.styled";
import planetLoadingImage from "@assets/images/planet-loading.png";

interface FallbackProps {
  message: string;
}

function LoadingFallback({ message }: FallbackProps) {
  return (
    <S.Container>
      <S.FallbackImage src={planetLoadingImage} alt={`로딩 행성이`} />
      <S.Message>{message}</S.Message>
    </S.Container>
  );
}

export default LoadingFallback;
