import getShoppingCart from '../api/getShoppingCart';
import { useAPIContext } from '../Component/Common/Provider';
import { CartItemTypes } from '../types/CartItemType';

function useCartItems() {
  const { data: cartItems, status } = useAPIContext<CartItemTypes[]>({
    apiFn: () => getShoppingCart(),
    key: 'cartItems',
  });

  return { cartItems, status };
}

export default useCartItems;
