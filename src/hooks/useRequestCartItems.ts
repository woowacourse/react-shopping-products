import { PAGEABLE_DEFAULT, PageableType } from '../api/getProducts';
import getShoppingCart from '../api/getShoppingCart';
import { useAPIContext } from '../Component/Common/Provider';
import { CartItemTypes } from '../types/CartItemType';

function useRequestCartItems() {
  const context = useAPIContext<CartItemTypes[]>({
    key: 'cartItems',
  });

  return {
    ...context,
    requestData: ({
      pageable = PAGEABLE_DEFAULT,
      skipLoading = false,
    }: {
      pageable?: PageableType;
      skipLoading?: boolean;
    } = {}) =>
      context.requestData({
        apiFn: () => getShoppingCart(pageable),
        skipLoading,
      }),
  };
}

export default useRequestCartItems;
