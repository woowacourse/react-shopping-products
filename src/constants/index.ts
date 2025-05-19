import { FilterType, SortType } from "../types";

interface OptionType {
  FILTER: FilterType[];
  SORT: SortType[];
}

export const OPTION: OptionType = {
  FILTER: ["전체", "식료품", "패션잡화"],
  SORT: ["높은 가격순", "낮은 가격순"],
};
