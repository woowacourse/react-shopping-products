import { useEffect, useState } from "react";
import { ProductsAPI } from "../apis/products";
import { CategoryOptionsKey, SortOptionsKey } from "../constants/filter";
import { TOAST_TYPES } from "../constants/toast";
import { Products } from "../types/products";
import { isErrorResponse } from "../utils/typeGuard";
import useToast from "./useToast";

interface UseProductsReturn {
  products: Products | null;
  isLoading: boolean;
  selectedCategory: CategoryOptionsKey;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryOptionsKey>>;
  selectedSortOption: SortOptionsKey;
  setSelectedSortOption: React.Dispatch<React.SetStateAction<SortOptionsKey>>;
}

const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Products | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOptionsKey>("전체");
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortOptionsKey>("낮은 가격 순");
  const { showToast } = useToast();

  console.log("products: ", products);

  //TODO: products 자체를 바꾸는 게 아니라, products 는 그냥 상품 목록 전체를 관리하고 함수로 필터링한 상품 목록들 반환해주기

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

  return {
    products,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    selectedSortOption,
    setSelectedSortOption,
  };
};

export default useProducts;
