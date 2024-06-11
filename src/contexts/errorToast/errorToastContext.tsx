import { createContext } from "react";
import useToast from "@hooks/useToast";
import Toast from "@components/common/Toast";

export interface ErrorToastContextState {
  showErrorToast: (error: Error) => void;
  showErrorMessageToast: (message: string) => void;
}

export const ErrorToastContext = createContext<ErrorToastContextState>({
  showErrorToast: () => {},
  showErrorMessageToast: () => {},
});

interface ErrorToastProviderProps {
  children: React.ReactNode;
}

export const ErrorToastProvider = ({ children }: ErrorToastProviderProps) => {
  const { toastMessage, showToast } = useToast();

  const showErrorToast = (error: Error) => {
    showToast(error.message);
  };

  return (
    <ErrorToastContext.Provider value={{ showErrorToast, showErrorMessageToast: showToast }}>
      {toastMessage && <Toast backgroundColor="#ffc9c9" message={toastMessage} />}
      {children}
    </ErrorToastContext.Provider>
  );
};
