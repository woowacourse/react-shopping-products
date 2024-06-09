import { createContext, ReactNode, useContext, useRef, useState } from 'react';

import Toast from '../components/common/Toast/Toast';
import ToastGroup from '../components/common/ToastGroup/ToastGroup';

interface ToastContextType {
  addToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast는 ToastProvider 내부에 존재해야 합니다.');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastInfo {
  id: number;
  message: string;
  date: Date;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const counter = useRef(0);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const addToast = (message: string) => {
    setToasts([...toasts, { id: counter.current, message, date: new Date() }]);
    counter.current += 1;
  };

  const removeToast = (id: number) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <ToastGroup>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastGroup>
      {children}
    </ToastContext.Provider>
  );
}
