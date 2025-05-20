import { createPortal } from 'react-dom';
import { ToastStyle } from './Toast.styles';
import Text from '../Text/Text';
import { useEffect } from 'react';
import { useToast } from './context/toastContext';

interface ToastProps {
  message?: string;
  duration?: number;
}

const Toast = ({ duration = 1500 }: ToastProps) => {
  const { isVisible, closeToast, message, isSuccess } = useToast();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        closeToast?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, isVisible, closeToast]);

  if (!isVisible) return null;

  return (
    isVisible &&
    createPortal(
      <div css={ToastStyle({ isSuccess })}>
        <div>
          <Text variant="body">{message}</Text>
        </div>
      </div>,
      document.getElementById('root') as HTMLElement
    )
  );
};

export default Toast;
