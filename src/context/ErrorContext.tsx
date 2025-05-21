import { createContext, useContext, useState } from 'react';

type ErrorContextType = {
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  clearErrorMessage: () => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSetErrorMessage = (message: string) => {
    setErrorMessage(message);
  };

  const handleClearErrorMessage = () => {
    setErrorMessage('');
  };

  return (
    <ErrorContext.Provider
      value={{
        errorMessage,
        setErrorMessage: handleSetErrorMessage,
        clearErrorMessage: handleClearErrorMessage,
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
