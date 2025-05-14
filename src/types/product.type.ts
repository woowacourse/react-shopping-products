type Category = "식료품" | "패션잡화";
type SortOption = "낮은 가격순" | "높은 가격순";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
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
  endpoint: string;
}

interface ShoppingCartResponse {
  endpoint: string;
  requestBody?: PostRequestBody | PatchRequestBody;
  cartItemId?: number;
}

interface PostRequestBody {
  productId: number;
  quantity: number;
}

interface PatchRequestBody {
  quantity: number;
}

interface Error {
  isError: boolean;
  errorMessage: string;
}

export type {
  Product,
  FetchProductsRequest,
  ProductListResponse,
  Pageable,
  Sort,
  Category,
  SortOption,
  ShoppingCartResponse,
  CartItem,
  Error,
};
