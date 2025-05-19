export interface PaginatedResponse<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export type PaginationParams = {
  page: number;
  size: number;
};
