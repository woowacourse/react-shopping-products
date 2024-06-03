import { useContext } from "react";
import { ErrorContext, ErrorContextType } from "../context/ErrorContext";

export const useErrorContext = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useErrorContext must be used within an ErrorProvider");
  }
  return context;
};
