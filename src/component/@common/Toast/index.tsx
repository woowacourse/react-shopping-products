import { createPortal } from 'react-dom';
import { ToastStyle } from './Toast.styles';
import Text from '../Text';
import { useEffect, useState } from 'react';

interface ToastProps {
  message?: string;
  duration?: number;
  onClose?: () => void;
}

const Toast = ({
  message = '상품이 장바구니에 추가되었습니다.',
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return createPortal(
    <div css={ToastStyle}>
      <div>
        <Text variant="body">{message}</Text>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  );
};

export default Toast;
