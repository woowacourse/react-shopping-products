import React, { createContext, PropsWithChildren, useState } from "react";
import {
  CATEGORY,
  Category,
  Error,
  Product,
  SORT_OPTION,
  SortOption,
} from "../../types/product.type";
import { useProductsFetch } from "../../hooks/products/useProductsFetch";

interface ProductsContextType {
  products: Product[];
  productsError: Error;
  handleChangeProducts: (newProducts: Product[]) => void;
  handleChangeSort: (newSort: SortOption) => void;
  handleChangeCategory: (newCategory: Category) => void;
  category: Category | "";
  sort: SortOption;
  isProductsLoading: boolean;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

const ProductsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sort, setSort] = useState<SortOption>(SORT_OPTION[0]);
  const [category, setCategory] = useState<Category>(CATEGORY[0]);

  const handleChangeSort = (newSort: SortOption) => setSort(newSort);
  const handleChangeCategory = (newCategory: Category) =>
    setCategory(newCategory);

  const {
    products,
    isLoading: isProductsLoading,
    error: productsError,
    setProducts: handleChangeProducts,
  } = useProductsFetch(
    sort === SORT_OPTION[0] ? "price,asc" : "price,desc",
    category
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        productsError,
        handleChangeProducts,
        handleChangeSort,
        handleChangeCategory,
        category,
        sort,
        isProductsLoading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
