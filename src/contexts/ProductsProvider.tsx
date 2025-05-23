import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Category, Product, SortOption } from '../types/product.type';
import { useProductsFetch } from '../hooks/useProductsFetch';
import {
  CATEGORY,
  SORT_OPTION,
} from '../components/ProductListToolBar/toolBar.constant';
import { ErrorState } from '../types/error.type';

interface ProductsContextType {
  items: Product[];
  error: ErrorState;
  updateItems: (newProducts: Product[]) => void;
  updateSort: (newSort: SortOption) => void;
  updateCategory: (newCategory: Category) => void;
  category: Category | '';
  sort: SortOption;
  loading: boolean;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

const ProductsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sort, setSort] = useState<SortOption>(SORT_OPTION[0]);
  const [category, setCategory] = useState<Category>(CATEGORY[0]);

  const { items, loading, error, setItems } = useProductsFetch(
    sort === SORT_OPTION[0] ? 'price,asc' : 'price,desc',
    category
  );

  const updateSort = useCallback((newSort: SortOption) => {
    setSort(newSort);
  }, []);
  const updateCategory = useCallback((newCategory: Category) => {
    setCategory(newCategory);
  }, []);
  const updateItems = useCallback(
    (newProducts: Product[]) => {
      setItems(newProducts);
    },
    [setItems]
  );

  const value = useMemo(
    () => ({
      items,
      error,
      updateItems,
      updateSort,
      updateCategory,
      category,
      sort,
      loading,
    }),
    [
      items,
      error,
      updateItems,
      updateSort,
      updateCategory,
      category,
      sort,
      loading,
    ]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
