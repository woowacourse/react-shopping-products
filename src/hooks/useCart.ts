import { useState, useEffect } from "react";
import { CartItem, Product } from "../types/productType";
import postCartItems from "../api/postCartItems";
import deleteCartItems from "../api/deleteCartItems";
import getCartItems from "../api/getCartItems";

export const CART_MAX_COUNT = 50;

const useCart = ({
  setErrorMessage,
}: {
  setErrorMessage: (errorMessage: string) => void;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = async (product: Product) => {
    if (cart.length > CART_MAX_COUNT) {
      setErrorMessage(
        `장바구니에 담을 수 있는 상품은 최대 ${CART_MAX_COUNT}개입니다.`
      );
      return;
    }
    const { error } = await postCartItems(product);
    setErrorMessage(error?.message || "");

    if (!error?.message) {
      await syncCart();
    }
  };

  const removeFromCart = async (productId: number) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    if (!cartItem) {
      return;
    }

    const cartItemId = cartItem.id;
    const { error } = await deleteCartItems(cartItemId);
    setErrorMessage(error?.message || "");

    if (!error?.message) {
      await syncCart();
    }
  };

  const syncCart = async () => {
    const { data: cartData, error } = await getCartItems();
    setErrorMessage(error?.message || "");
    const cartItems = cartData.content;
    setCart(cartItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      await syncCart();
    };

    fetchData();
  }, []);

  return { cart, addToCart, removeFromCart, syncCart };
};

export default useCart;
