import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";

type ErrorMessageContextType = {
  errorMessage: string;
  handleErrorMessage: (value: string) => void;
};

export const ErrorMessageContext = createContext<
  ErrorMessageContextType | undefined
>(undefined);

export const ErrorMessageProvider = ({ children }: { children: ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => setErrorMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleErrorMessage = useCallback((newErrorMessage: string) => {
    setErrorMessage(newErrorMessage);
  }, []);

  return (
    <ErrorMessageContext.Provider value={{ errorMessage, handleErrorMessage }}>
      {children}
    </ErrorMessageContext.Provider>
  );
};

export const useErrorMessageContext = () => {
  const context = useContext(ErrorMessageContext);
  if (!context) {
    throw new Error(
      "useErrorMessageContext는 ErrorMessageProvider 안에서 사용해야 합니다."
    );
  }
  return context;
};
