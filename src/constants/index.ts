import { SelectOption } from "../components/@common/SelectBox/SelectBox";

export type CategoryOptionsKey = "전체" | "식료품" | "패션잡화";
export const CategoryOptions: SelectOption<CategoryOptionsKey>[] = [
  { value: "전체", label: "전체" },
  { value: "식료품", label: "식료품" },
  { value: "패션잡화", label: "패션잡화" },
];

export type SortOptionsKey = "price,asc" | "price,desc";
export const sortOptions: SelectOption<SortOptionsKey>[] = [
  { value: "price,asc", label: "낮은 가격 순" },
  { value: "price,desc", label: "높은 가격 순" },
];
