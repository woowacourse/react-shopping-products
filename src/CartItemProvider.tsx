import { PropsWithChildren } from 'react';

import { CartItemsContext } from './context/cartItems';
import useAddCartItemQuery from './hooks/queries/cartItems/useAddCartItemQuery';
import useDeleteCartItemQuery from './hooks/queries/cartItems/useDeleteCartItemQuery';
import useFetchCartItemsQuery from './hooks/queries/cartItems/useFetchCartItemsQuery';
import { Product } from './types/product';

const CartItemProvider = ({ children }: PropsWithChildren) => {
  const { data: cartItems } = useFetchCartItemsQuery();
  const { mutate: addCartItem } = useAddCartItemQuery();
  const { mutate: deleteCartItem } = useDeleteCartItemQuery();

  const matchCartItem = (productId: number) => {
    return cartItems.find((cartItem) => cartItem.product.id === productId);
  };

  const handleAddCartItem = async (product: Product) => {
    addCartItem(product);
  };

  const handleDeleteCartItem = async (productId: number) => {
    const matchedCartItemInfo = matchCartItem(productId);
    const cartId = matchedCartItemInfo!.id;

    deleteCartItem(cartId);
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
