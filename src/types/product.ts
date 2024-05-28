export interface ProductResponse {
  content: Product[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: Sort;
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
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

type ProductCategory = 'fashion' | 'beverage' | 'electronics' | 'kitchen' | 'fitness' | 'books';
