import React, { createContext, useContext, useState } from 'react';

interface ToastContextType {
  toast: ToastType;
  showToast: (message: string) => void;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastType {
  isToast: boolean;
  message: string;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastType>({
    isToast: false,
    message: '',
  });

  const showToast = (message: string) => {
    setToast({ isToast: true, message });
    setTimeout(() => {
      setToast({ isToast: false, message: '' });
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
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
