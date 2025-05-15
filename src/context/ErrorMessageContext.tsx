import { createContext } from 'react';

interface ErrorMessageContextProps {
  children: React.ReactNode;
  errorMessage: string;
  handleErrorMessage: (errorMessage: string) => void;
}

interface ErrorMessageContextType {
  errorMessage: string;
  handleErrorMessage: (errorMessage: string) => void;
}

export const ErrorMessageContext = createContext<ErrorMessageContextType | null>(null);

export const ErrorMessageProvider = ({
  errorMessage,
  handleErrorMessage,
  children,
}: ErrorMessageContextProps) => {
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
