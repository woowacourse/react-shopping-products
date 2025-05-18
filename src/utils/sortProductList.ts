import { Product, SortingType } from '../types';

const sortProductList = (productList: Product[], sortingType: SortingType) => {
  if (sortingType === 'asc') return [...productList].sort((a, b) => a.price - b.price);
  if (sortingType === 'desc') return [...productList].sort((a, b) => b.price - a.price);
  return [...productList];
};

export default sortProductList;
