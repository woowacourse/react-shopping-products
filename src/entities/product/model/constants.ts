import { Category, SortOrder } from './types';

export const CATEGORIES: Category[] = ['fashion', 'beverage', 'electronics', 'kitchen', 'fitness', 'books'] as const;

export const SORT_ORDERS: SortOrder[] = ['ascByPrice', 'descByPrice'] as const;
