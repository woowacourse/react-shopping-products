export interface ResponseProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ResponseCartItem {
  id: number;
  quantity: number;
  product: Omit<ResponseProduct, 'isInCart'>;
}
