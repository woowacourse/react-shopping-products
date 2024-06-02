export type SortType = 'asc' | 'desc';

export type Category =
  | 'all'
  | 'fashion'
  | 'beverage'
  | 'electronics'
  | 'kitchen'
  | 'fitness'
  | 'books';

export type ProductItemData = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
};

export type CartItemData = {
  id: number;
  quantity: number;
  product: ProductItemData;
};

type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

type Pageable = {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
};

export type ProductListData = {
  content: ProductItemData[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
};

export type CartItemListData = {
  content: CartItemData[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
};
