import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../apis/product";
import { Content } from "../types/product";

const useProducts = () => {
  const [products, setProducts] = useState<Content[]>([]);
  const [filter, setFilter] = useState("전체");
  const [sort, setSort] = useState("높은 가격순");

  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [productsErrorMessage, setProductsErrorMessage] = useState("");

  const getProduct = async () => {
    try {
      const data = await getProducts({ page: 0, size: 20 });
      setProducts(data.content);
    } catch (e) {
      if (e instanceof Error) setProductsErrorMessage(e.message);
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((product) => filter === "전체" || product.category === filter)
      .sort((a, b) => (sort === "높은 가격순" ? b.price - a.price : a.price - b.price));
  }, [products, filter, sort]);

  useEffect(() => {
    getProduct().then(() => {
      setIsProductsLoading(false);
    });
  }, []);

  return {
    products: filteredAndSortedProducts,
    filter,
    setFilter,
    sort,
    setSort,
    isProductsLoading,
    productsErrorMessage,
    setProductsErrorMessage,
  };
};

export default useProducts;
