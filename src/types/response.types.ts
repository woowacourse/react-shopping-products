export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
}
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: Sort;
}
