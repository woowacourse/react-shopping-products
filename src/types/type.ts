export type Category =
  | 'all'
  | 'books'
  | 'fitness'
  | 'beverage'
  | 'electronics'
  | 'kitchen'
  | 'fashion';

export type Sort = 'price,asc' | 'price,desc';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}
