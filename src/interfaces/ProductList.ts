export interface ProductList {
  totalPages: number;
  totalElements: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  pageable: Pageable;
  number: number;
  numberOfElements: number;
  size: number;
  content: Content[];
  empty: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  offset: number;
}

export interface Content {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}
