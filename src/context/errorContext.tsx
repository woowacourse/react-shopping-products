import { createContext, useContext, useState, ReactNode } from "react";

interface ErrorContextType {
  errorStatus: number | null;
  setErrorStatus: (status: number | null) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  return (
    <ErrorContext.Provider value={{ errorStatus, setErrorStatus }}>
      {children}
    </ErrorContext.Provider>
  );
};
