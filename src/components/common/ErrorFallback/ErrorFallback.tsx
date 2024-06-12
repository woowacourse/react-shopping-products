import { ERROR_MESSAGE } from "../../../constants";
import * as Styled from "./ErrorFallback.style";

interface ErrorFallbackProps {
  error: unknown;
}

export default function ErrorFallback({ error }: ErrorFallbackProps) {
  const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGE.SERVER.UNKNOWN_ERROR;

  return (
    <Styled.ErrorContainer>
      <Styled.ErrorTitle>⚠️ 오류가 발생했습니다.</Styled.ErrorTitle>
      <Styled.ErrorDescription>
        아래와 같은 오류가 발생했어요.
        <br />
        서둘러 복구하겠습니다. 🙇‍♂️
      </Styled.ErrorDescription>
      <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
    </Styled.ErrorContainer>
  );
}
