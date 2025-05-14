export interface Product {
  category: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export interface CartProduct {
  id: number;
  product: Product;
  quantity: number;
}
