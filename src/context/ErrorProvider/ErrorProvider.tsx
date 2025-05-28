import { createContext, useContext, useState, ReactNode } from "react";

const ErrorContext = createContext({
  errorMessage: "",
  showError: (message: string) => {
    console.log("showError", message);
  },
  hideError: () => {},
});

export default function ErrorProvider({ children }: { children: ReactNode }) {
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message: string) => setErrorMessage(message);
  const hideError = () => setErrorMessage("");

  return <ErrorContext.Provider value={{ errorMessage, showError, hideError }}>{children}</ErrorContext.Provider>;
}

export function useError() {
  return useContext(ErrorContext);
}
