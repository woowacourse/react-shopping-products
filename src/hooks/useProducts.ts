import { useState } from "react";
import { Product, Category, PriceOrder } from "../types/productType";
import getProducts from "../api/getProducts";

const PRODUCT_TYPE_COUNT = 20;

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
    await withLoading(async () => {
      setSelectedCategory(category);
      const { data, newErrorMessage } = await getProducts({
        category,
        priceOrder,
      });
      setErrorMessage(newErrorMessage);
      setProducts(data.content.slice(0, PRODUCT_TYPE_COUNT));
    });
  };

  const handlePriceOrderChange = async (priceOrder: PriceOrder) => {
    await withLoading(async () => {
      setPriceOrder(priceOrder);
      const { data, newErrorMessage } = await getProducts({
        category: selectedCategory,
        priceOrder: priceOrder,
      });
      setErrorMessage(newErrorMessage);
      setProducts(data.content.slice(0, PRODUCT_TYPE_COUNT));
    });
  };
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
