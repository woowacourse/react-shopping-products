import { useEffect } from "react";
import { Text } from "../index";
import * as S from "./ErrorPopup.styles";

interface ErrorPopupProps {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function ErrorPopup({ errorMessage, setErrorMessage }: ErrorPopupProps) {
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, [setErrorMessage]);

  return (
    <S.ErrorPopupWrapper>
      <Text>{errorMessage}</Text>
    </S.ErrorPopupWrapper>
  );
}
