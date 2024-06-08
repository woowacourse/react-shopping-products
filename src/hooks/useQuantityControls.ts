import { CartItem } from '../types';
import { cartMutations, cartQueries } from './queries/cart';

export default function useQuantityControls(productId: number) {
  const { data: cartItems } = cartQueries.useGetCartItems();
  const cartItem = cartItems.find(
    (cartItem) => cartItem.product.id === productId
  ) as CartItem;

  const { mutate: updateQuantity } = cartMutations.useUpdateCartItemQuantity();

  const decrease = () => {
    updateQuantity({
      cartItemId: cartItem?.id,
      quantity: cartItem?.quantity - 1,
    });
  };

  const increase = () => {
    updateQuantity({
      cartItemId: cartItem?.id,
      quantity: cartItem?.quantity + 1,
    });
  };

  return {
    quantity: cartItem?.quantity,
    increase,
    decrease,
  };
}
