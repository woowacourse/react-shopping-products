export type OptionItem<T> = {
  name: string;
  value: T;
};

export type Category =
  | 'all'
  | 'fashion'
  | 'beverage'
  | 'electronics'
  | 'kitchen'
  | 'fitness'
  | 'books';

export type SortOrder = 'asc' | 'desc';
export type SortProperty = 'price';
