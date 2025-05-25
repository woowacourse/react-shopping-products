import { DataStore } from '../../types/dataStore';

export const initialState: DataStore = {
  products: {
    data: null,
    loading: false,
    error: null,
  },
  'cart-items': {
    data: null,
    loading: false,
    error: null,
  },
};
