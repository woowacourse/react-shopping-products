import { useEffect } from 'react';
import S from './ErrorToast.module.css';

interface ErrorToastProps {
  message: string;
  onClose: () => void;
}

const ErrorToast = ({ message, onClose }: ErrorToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={S.toastContainer}>
      <p className={S.toastText}>{message}</p>
    </div>
  );
};

export default ErrorToast;
