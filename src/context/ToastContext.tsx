import { createContext, useState, useContext, ReactNode, useCallback, useRef } from 'react';

interface ToastMessage {
  message: string;
  id: number;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const DEFAULT_DURATION = 3000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastIdCounter = useRef(0);

  const showToast = useCallback((message: string, duration: number = DEFAULT_DURATION) => {
    const id = ++toastIdCounter.current;
    setToasts((prevToasts) => [...prevToasts, { message, id }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  return <ToastContext.Provider value={{ toasts, showToast }}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
