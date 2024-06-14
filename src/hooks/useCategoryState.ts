import { useState } from "react";

interface UseCategoryStateResult {
  currentCategory: string;
  changeCategory: (value: string) => void;
}

const useCategoryState = (): UseCategoryStateResult => {
  const [category, setCategory] = useState<string>("전체");

  const changeCategory = (value: string) => {
    setCategory(value);
  };

  return {
    currentCategory: category,
    changeCategory,
  };
};

export default useCategoryState;
