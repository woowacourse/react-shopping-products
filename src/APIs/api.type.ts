import { CartItem } from '../components/ShoppingCartModal/cart.type';
import { Product } from '../components/ProductCardList/product.type';

interface ApiState<T = CartItem[] | Product[]> {
  data: T;
  loading: boolean;
  error: string;
  category?: string;
  sort?: string;
}

interface ApiContextState {
  [key: string]: ApiState;
}

export type { ApiState, ApiContextState };
