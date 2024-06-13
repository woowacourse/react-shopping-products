import { useState } from "react";

import {
  CategoryKeys,
  ProductOption,
  ProductOptionKeys,
  SortOptionsKeys,
} from "../../constants/products";

export default function useProductsOption() {
  const [options, setOptions] = useState<ProductOption>({ category: "all", sort: "asc" });

  const handleChangeProductsOption = (
    type: ProductOptionKeys,
    value: CategoryKeys | SortOptionsKeys,
  ) => {
    if (options[type] === value) return;

    setOptions((prevOption) => ({ ...prevOption, [type]: value }));
  };

  return {
    options,
    handleChangeProductsOption,
  };
}
