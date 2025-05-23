import { useEffect, useState } from "react";
import { ProductsAPI } from "../apis/products";
import { CategoryOptionsKey, SortOptionsKey } from "../constants";
import { Products } from "../types/products";
import { isErrorResponse } from "../utils/typeGuard";

type Props = React.Dispatch<React.SetStateAction<string>>;

interface UseProductsReturn {
  products: Products | null;
  isLoading: boolean;
  selectedCategory: CategoryOptionsKey;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryOptionsKey>>;
  selectedSortOption: SortOptionsKey;
  setSelectedSortOption: React.Dispatch<React.SetStateAction<SortOptionsKey>>;
}

const useProducts = (setErrorMessage: Props): UseProductsReturn => {
  const [products, setProducts] = useState<Products | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOptionsKey>("전체");
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortOptionsKey>("낮은 가격 순");

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
        setErrorMessage(response.error);
        return;
      }

      setProducts(response as Products);
    })();
  }, [selectedCategory, selectedSortOption, setErrorMessage]);

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
