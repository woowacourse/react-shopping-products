import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

import Toast from '@components/common/Toast/Toast';

export const ToastContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showToast: (error: unknown) => {},
});

export const useToastContext = () => {
  const value = useContext(ToastContext);

  if (!value) throw new Error('provider가 필요합니다.');
  return value;
};

const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [isOpenToast, setIsOpenToast] = useState(false);
  const [isRemove, setIsRemove] = useState(true);

  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const showToast = useCallback((error: unknown) => {
    if (!(error instanceof Error)) return;

    setIsRemove(false);
    setIsOpenToast(true);
    setMessage(error.message);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    const timer = setTimeout(() => {
      setIsOpenToast(false);
      setTimeout(() => {
        setMessage('');
        setIsRemove(true);
      }, 500);
    }, 1000);

    toastTimer.current = timer;
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {!isRemove && <Toast isOpen={isOpenToast} message={message} />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
