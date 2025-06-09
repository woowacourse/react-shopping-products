import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "../../../apis/types/response";
import useFetch from "../../../shared/hooks/useFetch";
import { ProductsAPI } from "../apis/ProductsAPI";
import { CategoryOptionsKey, SortOptionsKey } from "../config/filter";

type ProductParams = {
  category: CategoryOptionsKey;
  sortOption: SortOptionsKey;
};

export interface ProductContextType {
  refetch: () => Promise<void>;
  loading: boolean;
  products: Product[];

  category: CategoryOptionsKey;
  setCategory: (newCategory: CategoryOptionsKey) => void;

  sortOption: SortOptionsKey;
  setSortOption: (newSort: SortOptionsKey) => void;
}

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchProducts = useCallback(
    (params: ProductParams) =>
      ProductsAPI.get(params.category, params.sortOption),
    []
  );

  const { data, loading, success, fetchData } = useFetch<
    Product[],
    ProductParams
  >(fetchProducts);

  useEffect(() => {
    if (data && success) {
      setProducts(data);
    }
  }, [data, success]);

  const category =
    (searchParams.get("category") as CategoryOptionsKey) || "전체";
  const sortOption =
    (searchParams.get("sort") as SortOptionsKey) || "낮은 가격 순";

  const refetch = useCallback(
    () => fetchData({ category, sortOption }),
    [fetchData, category, sortOption]
  );

  const setCategory = useCallback(
    (newCategory: CategoryOptionsKey) => {
      searchParams.set("category", newCategory);
      setSearchParams(searchParams);
      fetchData({ category: newCategory, sortOption });
    },
    [searchParams, setSearchParams, fetchData, sortOption]
  );

  const setSortOption = useCallback(
    (newSort: SortOptionsKey) => {
      searchParams.set("sort", newSort);
      setSearchParams(searchParams);
      fetchData({ category, sortOption: newSort });
    },
    [searchParams, setSearchParams, fetchData, category]
  );

  const contextValue = useMemo(
    () => ({
      refetch,
      loading,
      products,

      category,
      setCategory,

      sortOption,
      setSortOption,
    }),
    [
      refetch,
      loading,
      products,

      category,
      setCategory,

      sortOption,
      setSortOption,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
