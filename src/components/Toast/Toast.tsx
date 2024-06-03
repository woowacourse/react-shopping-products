import { useEffect, useState } from 'react';

import * as Styled from './Toast.style';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast = ({ message, onClose }: ToastProps) => {
  const [isClose, setIsClose] = useState<boolean>(false);

  useEffect(() => {
    if (!isClose) return;

    const removeTimer = setTimeout(() => {
      onClose();
    }, 500);
    return () => {
      clearTimeout(removeTimer);
    };
  }, [isClose, onClose]);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setIsClose(true);
    }, 3000);
    return () => {
      clearTimeout(closeTimer);
    };
  }, []);

  return (
    <Styled.Container isClose={isClose}>
      <Styled.ToastMessage>{message}</Styled.ToastMessage>
    </Styled.Container>
  );
};

export default Toast;
