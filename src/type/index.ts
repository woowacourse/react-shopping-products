import { CATEGORY, SORT } from '../constants';

export type CategoryType = keyof typeof CATEGORY;
export type SortType = keyof typeof SORT;

export interface Item {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItems {
  id: number;
  quantity: number;
  product: Item;
}

export interface BadgeProps {
  color: string;
  bgColor: string;
}
