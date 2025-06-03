import { createContext, useState, useContext, ReactNode } from 'react';

interface ToastMessage {
  message: string;
  id: number;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { message, id }]);
  };

  return <ToastContext.Provider value={{ toasts, showToast }}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
