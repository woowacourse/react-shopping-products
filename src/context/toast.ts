import { createContext } from 'react';

interface ToastContext {
  error: (message: string) => void;
}

export const ToastContext = createContext<ToastContext | null>(null);
