import { renderHook } from '@testing-library/react';
import useShoppingCart from '../../src/hooks/cartItem/useShoppingCart';
import usePostShoppingCart from '../../src/queries/shoppingCart/usePostShoppingCart';
import useDeleteCartItem from '../../src/hooks/cartItem/useDeleteCartItem';
import useUpdateItemQuantity from '../../src/hooks/cartItem/useUpdateItemQuantity';
import { wrapper } from './createProductsRenderHook';

export const createShoppingCartRenderHook = () =>
  renderHook(
    () => {
      const { cartItems, addedShoppingCartLength } = useShoppingCart();
      const { addShoppingCart } = usePostShoppingCart(() => {});
      const { deleteShoppingCartItem } = useDeleteCartItem();
      const { onIncreaseItemQuantity, onDecreaseItemQuantity } = useUpdateItemQuantity(() => {});

      return {
        cartItems,
        addShoppingCart,
        deleteShoppingCartItem,
        onIncreaseItemQuantity,
        onDecreaseItemQuantity,
        addedShoppingCartLength,
      };
    },
    { wrapper }
  );
