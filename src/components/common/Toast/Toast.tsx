import { createPortal } from "react-dom";
import * as S from "./Toast.style";

interface ToastProps {
  message: string;
  showToast: boolean;
}

function Toast({ message, showToast }: ToastProps) {
  return (
    <>
      {showToast &&
        createPortal(
          <S.Container>
            <S.MessageText>{message}</S.MessageText>
          </S.Container>,
          document.body,
        )}
    </>
  );
}

export default Toast;
