import { CartItem } from '../components/ShoppingCartModal/cart.type';
import { Product } from '../components/ProductCardList/product.type';
import { ApiContextState } from '../APIs/api.type';

interface DataContextType {
  state: ApiContextState;
  setData: (key: string, data: CartItem[] | Product[] | null) => void;
  setLoading: (key: string, loading: boolean) => void;
  setError: (key: string, error: string | null) => void;
  clearError: (key: string) => void;
  initApi: (key: string) => void;
  setCategory: (category: string) => void;
  setSort: (sort: string) => void;
}

type DataAction =
  | { type: 'SET_CATEGORY'; key: string; category: string }
  | { type: 'SET_SORT'; key: string; sort: string }
  | { type: 'SET_DATA'; key: string; data: CartItem[] | Product[] | null }
  | { type: 'SET_LOADING'; key: string; loading: boolean }
  | { type: 'SET_ERROR'; key: string; error: string | null }
  | { type: 'CLEAR_ERROR'; key: string }
  | { type: 'INIT_API'; key: string };

export type { DataContextType, DataAction };
