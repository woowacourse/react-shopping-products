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

export interface CartItemListResponse {
  content: CartItemList;
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: SortPage;
  first: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export interface Pageable {
  sort: SortPage;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface SortPage {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface AddCartItemAction {
  type: 'ADD';
  payload: CartItem;
}

export interface DeleteCartItemAction {
  type: 'DELETE';
  payload: { productId: number };
}

// TODO: 확인 후 필요없는 코드 삭제
export interface PatchCartItemAction {
  type: 'PATCH';
  payload: { productId: number; quantity: number };
}

export type CartItemAction =
  | AddCartItemAction
  | DeleteCartItemAction
  | PatchCartItemAction;
