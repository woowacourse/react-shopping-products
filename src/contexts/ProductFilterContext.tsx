import { createContext, useState, ReactNode } from "react";
import { CategoryOptionsKey, SortOptionsKey } from "../constants";

interface ProductFilterContextType {
  selectedCategory: CategoryOptionsKey;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryOptionsKey>>;
  selectedSortOption: SortOptionsKey;
  setSelectedSortOption: React.Dispatch<React.SetStateAction<SortOptionsKey>>;
}

export const ProductFilterContext = createContext<
  ProductFilterContextType | undefined
>(undefined);

export const ProductFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOptionsKey>("전체");
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortOptionsKey>("price,asc");

  return (
    <ProductFilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedSortOption,
        setSelectedSortOption,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
};
