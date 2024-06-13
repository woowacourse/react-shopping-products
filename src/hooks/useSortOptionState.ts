import { useState } from "react";

interface UseSortOptionStateResult {
  currentSortOption: string;
  changeSortOption: (value: string) => void;
}

const sortOptionsMap: Record<string, string> = {
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

const useSortOptionState = (): UseSortOptionStateResult => {
  const [sortOption, setSortOption] = useState<string>("price,asc");

  const changeSortOption = (value: string) => {
    setSortOption(sortOptionsMap[value]);
  };

  return {
    currentSortOption: sortOption,
    changeSortOption,
  };
};

export default useSortOptionState;
