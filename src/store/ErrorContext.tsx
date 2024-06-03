import { createContext, Dispatch, SetStateAction } from 'react';

interface ErrorContextType {
  error: Error | null;
  setError: Dispatch<SetStateAction<Error | null>>;
}
export const ErrorContext = createContext<ErrorContextType | null>(null);
