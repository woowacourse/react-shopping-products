import * as S from "./Toast.style";

interface ToastProps {
  message: string;
}

function Toast({ message }: ToastProps) {
  return (
    <S.Container>
      <S.MessageText>{message}</S.MessageText>
    </S.Container>
  );
}

export default Toast;
