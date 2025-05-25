import React, { useState } from "react";
import { CategoryOption, FilterOption } from "../../../constants";
import { ContextAction } from "../context/ShoppingContext";

export function useFilter(dispatch: React.Dispatch<ContextAction>) {
  const [filter, setFilter] = useState<FilterOption>("낮은 가격순");
  const [category, setCategory] = useState<CategoryOption>("전체");

  const handleChangeFilter = (value: FilterOption) => {
    setFilter(value);
    dispatch({
      type: "update",
      queryKey: "product",
      payload: { category, filter: value },
    });
  };

  const handleChangeCategory = (value: CategoryOption) => {
    setCategory(value);
    dispatch({
      type: "update",
      queryKey: "product",
      payload: { category: value, filter },
    });
  };
  return { filter, category, handleChangeFilter, handleChangeCategory };
}
