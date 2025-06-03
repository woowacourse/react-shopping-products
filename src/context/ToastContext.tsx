import React, { createContext, useContext, useState } from 'react';

interface ToastContextType {
  toastQueue: ToastType[];
  addToast: (message: string) => void;
  removeToast: (id: number) => void;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastType {
  id: number;
  message: string;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastQueue, setToastQueue] = useState<ToastType[]>([]);
  const addToast = (message: string) => {
    const newToast: ToastType = {
      id: Date.now(),
      message,
    };
    setToastQueue((prev) => [...prev, newToast]);
  };

  const removeToast = (id: number) => {
    setToastQueue((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toastQueue, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (context === null) {
    throw new Error(
      'useToastContext는 ToastProvider와 함께 사용되어야 합니다.'
    );
  }
  return context;
};
