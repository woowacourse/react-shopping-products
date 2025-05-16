import Text from "../Text/Text";
import * as S from "./ErrorPopup.styles";
import { useEffect } from "react";

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
