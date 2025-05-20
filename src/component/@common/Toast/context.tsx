import { createContext, useContext, useState } from 'react';
import useOverlay from '../../../hook/useOverlay';
import Toast from '.';

type ToastContextType = {
  isVisible: boolean;
  openToast: (message: string, isOk: boolean) => void;
  closeToast: () => void;
  message: string;
  isSuccess: boolean;
};

const ToastContext = createContext<ToastContextType>({
  isVisible: false,
  openToast: () => {},
  closeToast: () => {},
  message: '',
  isSuccess: false,
});

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOpen: isVisible, open, close } = useOverlay();
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);

  const openToast = (message: string, isOk: boolean) => {
    setMessage(message);
    setIsSuccess(isOk);
    open();
  };

  const closeToast = () => {
    setMessage('');
    setIsSuccess(false);
    close();
  };

  return (
    <ToastContext.Provider
      value={{ isVisible, openToast, closeToast, message, isSuccess }}
    >
      {children}
      {isVisible && <Toast />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;
