export interface Product {
  category: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  isCart: boolean;
  cartProductId?: number;
}

export interface CartProduct {
  id: number;
  product: Product;
  quantity: number;
}

export interface ProductsResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
