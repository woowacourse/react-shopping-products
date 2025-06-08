import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "../../../apis/types/response";
import { TOAST_TYPES } from "../../../shared/config/toast";
import useToast from "../../../shared/hooks/useToast";
import { ProductsAPI } from "../apis/ProductsAPI";
import { CategoryOptionsKey, SortOptionsKey } from "../config/filter";

export interface ProductContextType {
  products: Product[];
  fetchData: () => Promise<void>;

  category: CategoryOptionsKey;
  setCategory: (newCategory: CategoryOptionsKey) => void;

  sortOption: SortOptionsKey;
  setSortOption: (newSort: SortOptionsKey) => void;
}

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast } = useToast();

  const category =
    (searchParams.get("category") as CategoryOptionsKey) || "전체";
  const sortOption =
    (searchParams.get("sort") as SortOptionsKey) || "낮은 가격 순";

  const fetchData = useCallback(async () => {
    try {
      setProducts(await ProductsAPI.get(category, sortOption));
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      showToast({ message, type: TOAST_TYPES.ERROR });
    }
  }, [showToast, category, sortOption]);

  const setCategory = useCallback(
    (newCategory: CategoryOptionsKey) => {
      searchParams.set("category", newCategory);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const setSortOption = useCallback(
    (newSort: SortOptionsKey) => {
      searchParams.set("sort", newSort);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const contextValue = useMemo(
    () => ({
      products,
      fetchData,

      category,
      setCategory,

      sortOption,
      setSortOption,
    }),
    [products, fetchData, category, setCategory, sortOption, setSortOption]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
