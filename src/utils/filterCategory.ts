import { CATEGORY } from '../constants/productConfig';
import { ProductElement } from '../types/type';

export const filterProductList = (data: ProductElement[], category: string) => {
  return data.filter(
    (item: ProductElement) =>
      category === CATEGORY[0] || item.category === category
  );
};
