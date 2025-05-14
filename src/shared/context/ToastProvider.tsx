import { createContext, PropsWithChildren, useState } from 'react';

import { Toast } from '../components/Toast';

export const ToastContext = createContext({ showToast(message: string) {} });

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toast, setToast] = useState('');

  const showToast = (message: string) => {
    setToast(message);

    const timer = setTimeout(() => {
      setToast('');
    }, 3000);

    clearTimeout(timer);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children} {toast && <Toast message={toast} />}
    </ToastContext.Provider>
  );
};
