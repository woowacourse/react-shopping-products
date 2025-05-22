import { useEffect, useMemo, useState } from "react";
import { CartItems } from "../types/cartItems";
import { CartItemsAPI } from "../apis/cartItems";
import { isErrorResponse } from "../utils/typeGuard";

type Props = React.Dispatch<React.SetStateAction<string>>;

interface UseCartItemsReturn {
  cartItemsCount: number;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  increaseItemQuantity: (productId: number) => Promise<void>;
  quantityByProductId: (productId: number) => number | undefined;
}

const useCartItems = (setErrorMessage: Props): UseCartItemsReturn => {
  const [cartItems, setCartItems] = useState<CartItems | null>(null);

  useEffect(() => {
    (async () => {
      const response = await CartItemsAPI.get();

      if (isErrorResponse(response)) {
        setErrorMessage(response.error);
        return;
      }

      setCartItems(response as CartItems);
    })();
  }, [setErrorMessage]);

  const cartItemIds = useMemo(
    () =>
      cartItems?.content.map((productInfo) => ({
        cartId: productInfo.id,
        productId: productInfo.product.id,
      })) ?? [],
    [cartItems?.content]
  );

  const cartItemsCount = cartItems?.content.length ?? 0;
  const allQuantities = cartItems?.content.map(({ id, quantity }) => ({
    productId: id,
    quantity: quantity,
  }));
  const quantityByProductId = (productId: number) =>
    allQuantities?.find((item) => item.productId === productId)?.quantity;

  const decreaseItemQuantity = async (productId: number) => {
    const currentProductId = cartItemIds.find(
      (productInfo) => productInfo.productId === productId
    );

    if (currentProductId) await CartItemsAPI.delete(currentProductId.cartId);

    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      setErrorMessage(response.error);
      return;
    }

    setCartItems(response as CartItems);
  };

  const increaseItemQuantity = async (productId: number) => {
    const currentProductId = cartItemIds.find(
      (productInfo) => productInfo.productId === productId
    );

    if (currentProductId) await CartItemsAPI.post(productId);

    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      setErrorMessage(response.error);
      return;
    }

    setCartItems(response as CartItems);
  };

  return {
    cartItemsCount,
    decreaseItemQuantity,
    increaseItemQuantity,
    quantityByProductId,
  };
};

export default useCartItems;
