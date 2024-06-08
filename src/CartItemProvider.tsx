import { PropsWithChildren } from 'react';

import { CartItemsContext } from './context/cartItems';
import useAddCartItemQuery from './hooks/queries/cartItems/useAddCartItemQuery';
import useDeleteCartItemQuery from './hooks/queries/cartItems/useDeleteCartItemQuery';
import useFetchCartItemsQuery from './hooks/queries/cartItems/useFetchCartItemsQuery';

const CartItemProvider = ({ children }: PropsWithChildren) => {
  const { data: cartItems } = useFetchCartItemsQuery();
  const { mutate: addCartItem } = useAddCartItemQuery();
  const { mutate: deleteCartItem } = useDeleteCartItemQuery();

  const matchCartItem = (productId: number) => {
    return cartItems.find((cartItem) => cartItem.product.id === productId);
  };

  const handleAddCartItem = async (productId: number) => {
    addCartItem({ productId });
  };

  const handleDeleteCartItem = async (productId: number) => {
    const matchedCartItemInfo = matchCartItem(productId);
    const cartItemId = matchedCartItemInfo!.id;

    deleteCartItem(cartItemId);
  };

  return (
    <CartItemsContext.Provider
      value={{ cartItems, matchCartItem, handleAddCartItem, handleDeleteCartItem }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemProvider;
