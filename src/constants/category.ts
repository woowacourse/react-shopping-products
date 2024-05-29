export const CATEGORY = {
  all: "전체",
  fashion: "패션",
  beverage: "음료",
  electronics: "전자",
  kitchen: "주방용품",
  fitness: "피트니스",
  books: "책",
} as const;

export type Category = keyof typeof CATEGORY;

export const CATEGORY_LIST = Object.keys(CATEGORY) as Category[];
