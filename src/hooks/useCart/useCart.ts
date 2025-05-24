import { useCallback, useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import { CartItem } from "../useFetchCartProducts/index.types";
import { fetchCartItems } from "../../api/cart";

export default function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider 내부에서 사용해야 합니다.");
  const { cartItems, setCartItems, setCartItemIds, cartItemIds } = context;

  function setCartQuantity({
    cartId,
    quantity,
  }: {
    cartId: number;
    quantity: number;
  }) {
    let copy;
    let cartItem;
    if (cartItems) {
      copy = [...cartItems];
      cartItem = copy?.find((data) => data.id === cartId);
    }
    if (cartItem) {
      cartItem.quantity = quantity;
      if (copy) {
        setCartItems(copy);
      }
    }
  }

  function getCartQuantity({ cartId }: { cartId: number }) {
    const cartItem = cartItems?.find((data) => data.id === cartId);
    return cartItem?.quantity;
  }

  const setData = useCallback(async () => {
    const data = await fetchCartItems();
    setCartItems(data);
    if (data) {
      setCartItemIds(
        data.map((data: CartItem) => {
          return { productId: data.product.id, cartId: data.id };
        })
      );
    }
  }, [setCartItems, setCartItemIds]);

  useEffect(() => {
    setData();
  }, [setData]);

  return {
    cartItems,
    setCartItems,
    refetchCartItems: setData,
    cartItemIds,
    setCartItemIds,
    getCartQuantity,
    setCartQuantity,
  };
}
