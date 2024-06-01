import { useEffect, useState } from "react";
import * as S from "./Toast.style";

interface ToastProps {
  message: string;
}

function Toast({ message }: ToastProps) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    showToast && (
      <S.Container>
        <S.MessageText>{message}</S.MessageText>
      </S.Container>
    )
  );
}

export default Toast;
