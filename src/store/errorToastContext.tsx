import { createContext } from "react";
import useToast from "../hooks/useToast";
import Toast from "../components/common/Toast";

interface ErrorToastContextState {
  showToast: (message: string) => void;
}

export const ErrorToastContext = createContext<ErrorToastContextState>({
  showToast: () => {},
});

interface ErrorToastProviderProps {
  children: React.ReactNode;
}

export const ErrorToastProvider = ({ children }: ErrorToastProviderProps) => {
  const { toastMessage, showToast } = useToast();

  return (
    <ErrorToastContext.Provider value={{ showToast }}>
      {toastMessage && <Toast backgroundColor="#ffc9c9" message={toastMessage} />}
      {children}
    </ErrorToastContext.Provider>
  );
};
