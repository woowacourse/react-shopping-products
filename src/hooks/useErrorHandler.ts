import { useCallback, useEffect, useRef } from 'react';
import useDataContext from './useDataContext';

const useErrorHandler = () => {
  const { errorMessage, setErrorMessage } = useDataContext();
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isShowingMessageRef = useRef(false);

  const handleErrorMessage = useCallback((newErrorMessage: string) => {
    if (isShowingMessageRef.current) {
      return;
    }

    setErrorMessage(newErrorMessage);
    isShowingMessageRef.current = true;

    timerIdRef.current = setTimeout(() => {
      setErrorMessage('');
      timerIdRef.current = null;
      isShowingMessageRef.current = false;
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  return {
    errorMessage,
    handleErrorMessage,
  };
};

export default useErrorHandler;
