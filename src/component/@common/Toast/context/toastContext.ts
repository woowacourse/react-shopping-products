import { createContext, useContext } from 'react';

type ToastContextType = {
  isVisible: boolean;
  openToast: (message: string, isOk: boolean) => void;
  closeToast: () => void;
  message: string;
  isSuccess: boolean;
};

export const ToastContext = createContext<ToastContextType>({
  isVisible: false,
  openToast: () => {},
  closeToast: () => {},
  message: '',
  isSuccess: false,
});

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
