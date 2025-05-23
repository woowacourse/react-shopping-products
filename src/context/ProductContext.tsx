import { createContext, useContext } from 'react';
import { ErrorType, ProductElement, SortKeyType } from '../types/type';
import { useProductList } from '../hooks/useProductList';

export interface ProductListProviderProps {
  children: React.ReactNode;
}

export interface ProductListContextType {
  productList: ProductElement[];
  isLoading: boolean;
  error: ErrorType;
  fetchData: () => Promise<void>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  sortBy: SortKeyType;
  // setSortBy: React.Dispatch<React.SetStateAction<SortKeyType>>;
  // handleSortPrice: (value: string) => Promise<void>;
}

export const ProductListContext = createContext<ProductListContextType | null>(
  null
);

export const ProductListProvider = ({ children }: ProductListProviderProps) => {
  const values = useProductList();

  return (
    <ProductListContext.Provider value={values}>
      {children}
    </ProductListContext.Provider>
  );
};

export const useProductListContext = () => {
  const context = useContext(ProductListContext);

  if (context === null) {
    throw new Error(
      'useProductList는 ProductListProvider와 함께 사용되어야 합니다.'
    );
  }
  return context;
};
