import { useEffect, useState } from "react";
import { useError } from "../context/errorContext";
import { fetchProducts } from "../api/products";
import usePagination from "./usePagination";

interface UseProductsResult {
  products: ProductProps[];
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
}

const sortOptionsMap: { [key: string]: string } = {
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setErrorMessage } = useError();
  const { page, isLastPage, handleLastPage, goToNextPage, resetPage } = usePagination();

  const [category, setCategory] = useState<string>("전체");
  const [sortOption, setSortOption] = useState<string>("price,asc");

  const fetchParams = {
    page: page,
    category: category,
    sortOption: sortOption,
    setErrorMessage: setErrorMessage,
  };

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProducts(fetchParams);

      setProducts((prevProducts) =>
        page === 1 ? data.content : [...prevProducts, ...data.content]
      );

      handleLastPage(data.last);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLastPage) getProducts();
  }, [page, sortOption, category]);

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
  };
};

export default useProducts;
