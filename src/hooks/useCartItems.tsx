import { useEffect, useMemo, useState } from "react";
import { CartItems } from "../types/cartItems";
import { CartItemsAPI } from "../apis/cartItems";
import { isErrorResponse } from "../utils/typeGuard";
import useToast from "./useToast";

interface UseCartItemsReturn {
  cartItemsCount: number;
  quantityByProductId: (productId: number) => number;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  increaseItemQuantity: (productId: number) => Promise<void>;
  addProductInCart: (productId: number) => Promise<void>;
  deleteProductInCart: (productId: number) => Promise<void>;
  totalPriceInCart: number;
  productIdsInCart: number[];
}

const useCartItems = (): UseCartItemsReturn => {
  const [cartItems, setCartItems] = useState<CartItems | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    (async () => {
      const response = await CartItemsAPI.get();

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

      setCartItems(response as CartItems);
    })();
  }, []);

  const cartItemIds = useMemo(
    () =>
      cartItems?.content.map((productInfo) => ({
        cartId: productInfo.id,
        productId: productInfo.product.id,
      })) ?? [],
    [cartItems?.content]
  );

  const productIdsInCart = useMemo(
    () => cartItems?.content.map((productInfo) => productInfo.product.id) ?? [],
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

  const totalPriceInCart =
    cartItems?.content.reduce((total, productInfo) => {
      const price = productInfo.product?.price ?? 0;
      const quantity = productInfo.quantity ?? 0;
      return total + price * quantity;
    }, 0) ?? 0;

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
      showToast(response.error);
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
      showToast(response.error);
      return;
    }

    setCartItems(response as CartItems);
  };

  const addProductInCart = async (productId: number) => {
    await CartItemsAPI.post(productId);

    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      showToast(response.error);
      return;
    }

    setCartItems(response as CartItems);
  };

  const deleteProductInCart = async (productId: number) => {
    const currentProductId = cartItemIds.find(
      (productInfo) => productInfo.productId === productId
    );

    if (!currentProductId) return;
    await CartItemsAPI.delete(currentProductId.cartId);

    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      showToast(response.error);
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
    deleteProductInCart,
    totalPriceInCart,
    productIdsInCart,
  };
};

export default useCartItems;
