import { useCallback, useState } from "react";
import { ProductCategory } from "../types/ProductCategory";
import { ALL_CATEGORY, CATEGORIES } from "../constants/filterOptions";

const contains = <T extends string>(
  value: string,
  list: ReadonlyArray<T>
): value is T => {
  return list.some((item) => item === value);
};

const isProductCategory = (value: string) => {
  return contains<ProductCategory>(value, CATEGORIES);
};

const useProductCategoryFilter = () => {
  const [category, setCategory] = useState<ProductCategory>(ALL_CATEGORY);

  const handleCategory = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      if (!isProductCategory(value)) {
        return;
      }
      setCategory(value);
    },
    []
  );

  return { category, handleCategory };
};

export default useProductCategoryFilter;
