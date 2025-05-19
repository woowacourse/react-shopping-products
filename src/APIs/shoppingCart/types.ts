export interface ShoppingCartResponse {
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
