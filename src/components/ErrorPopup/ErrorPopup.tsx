import { useEffect } from "react";
import { useError } from "@/context";
import { Text } from "@/components";
import * as S from "./ErrorPopup.styles";

export default function ErrorPopup() {
  const { errorMessage, hideError } = useError();

  useEffect(() => {
    const timer = setTimeout(() => {
      hideError();
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMessage, hideError]);

  if (!errorMessage) return null;
  return (
    <S.ErrorPopupWrapper role="alert" aria-live="assertive">
      <Text>{errorMessage}</Text>
    </S.ErrorPopupWrapper>
  );
}
