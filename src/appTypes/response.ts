export interface BaseResponse<T> {
  content: T;
  last: boolean;
}

export interface PaginationResponse<T> extends BaseResponse<T> {
  totalPages: number;
  totalElements: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  pageable: Pageable;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  offset: number;
}
