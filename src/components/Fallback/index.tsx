import * as S from "./ErrorFallback.styled";
import planetLoadingImage from "@assets/images/planet-loading.png";
import planetErrorImage from "@assets/images/planet-error.png";

type FallbackType = "loading" | "error";

interface FallbackProps {
  type: FallbackType;
  message: string;
}

const fallbackImageMap = {
  loading: planetLoadingImage,
  error: planetErrorImage,
};

function Fallback({ type, message }: FallbackProps) {
  return (
    <S.Container>
      <S.FallbackImage src={fallbackImageMap[type]} alt={`행성이 ${type}`} />
      <S.Message>{message}</S.Message>
    </S.Container>
  );
}

export default Fallback;
