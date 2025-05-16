import { useEffect } from "react";
import { Text } from "../index";
import * as S from "./ErrorPopup.styles";

interface ErrorPopupProps {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function ErrorPopup({ errorMessage, setErrorMessage }: ErrorPopupProps) {
  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMessage, setErrorMessage]);

  if (!errorMessage) return null;

  return (
    <S.ErrorPopupWrapper role="alert" aria-live="assertive">
      <Text>{errorMessage}</Text>
    </S.ErrorPopupWrapper>
  );
}
