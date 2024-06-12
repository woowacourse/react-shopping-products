import { createContext } from "react";

export type ErrorState = Error | null;

interface ErrorContextType {
  error: ErrorState;
  setError: (error: ErrorState) => void;
}

export const ErrorContext = createContext<ErrorContextType>({
  error: null,
  setError: () => {},
});
