export const sortOptionMap = {
  "낮은 가격 순": "price,asc",
  "높은 가격 순": "price,desc",
} as const;

export type SortOptionKey = keyof typeof sortOptionMap;
export const sortOptions = Object.keys(sortOptionMap) as SortOptionKey[];
