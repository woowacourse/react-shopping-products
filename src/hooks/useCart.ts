import { useState } from "react";
import { CartItem, Product } from "../types/productType";
import postCartItems from "../api/postCartItems";
import deleteCartItems from "../api/deleteCartItems";
import getCartItems from "../api/getCartItems";

const CART_MAX_COUNT = 50;

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
    const { newErrorMessage: postErrorMessage } = await postCartItems(product);
    setErrorMessage(postErrorMessage);

    if (!postErrorMessage) {
      await syncCart();
    }
  };

  const removeFromCart = async (productId: number) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    if (!cartItem) {
      return;
    }

    const cartItemId = cartItem.id;
    const { newErrorMessage: deleteErrorMessage } = await deleteCartItems(
      cartItemId
    );
    setErrorMessage(deleteErrorMessage);

    if (!deleteErrorMessage) {
      await syncCart();
    }
  };

  const syncCart = async () => {
    const { data: cartData, newErrorMessage: getErrorMessage } =
      await getCartItems();
    setErrorMessage(getErrorMessage);
    const cartItems = cartData.content;
    setCart(cartItems);
  };

  return { cart, addToCart, removeFromCart, syncCart };
};

export default useCart;
