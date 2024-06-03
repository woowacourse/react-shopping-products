import { createContext } from 'react';

interface ToastContext {
  isShow: boolean;
  error: (message: string) => void;
}

export const ToastContext = createContext<ToastContext | null>(null);
