import type { LoadingStateType } from './types';
import type { CategoryType } from './types';

export interface DataResourceType<T, A extends unknown[] = []> {
  data: T | null;
  loadingState: LoadingStateType;
  error: Error | null;
  refetch: (...args: A) => Promise<T | null>;
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
