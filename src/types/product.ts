export interface ProductResponse {
  content: Product[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: SortResponse;
  first: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
}

export interface Pageable {
  sort: SortResponse;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface SortResponse {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export type ProductCategory =
  | 'fashion'
  | 'beverage'
  | 'electronics'
  | 'kitchen'
  | 'fitness'
  | 'books';

export type Sort = 'asc' | 'desc';
