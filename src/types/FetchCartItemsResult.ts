import { Product } from "./Product";

export type BaseFetchItemsResult = {
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type FetchCartItemsResult = {
  content: CartItem[];
} & BaseFetchItemsResult;

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};

type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};
