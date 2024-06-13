import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import * as Styled from './Toast.styled';

import { ToastContext } from '@/context/toast';

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toastMessage, setToastMessage] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const error = useCallback((message: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setToastMessage('');
    }, 3000);

    setToastMessage(message);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={{ error }}>
      {children}
      {toastMessage &&
        createPortal(<Styled.ToastContainer>{toastMessage}</Styled.ToastContainer>, document.body)}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
