import { useCallback, useState } from "react";
import { PriceSort } from "../../types/Sort";
import {
  LOW_PRICE_SORT_KEY,
  PRICE_SORTS_KEYS,
} from "../../constants/filterOptions";

const contains = <T extends string>(
  value: string,
  list: ReadonlyArray<T>
): value is T => {
  return list.some((item) => item === value);
};

const isProductPriceSort = (value: string): value is PriceSort => {
  return contains<PriceSort>(value, PRICE_SORTS_KEYS);
};

const useProductSortFilter = () => {
  const [sort, setSort] = useState<PriceSort>(LOW_PRICE_SORT_KEY);

  const handleSort = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      if (!isProductPriceSort(value)) {
        return;
      }
      setSort(value);
    },
    []
  );

  return { sort, handleSort };
};

export default useProductSortFilter;
