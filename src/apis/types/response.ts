export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
