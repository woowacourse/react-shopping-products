import { ReactNode, useCallback, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { createContext } from "react";
import ErrorToast from "../components/errorToast/ErrorToast";

const ERROR_MESSAGE = {
  CART: "장바구니 정보를 불러오는데 실패했습니다.",
  PRODUCTS: "상품 정보를 불러오는데 실패했습니다.",
  ADD: "장바구니 추가를 실패했습니다.",
  MINUS: "장바구니 삭제를 실패했습니다.",
  CART_MAX: "장바구니는 50개까지 가능합니다.",
  CART_QUANTITY: "존재하는 수량보다 많이 담을 수 없습니다.",
};

const TOAST_TIME = 3000;

export type ERROR_TYPE = keyof typeof ERROR_MESSAGE;

interface ToastContextType {
  showToast: (type: ERROR_TYPE) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");

  const showToast = useCallback((type: ERROR_TYPE) => {
    setMessage(ERROR_MESSAGE[type]);
    setTimeout(() => setMessage(""), TOAST_TIME);
  }, []);

  const renderLocation = document.querySelector(".container") ?? document.body;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(<ErrorToast errorMessage={message} />, renderLocation)}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast는 ToastProvider 안에서만 사용할 수 있습니다.");
  }
  return context;
};
