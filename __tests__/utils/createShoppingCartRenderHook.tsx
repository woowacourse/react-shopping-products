import { renderHook } from '@testing-library/react';
import useShoppingCart from '../../src/hooks/cartItem/useShoppingCart';
import useAddShoppingCart from '../../src/hooks/cartItem/useAddShoppingCart';
import useDeleteCartItem from '../../src/hooks/cartItem/useDeleteCartItem';
import useUpdateItemQuantity from '../../src/hooks/cartItem/useUpdateItemQuantity';
import { wrapper } from './createProductsRenderHook';

export const createShoppingCartRenderHook = () =>
  renderHook(
    () => {
      const { cartItems, addedShoppingCartLength } = useShoppingCart();
      const { addShoppingCart } = useAddShoppingCart();
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
