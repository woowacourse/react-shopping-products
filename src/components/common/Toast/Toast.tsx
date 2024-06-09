import * as S from './Toast.style';
import { Notice } from '../../../assets';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  });

  return (
    <S.Container>
      <Notice />
      <S.MessageText>{message}</S.MessageText>
    </S.Container>
  );
}

export default Toast;
