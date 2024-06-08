import { createContext, useState } from 'react';
import { createPortal } from 'react-dom';

import * as Styled from './Toast.styled';

interface ToastContextType {
  toastError: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [isToast, setIsToast] = useState(false);
  const [message, setMessage] = useState('');

  const toastError = (message: string) => {
    setMessage(message);
    setIsToast(true);
    setTimeout(() => {
      setIsToast(false);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toastError }}>
      {children}
      {isToast &&
        createPortal(<Styled.ToastContainer>{message}</Styled.ToastContainer>, document.body)}
    </ToastContext.Provider>
  );
};
