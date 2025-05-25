import { createContext, PropsWithChildren, useState } from "react";

interface ErrorState {
  isError: boolean;
  errorMessage: string;
}

const INITIAL_ERROR: ErrorState = {
  isError: false,
  errorMessage: "",
};

interface ErrorContextType {
  error: ErrorState;
  handleError: (error: ErrorState) => void;
}

export const ErrorContext = createContext<ErrorContextType>({
  error: INITIAL_ERROR,
  handleError: () => {},
});

export const ErrorProvider = ({ children }: PropsWithChildren) => {
  const [error, setError] = useState<ErrorState>(INITIAL_ERROR);

  const handleError = (newError: ErrorState) => {
    setError(newError);
    setTimeout(() => {
      setError(INITIAL_ERROR);
    }, 3000);
  };

  return (
    <ErrorContext.Provider value={{ error, handleError }}>
      {children}
    </ErrorContext.Provider>
  );
};
