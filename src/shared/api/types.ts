export interface SortObject {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface PageableObject {
  sort: SortObject;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  offset: number;
}
