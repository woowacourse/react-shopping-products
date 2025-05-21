type Category = '전체' | '패션잡화' | '식료품';
type SortOption = '낮은 가격순' | '높은 가격순';
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
