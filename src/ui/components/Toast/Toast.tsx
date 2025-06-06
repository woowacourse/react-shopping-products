import { useState, useEffect } from 'react';
import { ToastContainer, Message } from './Toast.styles';

interface ToastProps {
  message: string;
  duration?: number;
  onExit?: () => void;
}

function Toast({ message, duration = 3000, onExit }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 300);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onExit?.();
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isExiting, onExit]);

  return (
    <ToastContainer isExiting={isExiting}>
      <Message>{message}</Message>
    </ToastContainer>
  );
}

export default Toast;
