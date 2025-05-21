import { CartItem } from "../../types/product.type";

export interface ShoppingCartProps {
  method?: string;
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

export interface ShoppingCartResponse {
  content: CartItem[];
}
