export interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface InitProductItem {
  orderId?: number;
  initIsInCart: boolean;
  initQuantity: number;
}
