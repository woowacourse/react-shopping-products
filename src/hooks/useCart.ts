import { Product } from "../types/productType";
import postCartItems from "../api/postCartItems";
import deleteCartItems from "../api/deleteCartItems";
import patchCartItemQuantity from "../api/patchCartItemQuantity";

export const CART_MAX_COUNT = 50;

const useCart = ({
  setErrorMessage,
  refetch,
}: {
  setErrorMessage: (errorMessage: string) => void;
  refetch: () => void;
}) => {
  const addToCart = async (product: Product, cartCount: number) => {
    if (cartCount + 1 > CART_MAX_COUNT) {
      setErrorMessage(
        `장바구니에 담을 수 있는 상품은 최대 ${CART_MAX_COUNT}개입니다.`
      );
      return;
    }

    const { error } = await postCartItems(product);

    if (!error?.message) {
      setErrorMessage("");
      return refetch();
    }

    setErrorMessage(error.message);
  };

  const patchQuantity = async (id: number, quantity: number) => {
    const { error } = await patchCartItemQuantity(id, quantity);
    setErrorMessage(error?.message || "");

    if (!error?.message) {
      setErrorMessage("");
      return refetch();
    }

    setErrorMessage(error.message);
  };

  const removeFromCart = async (productId: number) => {
    const { error } = await deleteCartItems(productId);

    if (!error?.message) {
      setErrorMessage("");
      return refetch();
    }

    setErrorMessage(error.message);
  };

  return { addToCart, removeFromCart, patchQuantity };
};

export default useCart;
