import * as S from "./ToastNotification.styled";

interface ToastProp {
  message: string;
}

const ToastNotification: React.FC<ToastProp> = ({ message }) => {
  return <S.StyledToast>{message}</S.StyledToast>;
};

export default ToastNotification;
