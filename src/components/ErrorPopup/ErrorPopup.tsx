import Text from "../Text/Text";
import * as S from "./ErrorPopup.styles";
import { useEffect } from "react";

const ErrorPopup = ({
  errorMessage,
  setErrorMessage,
}: {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, [setErrorMessage]);

  return (
    <S.ErrorPopupWrapper>
      <Text variant="body-2">{errorMessage}</Text>
    </S.ErrorPopupWrapper>
  );
};

export default ErrorPopup;
