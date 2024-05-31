export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export type ProductCategory =
  | 'fashion'
  | 'beverage'
  | 'electronics'
  | 'kitchen'
  | 'fitness'
  | 'books';
