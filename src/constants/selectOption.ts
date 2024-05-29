export enum CATEGORY {
  "all" = "전체",
  "fashion" = "패션",
  "fitness" = "건강",
  "eletronics" = "전자제품",
  "kitchen" = "주방",
  "beverage" = "음료",
  "books" = "도서",
}
export type Category = keyof typeof CATEGORY;

export enum SORT {
  "priceAsc" = "낮은 가격순",
  "priceDesc" = "높은 가격순",
}

export type Sort = keyof typeof SORT;
