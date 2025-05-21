export type CartResponse = APIResponse<CartContent>;
export type ProductResponse = APIResponse<ProductContent>;

export interface APIResponse<T> {
  content: T[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface CartContent {
  id: number;
  quantity: number;
  product: ProductContent;
}

export interface ProductContent {
  id: number;
  name: null | string;
  price: number;
  imageUrl: null | string;
  category: Category | null;
}

export enum Category {
  식료품 = '식료품',
  패션잡화 = '패션잡화',
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
