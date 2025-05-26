import { ProductElement } from '../types/type';

export const filterProductList = (data: ProductElement[], category: string) => {
  return data.filter(
    (item: ProductElement) => category === '전체' || item.category === category
  );
};
