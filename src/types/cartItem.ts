export interface CartItemInfo {
  id: number;
  quantity: number;
  product: CartItemInfoProduct;
}

export interface CartItemInfoProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}
