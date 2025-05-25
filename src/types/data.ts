import type { LoadingStateType } from './types';
import type { CategoryType } from './types';

export interface DataResourceType<T = unknown> {
  data: T | null;
  loadingState: LoadingStateType;
  error: Error | null;
  refetch: () => void;
}

export interface ProductItemType {
  id: number;
  name: string;
  category: CategoryType;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface CartItemType {
  id: number;
  product: ProductItemType;
  quantity: number;
}
