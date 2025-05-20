import { useCallback, useMemo, useState } from 'react';

import useOverlay from '../../../../hook/useOverlay';
import { ToastContext } from './toastContext';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOpen: isVisible, open, close } = useOverlay();
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);

  const openToast = useCallback(
    (message: string, isOk: boolean) => {
      setMessage(message);
      setIsSuccess(isOk);
      open();
    },
    [open]
  );

  const closeToast = useCallback(() => {
    setMessage('');
    setIsSuccess(false);
    close();
  }, [close]);

  const contextValue = useMemo(
    () => ({
      isVisible,
      openToast,
      closeToast,
      message,
      isSuccess,
    }),
    [isVisible, openToast, closeToast, message, isSuccess]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
