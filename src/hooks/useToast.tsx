import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Toast from '@/components/Toast/Toast';
import { createPortal } from 'react-dom';
import ErrorWithHeader from '@/errors/ErrorWithHeader';

interface ToastContextType {
  showToast: (message: string) => void;
  showErrorToast: (error: ErrorWithHeader) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [header, setHeader] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(undefined), 3000);
  }, []);

  const showErrorToast = useCallback(({ header, message }: ErrorWithHeader) => {
    setHeader(header);
    setMessage(message);
    setTimeout(() => {
      setMessage(undefined);
      setHeader(undefined);
    }, 3000);
  }, []);

  const target = document.getElementById('toast');

  if (target === null) {
    console.error('toast를 띄우기 위한 포탈의 생성 위치가 올바르지 않습니다.');
    return;
  }

  return (
    <ToastContext.Provider value={{ showToast, showErrorToast }}>
      {children}
      {createPortal(<> {message && <Toast message={message} header={header} />}</>, target)}
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
