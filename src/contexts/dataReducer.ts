import { ApiContextState } from '../APIs/api.type';
import { Product } from '../components/ProductCardList/product.type';
import { CartItem } from '../components/ShoppingCartModal/cart.type';
import { DataAction } from './data.type';

export const dataReducer = (
  state: ApiContextState<CartItem[] | Product[]>,
  action: DataAction
): ApiContextState<CartItem[] | Product[]> => {
  const prev = state[action.key];

  switch (action.type) {
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
          error: '',
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
        [action.key]: { ...prev, error: '' },
      };

    default:
      return state;
  }
};
