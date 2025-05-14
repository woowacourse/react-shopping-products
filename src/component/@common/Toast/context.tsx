import { createContext, useContext } from 'react';
import useOverlay from '../../../hook/useOverlay';

type ToastContextType = {
  isVisible: boolean;
  openToast: () => void;
  closeToast: () => void;
};

const ToastContext = createContext<ToastContextType>({
  isVisible: false,
  openToast: () => {},
  closeToast: () => {},
});

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isOpen: isVisible,
    open: openToast,
    close: closeToast,
  } = useOverlay();

  return (
    <ToastContext.Provider value={{ isVisible, openToast, closeToast }}>
      {children}
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
