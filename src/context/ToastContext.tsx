import { createContext } from 'react';
import { ToastvariantType } from '../components/common/Toast/Toast';

export interface ToastContextType {
  showToast: (params: { text: string; variant: ToastvariantType }) => void;
}
export const ToastContext = createContext<ToastContextType | null>(null);
