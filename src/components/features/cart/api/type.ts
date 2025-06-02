import { PaginationResponse } from '@/api/type';
import { ProductContent } from '../../product/api/type';

export interface CartItemsResponse
  extends PaginationResponse<CartItemContent> {}

export interface CartItemContent {
  id: number;
  quantity: number;
  product: ProductContent;
}
