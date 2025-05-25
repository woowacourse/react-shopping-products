import { useState, useEffect } from "react";
import { Category, PriceOrder } from "../types/productType";

export const PRODUCT_TYPE_COUNT = 20;

const useProducts = ({
  withLoading,
  refetchProducts: refetch,
}: {
  withLoading: (asyncCallback: () => Promise<void>) => void;
  setErrorMessage: (errorMessage: string) => void;
  refetchProducts: () => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");
  const [priceOrder, setPriceOrder] = useState<PriceOrder>("낮은 가격순");

  const handleCategoryChange = (category: Category) => {
    withLoading(async () => {
      setSelectedCategory(category);
    });
  };

  const handlePriceOrderChange = async (priceOrder: PriceOrder) => {
    withLoading(async () => {
      setPriceOrder(priceOrder);
    });
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
