export type Category = 'fashion' | 'beverage' | 'electronics' | 'kitchen' | 'fitness' | 'books';

export type SortOrder = 'price,id,asc' | 'price,id,desc';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}

interface SortObject {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface PageableObject {
  sort: SortObject;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  offset: number;
}

export interface ProductsResponse {
  totalPages: number;
  totalElements: number;
  sort: SortObject;
  first: boolean;
  last: boolean;
  pageable: PageableObject;
  number: number;
  numberOfElements: number;
  size: number;
  content: Product[];
  empty: boolean;
}
