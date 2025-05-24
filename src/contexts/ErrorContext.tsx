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
  showError: (error: Error | string | null) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorContextProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<{
    message: string;
    timestamp: number;
  } | null>(null);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showError = useCallback((err: Error | string | null) => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    if (!err) {
      setError(null);
      return;
    }

    const message = err instanceof Error ? err.message : err;
    const timestamp = Date.now();

    setError({ message, timestamp });

    // 2초 후 에러 제거
    timer.current = setTimeout(() => {
      setError(null);
      timer.current = null;
    }, 2000);
  }, []);

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {error && (
        <ErrorToast
          key={error.timestamp}
          message={error.message}
          onClose={() => setError(null)}
        />
      )}
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
