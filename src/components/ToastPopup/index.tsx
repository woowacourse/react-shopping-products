import * as S from './style';

interface ToastPopupProps {
  isError: boolean;
  message: string;
}

const ToastPopup = ({ isError, message }: ToastPopupProps) => {
  return isError && <S.ToastMessage>{message}</S.ToastMessage>;
};

export default ToastPopup;
