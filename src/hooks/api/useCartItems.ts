import getCartItems from '../../api/getCartItems';
import { useApiContext } from '../../contexts/ApiContext';
import { CartItemResponse } from '../../types/response';

export default function useCartItems() {
  return useApiContext<CartItemResponse>({
    fetchFn: getCartItems,
    key: 'getCartItems'
  });
}
