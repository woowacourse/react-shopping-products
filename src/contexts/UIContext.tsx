import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  error: boolean;
  setError: (v: boolean) => void;
  errorMessage: string;
  setErrorMessage: (msg: string) => void;
}

const UIContext = createContext<UIContextType | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  );

  return (
    <UIContext.Provider
      value={{ error, setError, errorMessage, setErrorMessage }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context)
    throw new Error("useUIContext는 UIProvider 내에서 사용해주세요.");
  return context;
};
