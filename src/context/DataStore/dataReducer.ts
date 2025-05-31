import { DataStore, DataAction } from '../../types/dataStore';

export const dataReducer = (state: DataStore, action: DataAction): DataStore => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          loading: true,
          error: null,
        },
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        [action.key]: {
          data: action.data,
          loading: false,
          error: null,
        },
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          loading: false,
          error: action.error,
        },
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          error: null,
        },
      };

    default:
      return state;
  }
};
