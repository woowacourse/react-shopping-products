import { useCallback, useContext, useRef } from 'react';
import { ToastVarientType } from '../components/common/Toast/Toast';
import { ToastContext } from '../contexts/ToastContext';

export const useToast = () => {
  const { toast, setToast } = useContext(ToastContext);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openToast = useCallback(
    (text: string, varient: ToastVarientType) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setToast({ text, varient });
      timeoutRef.current = setTimeout(() => {
        setToast(undefined);
      }, 3000);
    },
    [setToast],
  );

  return { toast, openToast };
};
