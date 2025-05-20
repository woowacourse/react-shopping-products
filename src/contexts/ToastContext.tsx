import { createContext, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Toast, { ToastVarientType } from '../components/common/Toast/Toast';

type ToastData = {
  text: string;
  varient: ToastVarientType;
};

type ToastContextType = {
  toast: ToastData | undefined;
  setToast: (toast: ToastData | undefined) => void;
};

export const ToastContext = createContext<ToastContextType>({
  toast: undefined,
  setToast: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastData | undefined>(undefined);
  const portalElement = document.getElementById('toast-root') || document.body;

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
      {toast && createPortal(<Toast text={toast.text} varient={toast.varient} />, portalElement)}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
