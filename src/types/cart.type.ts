import { Product } from './product.type';

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
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

export type {
  CartItem,
  ShoppingCartRequestBody,
  ShoppingCartRequest,
  ShoppingCartResponse,
  PostRequestBody,
  PatchRequestBody,
};
