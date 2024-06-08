import { useEffect, useState } from "react";
import { useError } from "../context/errorContext";
import { fetchProducts } from "../api/products";
import usePagination from "./usePagination";
import { QUERY_KEYS } from "../constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  fetchNextPage: () => void;
  isLastPage: boolean;
  categoryState: {
    currentCategory: string;
    changeCategory: (value: string) => void;
  };

  sortOptionState: {
    currentSortOption: string;
    changeSortOption: (value: string) => void;
  };

  errorMessage: string;
}

const sortOptionsMap: { [key: string]: string } = {
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("전체");
  const [sortOption, setSortOption] = useState<string>("price,asc");
  const { page, isLastPage, handleLastPage, goToNextPage, resetPage } = usePagination();
  const { errorMessage, setErrorMessage } = useError();

  const fetchParams = {
    page: page,
    category: category,
    sortOption: sortOption,
    setErrorMessage: setErrorMessage,
  };

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, category, sortOption, page],
    queryFn: async () => {
      try {
        setIsLoading(true);
        const response = await fetchProducts(fetchParams);
        console.log("dadta", response.content);

        handleLastPage(response.last);
        return response;
      } catch (error) {
        throw new Error("Error fetching products: " + error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (data) {
      setProducts((prevProducts) => [...prevProducts, ...data.content]);
    }
  }, [data]);

  const fetchNextPage = () => {
    if (!isLoading) goToNextPage();
  };

  const categoryState = {
    currentCategory: category,
    changeCategory: (value: string) => {
      setProducts([]);
      resetPage();
      setCategory(value);
    },
  };

  const sortOptionState = {
    currentSortOption: sortOption,
    changeSortOption: (value: string) => {
      setProducts([]);
      resetPage();
      setSortOption(sortOptionsMap[value]);
    },
  };

  return {
    products,
    isLoading,
    isLastPage,
    fetchNextPage,
    categoryState,
    sortOptionState,
    errorMessage,
  };
};

export default useProducts;
