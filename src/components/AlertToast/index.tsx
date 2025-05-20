import { useEffect, useState } from "react";
import * as S from "./AlertToast.styled";

interface AlertToastProps {
  type: "error" | "success";
  message: string;
}

function AlertToast({ type, message }: AlertToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  if (!isVisible) {
    return null;
  }

  return (
    <S.Container type={type}>
      <S.Message>{message}</S.Message>
    </S.Container>
  );
}

export default AlertToast;
