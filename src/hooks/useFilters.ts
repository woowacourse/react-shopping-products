import { CATEGORIES, SORTS } from "@/constants/product";
import { Category, Sort } from "@/types";
import { ChangeEvent, useState } from "react";

const useFilters = () => {
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<Sort>("price,id,asc");

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Category;
    if (CATEGORIES.includes(value)) {
      setCategory(value);
    }
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Sort;
    if (SORTS.includes(value)) {
      setSort(value);
    }
  };

  return { category, sort, handleCategoryChange, handleSortChange };
};

export default useFilters;
