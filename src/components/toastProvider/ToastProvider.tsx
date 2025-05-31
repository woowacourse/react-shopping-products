import { ReactNode, useState } from "react";
import { ToastContext } from "../../context/toastContext";
import { createPortal } from "react-dom";
import ErrorToast from "../errorToast/ErrorToast";

const ERROR_MESSAGE = {
  CART: "장바구니 정보를 불러오는데 실패했습니다.",
  PRODUCTS: "상품 정보를 불러오는데 실패했습니다.",
  ADD: "장바구니 추가를 실패했습니다.",
  MINUS: "장바구니 삭제를 실패했습니다.",
  CART_MAX: "장바구니는 50개까지 가능합니다.",
};

const TOAST_TIME = 3000;

export type ERROR_TYPE = keyof typeof ERROR_MESSAGE;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");

  const showToast = (type: ERROR_TYPE) => {
    setMessage(ERROR_MESSAGE[type]);
    setTimeout(() => setMessage(""), TOAST_TIME);
  };

  const renderLocation = document.querySelector(".container") ?? document.body;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(<ErrorToast errorMessage={message} />, renderLocation)}
    </ToastContext.Provider>
  );
}
