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

export type CartItemList = CartItem[];

export interface AddCartItemAction {
  type: 'ADD';
  payload: CartItem;
}

export interface DeleteCartItemAction {
  type: 'DELETE';
  payload: { productId: number };
}

export interface PatchCartItemAction {
  type: 'PATCH';
  payload: { productId: number; quantity: number };
}

export type CartItemAction =
  | AddCartItemAction
  | DeleteCartItemAction
  | PatchCartItemAction;
