export type Category =
  | 'fashion'
  | 'beverage'
  | 'electronics'
  | 'kitchen'
  | 'fitness'
  | 'books';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}
