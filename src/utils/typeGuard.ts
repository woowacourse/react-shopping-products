import { ErrorStatus } from '@/types/error';
import { CategoryLabel, ProductCategory, SortLabel, SortValue } from '@/types/product';

export const isCategoryLabel = (value: string): value is CategoryLabel => {
  return ['전체', '패션', '음료', '전자기기', '주방제품', '운동기구', '책/도서'].includes(value);
};

export const isProductCategory = (value: string): value is ProductCategory => {
  return ['all', 'fashion', 'beverage', 'electronics', 'kitchen', 'fitness', 'books'].includes(
    value,
  );
};

export const isSortLabel = (value: string): value is SortLabel => {
  return ['낮은 가격순', '높은 가격순'].includes(value);
};

export const isSortValue = (value: string): value is SortValue => {
  return ['asc', 'desc'].includes(value);
};

export const isErrorStatus = (value: number): value is ErrorStatus => {
  return [400, 401, 404, 500, 504].includes(value);
};
