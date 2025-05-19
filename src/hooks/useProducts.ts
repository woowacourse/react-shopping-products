import { useState, useEffect } from "react";
import { Product, Category, PriceOrder } from "../types/productType";
import getProducts from "../api/getProducts";

export const PRODUCT_TYPE_COUNT = 20;

const useProducts = ({
  withLoading,
  setErrorMessage,
}: {
  withLoading: (asyncCallback: () => Promise<void>) => void;
  setErrorMessage: (errorMessage: string) => void;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");
  const [priceOrder, setPriceOrder] = useState<PriceOrder>("낮은 가격순");

  const handleCategoryChange = async (category: Category) => {
    withLoading(async () => {
      setSelectedCategory(category);
      const { error, data } = await getProducts({
        category,
        priceOrder,
      });
      setErrorMessage(error?.message || "");
      setProducts(data.content.slice(0, PRODUCT_TYPE_COUNT));
    });
  };

  const handlePriceOrderChange = async (priceOrder: PriceOrder) => {
    withLoading(async () => {
      setPriceOrder(priceOrder);
      const { data, error } = await getProducts({
        category: selectedCategory,
        priceOrder: priceOrder,
      });
      setErrorMessage(error?.message || "");
      setProducts(data.content.slice(0, PRODUCT_TYPE_COUNT));
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      withLoading(async () => {
        const { data, error } = await getProducts();
        setErrorMessage(error?.message || "");
        if (!error?.message) {
          setProducts(data.content.slice(0, PRODUCT_TYPE_COUNT));
        }
      });
    };

    fetchData();
  }, []);

  return {
    handleCategoryChange,
    handlePriceOrderChange,
    selectedCategory,
    priceOrder,
    products,
    setProducts,
  };
};

export default useProducts;
