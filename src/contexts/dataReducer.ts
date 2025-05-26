import { ApiContextState } from '../APIs/api.type';
import { DataAction } from './data.type';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  category: '',
  sort: '',
};

export const dataReducer = (
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
