import { useState, PropsWithChildren, createContext } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/common/Toast/Toast';

interface Toast {
  message: string;
}

interface ToastContextType {
  setToast: React.Dispatch<React.SetStateAction<Toast | null>>;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export function ToastContextProvider({ children }: PropsWithChildren) {
  const [toast, setToast] = useState<Toast | null>(null);

  return (
    <ToastContext.Provider value={{ setToast }}>
      {children}
      {toast && createPortal(<ToastComponent toast={toast} />, document.body)}
    </ToastContext.Provider>
  );
}

const ToastComponent: React.FC<{ toast: Toast }> = ({ toast }) => {
  return <Toast>{toast.message}</Toast>;
};
