import { FILTER_OPTION_LIST, CATEGORY_OPTION_LIST } from '@/constants/filter';

export type OptionItem = {
  option: string;
  value: string;
};

export type SortType = 'asc' | 'desc';

export type Category =
  | 'all'
  | 'fashion'
  | 'beverage'
  | 'electronics'
  | 'kitchen'
  | 'fitness'
  | 'books';

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
};

export type CartItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
};
