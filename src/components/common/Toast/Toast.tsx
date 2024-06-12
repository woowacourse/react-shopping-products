import { useEffect } from 'react';

import { Notice } from '../../../assets';

import * as S from './Toast.style';

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
