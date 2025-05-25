import { CartItem } from '../components/ShoppingCartModal/cart.type';
import { Product } from '../components/ProductCardList/product.type';

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
