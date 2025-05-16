export interface GetCartItemsResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: CartItem[];
  number: number;
  sort: Sort;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}
interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}
