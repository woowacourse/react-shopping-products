import { CartItem } from '../types/cart.type';
import { Product } from '../types/product.type';

interface ApiState<T = CartItem[] | Product[]> {
  data: T | null;
  loading: boolean;
  error: string | null;
  category: string;
  sort: string;
}

interface ApiContextState {
  [key: string]: ApiState;
}

export type { ApiState, ApiContextState };
