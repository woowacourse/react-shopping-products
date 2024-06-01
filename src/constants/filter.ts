import { Option } from '../components/common/Dropdown';
import { Category, Order } from '../types/product';

export const CATEGORIES: Option<Category>[] = [
  { value: 'all', label: '전체' },
  { value: 'fashion', label: '패션' },
  { value: 'beverage', label: '음료' },
  { value: 'books', label: '책' },
  { value: 'electronics', label: '전자기기' },
  { value: 'fitness', label: '생활' },
  { value: 'kitchen', label: '주방용품' },
] as const;

export const PRICE_SORT: Option<Order>[] = [
  { value: 'asc', label: '낮은 가격순' },
  { value: 'desc', label: '높은 가격순' },
] as const;
