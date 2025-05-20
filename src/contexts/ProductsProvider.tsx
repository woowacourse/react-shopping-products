import React, { createContext, PropsWithChildren, useState } from 'react';
import {
  Category,
  ErrorState,
  Product,
  SortOption,
} from '../types/product.type';
import { useProductsFetch } from '../hooks/useProductsFetch';
import {
  CATEGORY,
  SORT_OPTION,
} from '../components/ProductListToolBar/toolBar.constant';

interface ProductsContextType {
  items: Product[];
  error: ErrorState;
  updateItems: (newProducts: Product[]) => void;
  updateSort: (newSort: SortOption) => void;
  updateCategory: (newCategory: Category) => void;
  category: Category | '';
  sort: SortOption;
  isLoading: boolean;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

const ProductsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sort, setSort] = useState<SortOption>(SORT_OPTION[0]);
  const [category, setCategory] = useState<Category>(CATEGORY[0]);

  const updateSort = (newSort: SortOption) => setSort(newSort);
  const updateCategory = (newCategory: Category) => setCategory(newCategory);

  const {
    items,
    isLoading,
    error,
    setItems: updateItems,
  } = useProductsFetch(
    sort === SORT_OPTION[0] ? 'price,asc' : 'price,desc',
    category
  );

  return (
    <ProductsContext.Provider
      value={{
        items,
        error,
        updateItems,
        updateSort,
        updateCategory,
        category,
        sort,
        isLoading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
