import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import {
  CategoryOptionsKey,
  SortOptionsKey,
} from "../../../shared/config/filter";
import { TOAST_TYPES } from "../../../shared/config/toast";
import useToast from "../../../shared/hooks/useToast";
import { isErrorResponse } from "../../../shared/utils/typeGuard";
import { ProductsAPI } from "../api/products";
import { Products } from "./types";

export interface ProductContextType {
  products: Products | null;
  isLoading: boolean;
  selectedCategory: CategoryOptionsKey;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryOptionsKey>>;
  selectedSortOption: SortOptionsKey;
  setSelectedSortOption: React.Dispatch<React.SetStateAction<SortOptionsKey>>;
}

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Products | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOptionsKey>("전체");
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortOptionsKey>("낮은 가격 순");
  const { showToast } = useToast();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await ProductsAPI.get(
        selectedCategory,
        selectedSortOption
      );
      setIsLoading(false);

      if (isErrorResponse(response)) {
        showToast({
          message: response.error,
          type: TOAST_TYPES.ERROR,
        });
        return;
      }

      setProducts(response as Products);
    })();
  }, [selectedCategory, selectedSortOption]);

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        selectedCategory,
        setSelectedCategory,
        selectedSortOption,
        setSelectedSortOption,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
