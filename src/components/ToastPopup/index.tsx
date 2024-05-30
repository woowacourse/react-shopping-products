import * as S from './style';

interface ToastPopupProps {
  isOpen: boolean;
  message: string;
}

const ToastPopup = ({ isOpen, message }: ToastPopupProps) => {
  return isOpen && <S.ToastMessage $isOpen={isOpen}>{message}</S.ToastMessage>;
};

export default ToastPopup;
