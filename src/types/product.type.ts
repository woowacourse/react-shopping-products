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

interface FetchProductsRequest {
  endpoint: string;
}

type ShoppingCartRequestBody = PostRequestBody | PatchRequestBody;

interface ShoppingCartRequest {
  endpoint: string;
  requestBody?: ShoppingCartRequestBody;
  cartItemId?: number;
}

interface ShoppingCartResponse {
  content: CartItem[];
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
  Category,
  SortOption,
  CartItem,
  ErrorState,
  FetchProductsResponse,
  ShoppingCartRequestBody,
  ShoppingCartRequest,
  ShoppingCartResponse,
};
