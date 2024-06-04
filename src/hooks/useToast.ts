import { useCallback, useContext } from 'react';
import { ToastContext } from '../context/ToastContextProvider';

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('ToastProvider를 추가해주세요');
  }

  const { setToast } = context;

  const createToast = useCallback(
    (message: string, time: number = 3000) => {
      const newToast = { id: Date.now().toString(), message };
      setToast(newToast);

      setTimeout(() => {
        setToast(null);
      }, time);
    },
    [setToast],
  );

  return { createToast };
}
