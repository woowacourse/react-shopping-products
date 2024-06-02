import { useCallback, useContext } from 'react';
import { ToastContext } from '../context/ToastContextProvider';

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('ToastProvider를 추가해주세요');
  }

  const { setToast } = context;

  const createToast = useCallback(
    (message: string) => {
      const newToast = { message };
      setToast(newToast);

      setTimeout(() => {
        setToast(null);
      }, 3000);
    },
    [setToast],
  );

  return { createToast };
}
