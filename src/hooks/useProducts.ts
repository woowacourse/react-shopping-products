import { useState } from "react";
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

  const handleCategoryChange = async (category: Category) => {
    withLoading(async () => {
      setSelectedCategory(category);
      refetch();
    });
  };

  const handlePriceOrderChange = async (priceOrder: PriceOrder) => {
    withLoading(async () => {
      setPriceOrder(priceOrder);
      refetch();
    });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     withLoading(async () => {
  //       const { data, error } = await getProducts();
  //       setErrorMessage(error?.message || "");
  //       if (!error?.message) {
  //         setProducts(data.content.slice(0, PRODUCT_TYPE_COUNT));
  //       }
  //     });
  //   };

  //   fetchData();
  // }, []);

  return {
    handleCategoryChange,
    handlePriceOrderChange,
    selectedCategory,
    priceOrder,
  };
};

export default useProducts;
