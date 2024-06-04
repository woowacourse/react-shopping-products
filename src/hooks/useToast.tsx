import { createContext, useContext, useState, ReactNode } from 'react';
import Toast from '@/components/Toast/Toast';
import { createPortal } from 'react-dom';
import styles from '../components/Toast/Toast.module.css';

export type ToastType = 'alert';
const MAX_TOAST_COUNT = 10;

type Toast = {
  message: string;
  type: ToastType;
  id?: number;
};

type ToastContextType = {
  showToast: (toast: Toast) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastList, setToastList] = useState<Toast[]>([]);

  const showToast = (toast: Toast) => {
    const id = Date.now();
    const newToast = { ...toast, id };
    setToastList((prev) => [newToast, ...prev].slice(0, MAX_TOAST_COUNT));

    setTimeout(() => {
      setToastList((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const target = document.getElementById('toast');

  if (target === null) {
    console.error('포탈의 생성 위치가 올바르지 않습니다.');
    return;
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <ul className={styles['toast-list']}>
          {toastList.map(({ message, type }, index) => (
            <Toast type={type} key={index} message={message} />
          ))}
        </ul>,
        target,
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast는 ToastProvider 내에서 사용되어야 합니다.');
  }
  return context;
};

export default ToastProvider;
