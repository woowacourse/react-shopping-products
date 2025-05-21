import { createContext, useEffect, useRef, useState } from 'react';

interface ErrorMessageContextProps {
  children: React.ReactNode;
}

interface ErrorMessageContextType {
  errorMessage: string;
  handleErrorMessage: (errorMessage: string) => void;
}

export const ErrorMessageContext = createContext<ErrorMessageContextType | null>(null);

export const ErrorMessageProvider = ({ children }: ErrorMessageContextProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isShowingMessageRef = useRef(false);

  const handleErrorMessage = (newErrorMessage: string) => {
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
  };

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  return (
    <ErrorMessageContext.Provider
      value={{
        errorMessage,
        handleErrorMessage,
      }}
    >
      {children}
    </ErrorMessageContext.Provider>
  );
};
