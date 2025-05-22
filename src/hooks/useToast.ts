import { useContext, useEffect, useRef } from 'react';
import { ToastContext } from '../context/ToastContext';
import { ToastvariantType } from '../components/common/Toast/Toast';

export function useToast(message: string | null | undefined, variant: ToastvariantType = 'error') {
  const toastContext = useContext(ToastContext);
  const prevMessageRef = useRef<string | null | undefined>(null);

  useEffect(() => {
    if (message && message !== prevMessageRef.current && toastContext) {
      toastContext.showToast({ text: message, variant });
      prevMessageRef.current = message;
    }
  }, [message, variant, toastContext]);
}
