import {
  SORT_OPTION,
  CATEGORY,
} from '../components/ProductListToolBar/toolBar.constant';

type Category = (typeof CATEGORY)[number];
type SortOption = (typeof SORT_OPTION)[number];

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}

interface FetchProductsResponse {
  content: Product[];
  totalPages: number;
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

interface ErrorState {
  is: boolean;
  message: string;
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
  ErrorState,
  FetchProductsResponse,
};
