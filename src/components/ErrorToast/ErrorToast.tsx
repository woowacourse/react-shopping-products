import { useEffect } from "react";
import * as S from "./ErrorToast.styles";

interface ErrorToastProps {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ErrorToast = ({ errorMessage, setErrorMessage }: ErrorToastProps) => {
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return <>{!!errorMessage && <S.ErrorToast>{errorMessage}</S.ErrorToast>}</>;
};

export default ErrorToast;
