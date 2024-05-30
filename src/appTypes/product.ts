export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: 'fashion' | 'beverage' | 'electronics' | 'kitchen' | 'fitness' | 'books';
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
