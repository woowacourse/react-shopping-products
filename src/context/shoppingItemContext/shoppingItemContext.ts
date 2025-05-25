import { createContext } from 'react';
import { FetchState } from '../../hook/useShoppingItemList';
import { CategoryOption, SortOption } from '../../types/common';

interface ShoppingItemContextType extends FetchState {
  selectCategory: (category: CategoryOption) => void;
  selectSort: (sortType: SortOption) => void;
  category: CategoryOption;
  sortType: SortOption;
  retryFetch: () => void;
}

const ShoppingItemContext = createContext<ShoppingItemContextType>({
  data: [],
  error: null,
  isLoading: false,
  selectCategory: () => {},
  selectSort: () => {},
  category: '전체',
  sortType: '낮은 가격순',
  retryFetch: () => {},
});

export default ShoppingItemContext;
