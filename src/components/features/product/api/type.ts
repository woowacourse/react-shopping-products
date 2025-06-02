import { PaginationResponse } from '@/api/type';

export interface ProductsResponse extends PaginationResponse<ProductContent> {}

export interface ProductContent {
  id: number;
  name: null | string;
  price: number;
  imageUrl: null | string;
  category: Category | null;
  quantity: number;
}
export type Category = '식료품' | '패션잡화';
