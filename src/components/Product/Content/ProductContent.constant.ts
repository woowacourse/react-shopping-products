export const FILTER_OPTIONS = [
  {
    value: "전체",
    label: "전체",
  },
  {
    value: "식료품",
    label: "식료품",
  },
  {
    value: "패션잡화",
    label: "패션잡화",
  },
] as const;

export const SORT_OPTIONS = [
  {
    value: "price,asc",
    label: "낮은 가격순",
  },
  {
    value: "price,desc",
    label: "높은 가격순",
  },
] as const;
