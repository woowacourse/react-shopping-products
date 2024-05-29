import { useContext } from 'react';
import { ToastContext } from '../context/ToastContextProvider';

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('ToastProvider를 추가해주세요');
  }

  const { setToast } = context;

  const createToast = (message: string) => {
    const newToast = { id: Date.now().toString(), message };
    setToast(newToast);

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return { createToast };
}
