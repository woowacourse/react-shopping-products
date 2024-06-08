import { useState } from "react";

import {
  CategoryKeys,
  ProductOption,
  ProductOptionKeys,
  SortOptionsKeys,
} from "../../constants/products";

export default function useProductsOption() {
  const [options, setOptions] = useState<ProductOption>({ category: "all", sort: "asc" }); // TODO : 브콜에게 왜 객체 형태로 관리하게 되었는지 설명하기

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
