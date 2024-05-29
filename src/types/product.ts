export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ProductsResponseData {
  content: Product[];
  last: boolean;
}

export type Category =
  | 'fashion'
  | 'electronics'
  | 'beverage'
  | 'books'
  | 'fitness'
  | 'kitchen'
  | '';
