import { getCartItem } from '../api/fetchCart';
import { API_CONFIG } from '../constants/APIConfig';

export const fetchCartItem = async () => {
  return await getCartItem({
    page: API_CONFIG.DEFAULT_PAGE,
    size: API_CONFIG.DEFAULT_SIZE,
    sortBy: API_CONFIG.DEFAULT_SORT,
  }).then((res) => res.content);
};
