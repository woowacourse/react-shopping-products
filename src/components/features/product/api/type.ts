export interface PaginationResponse<T> {
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

export interface CartItemsResponse
  extends PaginationResponse<CartItemContent> {}
export interface ProductsResponse extends PaginationResponse<ProductContent> {}

export interface CartItemContent {
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
  quantity: number;
}

export type Category = '식료품' | '패션잡화';

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
