import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import ErrorToast from "../components/ErrorToast/ErrorToast";

interface ErrorContextType {
  showError: (error: Error | null) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorContextProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<Error | null>(null);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showError = useCallback((err: Error | null) => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setError(err);
    if (err) {
      timer.current = setTimeout(() => {
        setError(null);
        timer.current = null;
      }, 2000);
    }
  }, []);
  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {error && <ErrorToast error={error} />}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => {
  const errorContext = useContext(ErrorContext);
  if (errorContext === undefined) {
    throw new Error("useErrorContext는 프로바이더 안쪽에 위치를 해야 합니다.");
  }
  return errorContext;
};
