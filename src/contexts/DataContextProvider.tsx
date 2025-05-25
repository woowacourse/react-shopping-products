import React, {
  createContext,
  useReducer,
  PropsWithChildren,
  useCallback,
} from 'react';
import { ApiContextState } from '../APIs/api.type';
import { CartItem } from '../components/ShoppingCartModal/cart.type';
import { Product } from '../components/ProductCardList/product.type';

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

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  category: '',
  sort: '',
};

const dataReducer = (
  state: ApiContextState,
  action: DataAction
): ApiContextState => {
  const prev = state[action.key] ?? INITIAL_STATE;

  switch (action.type) {
    case 'INIT_API':
      return { ...state, [action.key]: { ...INITIAL_STATE } };

    case 'SET_CATEGORY':
      return {
        ...state,
        products: { ...prev, category: action.category },
      };
    case 'SET_SORT':
      return {
        ...state,
        products: { ...prev, sort: action.sort },
      };

    case 'SET_DATA':
      return {
        ...state,
        [action.key]: {
          ...prev,
          data: action.data,
          loading: false,
          error: null,
        },
      };

    case 'SET_LOADING':
      return {
        ...state,
        [action.key]: { ...prev, loading: action.loading },
      };

    case 'SET_ERROR':
      return {
        ...state,
        [action.key]: { ...prev, error: action.error, loading: false },
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        [action.key]: { ...prev, error: null },
      };

    default:
      return state;
  }
};

export const DataContext = createContext<DataContextType | null>(null);

const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {});

  const setData = useCallback(
    (key: string, data: CartItem[] | Product[] | null) => {
      dispatch({ type: 'SET_DATA', key, data });
    },
    []
  );

  const setLoading = useCallback((key: string, loading: boolean) => {
    dispatch({ type: 'SET_LOADING', key, loading });
  }, []);

  const setError = useCallback((key: string, error: string | null) => {
    dispatch({ type: 'SET_ERROR', key, error });
  }, []);

  const clearError = useCallback((key: string) => {
    dispatch({ type: 'CLEAR_ERROR', key });
  }, []);

  const initApi = useCallback((key: string) => {
    dispatch({ type: 'INIT_API', key });
  }, []);

  const setCategory = useCallback((category: string) => {
    dispatch({ type: 'SET_CATEGORY', key: 'products', category });
  }, []);

  const setSort = useCallback((sort: string) => {
    dispatch({ type: 'SET_SORT', key: 'products', sort });
  }, []);

  return (
    <DataContext.Provider
      value={{
        state,
        setData,
        setLoading,
        setError,
        clearError,
        initApi,
        setCategory,
        setSort,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
