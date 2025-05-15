import { useEffect, useState } from "react";
import * as S from "./AlertToast.styled";

interface AlertToastProps {
  errorMessage: string;
}

function AlertToast({ errorMessage }: AlertToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <S.Container>
      <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
    </S.Container>
  );
}

export default AlertToast;
