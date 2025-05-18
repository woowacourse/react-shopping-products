export interface ResponseProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  isInCart?: boolean;
}

export interface ResponseCartItem {
  id: number;
  quantity: number;
  product: Omit<ResponseProduct, "isInCart">;
}
