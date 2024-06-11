import { renderHook } from '@testing-library/react';
import useShoppingCart from '../../src/queries/shoppingCart/useShoppingCart';
import usePostShoppingCart from '../../src/queries/shoppingCart/usePostShoppingCart';
import useDeleteShoppingCart from '../../src/queries/shoppingCart/useDeleteShoppingCart';
import useUpdateItemQuantity from '../../src/hooks/shoppingCart/useUpdateItemQuantity';
import { wrapper } from './createProductsRenderHook';

export const createShoppingCartRenderHook = () =>
  renderHook(
    () => {
      const { cartItems, addedShoppingCartLength } = useShoppingCart();
      const { addShoppingCart } = usePostShoppingCart(() => {});
      const { deleteShoppingCartItem } = useDeleteShoppingCart(() => {});
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
