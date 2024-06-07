import { CATEGORIES, SORTS } from "@/constants/product";
import { Category, Sort } from "@/types";
import { ChangeEvent, useState } from "react";

const useFilters = () => {
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<Sort>("price,id,asc");

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (CATEGORIES.includes(event.target.value)) {
      setCategory(event.target.value);
    }
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (SORTS.includes(event.target.value)) {
      setSort(event.target.value);
    }
  };

  return { category, sort, handleCategoryChange, handleSortChange };
};

export default useFilters;
