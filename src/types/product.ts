export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}

export interface ProductsResponseData {
  content: Product[];
  last: boolean;
}

export type Order = 'asc' | 'desc';

export interface Sort {
  [key: string]: Order;
}

export type Category =
  | 'fashion'
  | 'electronics'
  | 'beverage'
  | 'books'
  | 'fitness'
  | 'kitchen'
  | 'all';
