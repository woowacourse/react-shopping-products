import { createPortal } from 'react-dom';
import { ToastStyle } from './Toast.styles';
import Text from '../Text';
import { useEffect } from 'react';
import { useToast } from './context';

interface ToastProps {
  message?: string;
  duration?: number;
}

const Toast = ({
  message = '상품이 장바구니에 추가되었습니다.',
  duration = 3000,
}: ToastProps) => {
  const { isVisible, closeToast } = useToast();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        closeToast?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, isVisible, closeToast]);

  if (!isVisible) return null;

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
