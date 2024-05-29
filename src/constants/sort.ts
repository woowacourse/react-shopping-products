export const SORT = {
  asc: "낮은 가격순",
  desc: "높은 가격순",
} as const;

export type Sort = keyof typeof SORT;

export const SORT_LIST = Object.keys(SORT) as Sort[];
