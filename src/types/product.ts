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
  | 'all'
  | 'fashion'
  | 'beverage'
  | 'electronics'
  | 'kitchen'
  | 'fitness'
  | 'books';

export type SortValue = 'asc' | 'desc';
export type SortLabel = '낮은 가격순' | '높은 가격순';
export type CategoryLabel =
  | '전체'
  | '패션'
  | '음료'
  | '전자기기'
  | '주방제품'
  | '운동기구'
  | '책/도서';

export interface SortOption {
  label: SortLabel;
  value: SortValue;
}

export interface Category {
  label: CategoryLabel;
  value: ProductCategory;
}
