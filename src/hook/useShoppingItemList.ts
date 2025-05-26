import { useEffect, useReducer } from 'react';

import { Product } from '../types/common';
import { productApi } from '../api/product';
import useCategory from './useCategory';
import useSort from './useSort';

export interface FetchState {
  data: Product[];
  error: Error | null;
  isLoading: boolean;
}

const initialState: FetchState = {
  data: [],
  error: null,
  isLoading: false,
};

type FetchAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_ERROR'; payload: Error }
  | { type: 'FETCH_END' };

const fetchReducer = (state: FetchState, action: FetchAction): FetchState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true };
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload, error: null, isLoading: true };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, data: [], isLoading: true };
    case 'FETCH_END':
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const useShoppingItemList = () => {
  const { category, selectCategory } = useCategory();
  const { sortType, selectSort } = useSort();
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' });

      try {
        const response = await productApi.getProductList({
          sortType,
          category,
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: response });
      } catch (error) {
        dispatch({
          type: 'FETCH_ERROR',
          payload: new Error(
            '상품 목록을 불러오는데 실패했습니다. 다시 시도해주세요.'
          ),
        });
      } finally {
        dispatch({ type: 'FETCH_END' });
      }
    };

    fetchData();
  }, [category, sortType]);

  const retryFetch = () => {
    dispatch({ type: 'FETCH_START' });
  };

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
    selectCategory,
    selectSort,
    category,
    sortType,
    retryFetch,
  };
};

export default useShoppingItemList;
