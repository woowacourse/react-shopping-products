import { getCartItem } from '../api/fetchCart';

export const fetchCartItem = async () => {
  return await getCartItem({ page: 0, size: 50, sortBy: 'desc' }).then(
    (res) => res.content
  );
};
