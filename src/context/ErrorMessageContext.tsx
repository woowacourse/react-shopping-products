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
  const handleErrorMessage = (newErrorMessage: string) => {
    if (errorMessage.length !== 0) {
      return;
    }

    setErrorMessage(newErrorMessage);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
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
