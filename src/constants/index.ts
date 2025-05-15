export const sortOptionsMap = {
  "낮은 가격 순": "price,asc",
  "높은 가격 순": "price,desc",
} as const;

export type SortOptionsKey = keyof typeof sortOptionsMap;
export const sortOptions = Object.keys(sortOptionsMap) as SortOptionsKey[];

export type CategoryOptionsKey = "전체" | "식료품" | "패션잡화";
export const CategoryOptions = ["전체", "식료품", "패션잡화"];
