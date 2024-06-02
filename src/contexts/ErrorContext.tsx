import { ReactNode, createContext, useState } from 'react';

interface ErrorContextType {
  error: Error | null;
  setError: (error: Error | null) => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const ErrorProvider = ({ children }: Props) => {
  const [error, setError] = useState<Error | null>(null);

  const value: ErrorContextType = { error, setError };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
