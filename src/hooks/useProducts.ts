import { useState, useEffect } from "react";
import { Category, PriceOrder } from "../types/productType";

export const PRODUCT_TYPE_COUNT = 20;

const useProducts = ({
  refetchProducts: refetch,
}: {
  setErrorMessage: (errorMessage: string) => void;
  refetchProducts: () => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");
  const [priceOrder, setPriceOrder] = useState<PriceOrder>("낮은 가격순");

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handlePriceOrderChange = async (priceOrder: PriceOrder) => {
    setPriceOrder(priceOrder);
  };

  useEffect(() => {
    refetch();
  }, [selectedCategory, priceOrder]);

  return {
    handleCategoryChange,
    handlePriceOrderChange,
    selectedCategory,
    priceOrder,
  };
};

export default useProducts;
