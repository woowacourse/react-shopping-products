import { useEffect, useState } from "react";

const ERROR_MESSAGE = {
  CART: "장바구니 정보를 불러오는데 실패했습니다.",
  PRODUCTS: "상품 정보를 불러오는데 실패했습니다.",
  ADD: "장바구니 추가를 실패했습니다.",
  MINUS: "장바구니 삭제를 실패했습니다.",
};

let errorMessage = "";

function useError() {
  const [isError, setIsError] = useState(false);

  function setErrorTrue(errorType: keyof typeof ERROR_MESSAGE) {
    setIsError(true);
    errorMessage = ERROR_MESSAGE[errorType];
  }

  useEffect(() => {
    if (!isError) return;
    setTimeout(() => {
      setIsError(false);
    }, 5000);
  }, [isError]);

  return { isError, setErrorTrue, errorMessage };
}

export default useError;
