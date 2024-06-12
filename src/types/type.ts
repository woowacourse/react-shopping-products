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

export interface AddCartItemRequest {
  productId: number;
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
