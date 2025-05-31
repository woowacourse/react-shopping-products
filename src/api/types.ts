export interface ResponseProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity?: number;
}

export interface ResponseDefault<T> {
  content: T;
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface ResponseCartItem {
  id: number;
  quantity: number;
  product: ResponseProduct;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiConfigType {
  method: HttpMethod;
  isAuthorization: boolean;
  body?: Record<string, string | number>;
}

export interface initializeApiParamsType {
  size: number;
  page: number;
}

export interface ProductParamsType extends initializeApiParamsType {
  sort: string;
  category?: string;
}

export interface AddCartParamsType {
  productId: number;
  quantity: number;
}
