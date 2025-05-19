export interface ShoppingCartResponse {
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
