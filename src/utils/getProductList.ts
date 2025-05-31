import { getProduct } from '../api/fetchProduct';
import { API_CONFIG } from '../constants/APIConfig';
import { SortType } from '../types/type';

export const fetchProductList = async (sortBy: SortType = 'asc') => {
  return await getProduct({
    page: API_CONFIG.DEFAULT_PAGE,
    size: API_CONFIG.DEFAULT_SIZE,
    sortBy: sortBy,
  }).then((res) => res.content);
};
