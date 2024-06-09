import { useCallback, useContext } from 'react';
import { ToastContext } from '../contexts/ToastContextProvider';
import { DEFAULT_TOAST_DELAY_TIME } from '@/constants/index';

interface createToastProps {
  message: string;
  delayTime?: number;
}

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('ToastProvider를 추가해주세요');
  }

  const { setToast } = context;

  const createToast = useCallback(
    ({ message, delayTime = DEFAULT_TOAST_DELAY_TIME }: createToastProps) => {
      const newToast = { message };
      setToast(newToast);

      setTimeout(() => {
        setToast(null);
      }, delayTime);
    },
    [setToast],
  );

  return { createToast };
};

export default useToast;
