interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: "식료품" | "패션잡화";
}

interface ProductListResponse {
  content: Product[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface FetchProductsRequest {
  params: {
    page: number;
    size: number;
    sort?: string;
  };
  endpoint: string;
}

export type {
  Product,
  FetchProductsRequest,
  ProductListResponse,
  Pageable,
  Sort,
};
