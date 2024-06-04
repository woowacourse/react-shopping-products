import { PropsWithChildren, createContext, useCallback, useState } from 'react';
import ErrorToast from '../components/common/ErrorToast';

interface ToastContextProps {
  showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = useCallback((message: string) => {
    setMessage(message);
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isOpen && <ErrorToast message={message} />}
    </ToastContext.Provider>
  );
};
