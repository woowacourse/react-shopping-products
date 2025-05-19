import { useCallback, useEffect, useMemo, useState } from "react";
import { getProducts } from "../apis/product";
import { Content } from "../types/product";
import { useErrorMessage } from "../contexts";

const useProducts = () => {
  const [products, setProducts] = useState<Content[]>([]);
  const [filter, setFilter] = useState("전체");
  const [sort, setSort] = useState("높은 가격순");

  const [isProductsLoading, setIsProductsLoading] = useState(true);

  const { setErrorMessage } = useErrorMessage();

  const getProduct = useCallback(async () => {
    try {
      const data = await getProducts({ page: 0, size: 20 });
      setProducts(data.content);
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  }, [setErrorMessage]);

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((product) => filter === "전체" || product.category === filter)
      .sort((a, b) => (sort === "높은 가격순" ? b.price - a.price : a.price - b.price));
  }, [products, filter, sort]);

  useEffect(() => {
    getProduct().then(() => {
      setIsProductsLoading(false);
    });
  }, [getProduct]);

  return {
    products: filteredAndSortedProducts,
    filter,
    setFilter,
    sort,
    setSort,
    isProductsLoading,
  };
};

export default useProducts;
