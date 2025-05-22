import { useEffect, useMemo, useState } from "react";
import { CartItems } from "../types/cartItems";
import { CartItemsAPI } from "../apis/cartItems";
import { isErrorResponse } from "../utils/typeGuard";

type Props = React.Dispatch<React.SetStateAction<string>>;

interface UseCartItemsReturn {
  cartItemsCount: number;
  quantityByProductId: (productId: number) => number;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  increaseItemQuantity: (productId: number) => Promise<void>;
  addProductInCart: (productId: number) => Promise<void>;
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
  const allQuantities =
    cartItems?.content.map((productInfo) => ({
      cartId: productInfo.id,
      productId: productInfo.product.id,
      quantity: productInfo.quantity,
    })) ?? [];

  const quantityByCartId = (cartId: number) =>
    allQuantities.find((item) => item.cartId === cartId)?.quantity ?? 0;
  const quantityByProductId = (productId: number) =>
    allQuantities.find((item) => item.productId === productId)?.quantity ?? 0;

  const decreaseItemQuantity = async (productId: number) => {
    const currentProductId = cartItemIds.find(
      (productInfo) => productInfo.productId === productId
    );

    if (!currentProductId) return;
    await CartItemsAPI.patch(
      currentProductId.cartId,
      quantityByCartId(currentProductId.cartId) - 1
    );

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

    if (!currentProductId) return;
    await CartItemsAPI.patch(
      currentProductId.cartId,
      quantityByCartId(currentProductId.cartId) + 1
    );

    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      setErrorMessage(response.error);
      return;
    }

    setCartItems(response as CartItems);
  };

  const addProductInCart = async (productId: number) => {
    await CartItemsAPI.post(productId);

    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      setErrorMessage(response.error);
      return;
    }

    setCartItems(response as CartItems);
  };

  return {
    cartItemsCount,
    quantityByProductId,
    decreaseItemQuantity,
    increaseItemQuantity,
    addProductInCart,
  };
};

export default useCartItems;
