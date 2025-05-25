import { useEffect } from "react";
import * as S from "./ErrorToast.styles";

interface ErrorToastProps {
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
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
