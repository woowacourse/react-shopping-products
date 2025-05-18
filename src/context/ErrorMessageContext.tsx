import { createContext, useState } from 'react';

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
  const handleErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

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
