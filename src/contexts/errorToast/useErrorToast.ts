import { useContext } from "react";
import { ErrorToastContext, ErrorToastContextState } from "@contexts/errorToast/errorToastContext";

export const useErrorToast = (): ErrorToastContextState => {
  const context = useContext(ErrorToastContext);

  if (context === undefined) {
    throw new Error("useErrorToast는 ErrorToastProvider 안에서 사용되어야 합니다.");
  }

  return context;
};
