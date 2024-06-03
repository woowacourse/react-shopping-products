import { createContext } from 'react';

interface ToastContext {
  isError: boolean;
  error: (message: string) => void;
}

export const ToastContext = createContext<ToastContext | null>(null);
