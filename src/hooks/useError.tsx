import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const ERROR_MESSAGE = {
  CART: "장바구니 정보를 불러오는데 실패했습니다.",
  PRODUCTS: "상품 정보를 불러오는데 실패했습니다.",
  ADD: "장바구니 추가를 실패했습니다.",
  MINUS: "장바구니 삭제를 실패했습니다.",
  CART_MAX: "장바구니는 50개까지 가능합니다.",
  CART_ADD: "재고 수량을 초과하여 담을 수 없습니다.",
};

export type ERROR_TYPE = keyof typeof ERROR_MESSAGE;

interface ErrorContextType {
  isError: boolean;
  errorMessage: string;
  setErrorTrue: (errorType: ERROR_TYPE) => void;
}

const ErrorContext = createContext<ErrorContextType | null>(null);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [errorMessage, setErrorMessage] = useState("");

  const setErrorTrue = useCallback((errorType: ERROR_TYPE) => {
    setErrorMessage(ERROR_MESSAGE[errorType]);
  }, []);

  useEffect(() => {
    if (!errorMessage) return;
    const timeout = setTimeout(() => {
      setErrorMessage("");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);

  return (
    <ErrorContext.Provider
      value={{
        isError: Boolean(errorMessage),
        errorMessage,
        setErrorTrue,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) throw new Error("ErrorProvider로 감싸야 합니다.");
  return context;
}
