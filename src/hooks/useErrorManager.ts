import { useState, useMemo } from "react";

interface UseErrorManagerProps {
  productError: string;
  setProductError: (msg: string) => void;
  cartFetchError: string;
  refreshCartItems: () => void;
}

const useErrorManager = ({
  productError,
  setProductError,
  cartFetchError,
  refreshCartItems,
}: UseErrorManagerProps) => {
  const [cartHandlerError, setCartHandlerError] = useState<string>("");

  const displayError = useMemo(() => {
    if (productError) {
      return {
        message: productError,
        clear: () => setProductError(""),
      };
    }
    if (cartFetchError) {
      return {
        message: cartFetchError,
        clear: () => refreshCartItems(),
      };
    }
    if (cartHandlerError) {
      return {
        message: cartHandlerError,
        clear: () => setCartHandlerError(""),
      };
    }
    return null;
  }, [
    productError,
    cartFetchError,
    cartHandlerError,
    setProductError,
    refreshCartItems,
  ]);

  return {
    cartHandlerError: setCartHandlerError,
    displayError,
  };
};

export default useErrorManager;
