export interface FetchResult<T> {
  totalPages: number;
  totalElements: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  pageable: Pageable;
  number: number;
  numberOfElements: number;
  size: number;
  content: T[];
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
