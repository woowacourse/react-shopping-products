import { deleteCartItem, getCartItems, postCartItem } from "@/apis/cartItem";
import { ERROR_MESSAGES } from "@/constants/messages";
import useToast from "@/hooks/useToast";
import { CartItemContext, CartItemDispatchContext } from "@/provider/cartItemProvider";
import { useContext, useState } from "react";

const useHandleCartItem = () => {
  const cartItems = useContext(CartItemContext);
  const setCartItems = useContext(CartItemDispatchContext);
  const [loading, setLoading] = useState(false);
  const { onAddToast } = useToast();

  const MAX_CART_COUNT = 20;

  const onAddCartItem = async (id: number) => {
    if (cartItems.length === MAX_CART_COUNT) return onAddToast(ERROR_MESSAGES.failPushCart);

    try {
      setLoading(true);

      await postCartItem({ productId: id, quantity: 1 });
      const fetchedItems = await getCartItems();
      setCartItems(fetchedItems);
    } catch (error) {
      onAddToast(ERROR_MESSAGES.failPostCartItem);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteCartItem = async (id: number) => {
    const targetItem = cartItems.find((cartItem) => cartItem.product.id === id);
    try {
      setLoading(true);
      await deleteCartItem({ itemId: targetItem!.id });
      setCartItems((cartItems) => cartItems.filter((item) => item !== targetItem));
    } catch (error) {
      onAddToast(ERROR_MESSAGES.failDeleteCartItem);
    } finally {
      setLoading(false);
    }
  };

  const isInCart = (id: number) => {
    return cartItems.some((item) => item.product.id === id);
  };

  const onClickCartItem = (id: number) => {
    if (isInCart(id)) {
      onDeleteCartItem(id);
    } else {
      onAddCartItem(id);
    }
  };

  return { onClickCartItem, isInCart, loading, cartItems };
};

export default useHandleCartItem;
