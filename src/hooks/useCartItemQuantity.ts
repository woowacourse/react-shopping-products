import { useState, useEffect } from "react";
import updateCartItemQuantity from "../APIs/shoppingCart/updateCartItemQuantity";
import deleteShoppingCart from "../APIs/shoppingCart/deleteShoppingCart";
import { useAPIContext } from "../contexts/API/useAPIContext";
import getShoppingCart from "../APIs/shoppingCart/getShoppingCart";
import { useErrorContext } from "../contexts/Error/ErrorContext";
import { CartItem } from "../types/product.type";

export function useCartItemQuantity(cartItem?: CartItem | null) {
  const { handleError } = useErrorContext();
  const { refetch: refetchCart } = useAPIContext({
    name: "cartItems",
    fetcher: () => getShoppingCart({ endpoint: "/cart-items" }),
  });
  const product = cartItem?.product;

  const [localQuantity, setLocalQuantity] = useState(cartItem?.quantity || 1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cartItem?.quantity !== undefined) {
      setLocalQuantity(cartItem.quantity);
    }
  }, [cartItem?.quantity]);

  const updateQuantity = async (newQuantity: number) => {
    if (!product) return;
    setIsLoading(true);
    try {
      if (newQuantity > product.quantity)
        throw new Error(`현재 남은 수량은 ${product.quantity}개 입니다.`);

      await updateCartItemQuantity({
        endpoint: `/cart-items/${cartItem.id}`,
        requestBody: { quantity: newQuantity },
      });
      setLocalQuantity(newQuantity);
      refetchCart();
    } catch (err) {
      console.log(err);
      handleError({
        isError: true,
        errorMessage: `현재 남은 수량은 ${product.quantity}개 입니다.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!cartItem) return;
    setIsLoading(true);
    try {
      await deleteShoppingCart({
        endpoint: "/cart-items",
        cartItemId: cartItem.id,
      });
      refetchCart();
    } catch (err) {
      handleError({
        isError: true,
        errorMessage: "장바구니에서 삭제하지 못했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnDecrease = () => {
    if (localQuantity > 1) {
      updateQuantity(localQuantity - 1);
    } else {
      handleDelete();
    }
  };

  const handleOnIncrease = () => {
    if (!product) return;
    if (localQuantity < product.quantity) {
      updateQuantity(localQuantity + 1);
    } else {
      handleError({
        isError: true,
        errorMessage: "최대 수량을 초과하였습니다.",
      });
    }
  };

  return {
    localQuantity,
    handleOnIncrease,
    handleOnDecrease,
    handleDelete,
    isLoading,
  };
}
