import { useEffect, useState } from "react";
import { useError } from "../context/errorContext";
import { fetchProducts } from "../api/products";

interface UseProductsResult {
  products: ProductProps[];
  isLoading: boolean;
  page: number;
  fetchNextPage: () => void;
  isLastPage: boolean;
  setSortOption: (sortOption: string) => void;
  setCategory: (category: string) => void;
  resetPage: () => void;
  selectedCategory: string;
  selectedSort: string;
}

const sortOptionsMap: { [key: string]: string } = {
  "price,asc": "낮은 가격순",
  "price,desc": "높은 가격순",
};

const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setErrorMessage } = useError();
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("price,asc");
  const [category, setCategory] = useState<string>("전체");

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

      setIsLastPage(data.last);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [setErrorMessage, page, sortOption, category]);

  const fetchNextPage = () => {
    if (!isLastPage && !isLoading) setPage((prevPage) => prevPage + 1);
  };

  const resetPage = () => {
    setProducts([]);
    setPage(1);
    setIsLastPage(false);
  };

  return {
    products,
    isLoading,
    page,
    isLastPage,
    fetchNextPage,
    setSortOption,
    setCategory,
    resetPage,
    selectedCategory: category,
    selectedSort: sortOptionsMap[sortOption],
  };
};

export default useProducts;
