import { createContext, useContext, useState, useRef } from 'react';

type ErrorContextType = {
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  clearErrorMessage: () => void;
  showTemporaryError: (message: string, duration?: number) => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetErrorMessage = (message: string) => {
    setErrorMessage(message);
  };

  const handleClearErrorMessage = () => {
    setErrorMessage('');
  };

  const handleShowTemporaryError = (message: string, duration: number = 3000) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setErrorMessage(message);

    timerRef.current = setTimeout(() => {
      setErrorMessage('');
      timerRef.current = null;
    }, duration);
  };

  return (
    <ErrorContext.Provider
      value={{
        errorMessage,
        setErrorMessage: handleSetErrorMessage,
        clearErrorMessage: handleClearErrorMessage,
        showTemporaryError: handleShowTemporaryError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
