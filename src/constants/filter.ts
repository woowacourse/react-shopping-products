import { Category, Order } from '../types/product';

interface CategoryOption {
  [key: string]: Category;
}

interface PriceSortOption {
  [key: string]: Order;
}

export const CATEGORY: CategoryOption = {
  전체: 'all',
  패션: 'fashion',
  음료: 'beverage',
  책: 'books',
  전자기기: 'electronics',
  생활: 'fitness',
  주방용품: 'kitchen',
} as const;

export const PRICE_SORT: PriceSortOption = {
  '낮은 가격순': 'asc',
  '높은 가격순': 'desc',
} as const;
