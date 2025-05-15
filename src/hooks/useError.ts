import { useEffect, useState, useCallback } from "react";

const ERROR_MESSAGE = {
  CART: "장바구니 정보를 불러오는데 실패했습니다.",
  PRODUCTS: "상품 정보를 불러오는데 실패했습니다.",
  ADD: "장바구니 추가를 실패했습니다.",
  MINUS: "장바구니 삭제를 실패했습니다.",
  CART_MAX: "장바구니는 50개까지 가능합니다.",
};

export type ERROR_TYPE = keyof typeof ERROR_MESSAGE;

function useError() {
  const [errorMessage, setErrorMessage] = useState("");

  const setErrorTrue = useCallback(function setErrorTrue(
    errorType: ERROR_TYPE
  ) {
    setErrorMessage(ERROR_MESSAGE[errorType]);
  },
  []);

  useEffect(() => {
    if (errorMessage) return;
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }, [errorMessage]);

  return {
    isError: Boolean(errorMessage),
    setErrorTrue,
    errorMessage,
  };
}

export default useError;
