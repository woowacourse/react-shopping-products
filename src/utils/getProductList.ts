import { getProduct } from '../api/fetchProduct';
import { SortType } from '../types/type';

export const fetchProductList = async (sortBy: SortType = 'asc') => {
  return await getProduct({ page: 0, size: 50, sortBy: sortBy }).then(
    (res) => res.content
  );
};
