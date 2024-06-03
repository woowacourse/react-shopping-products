import { CATEGORY_OPTIONS, PRICE_SORT_OPTIONS } from "@apis/__constants__/productQueryParams";

export const PRICE_SORT_SELECT_OPTIONS = [
  { value: PRICE_SORT_OPTIONS.asc, label: "낮은 가격순" },
  { value: PRICE_SORT_OPTIONS.desc, label: "높은 가격순" },
];

export const CATEGORY_SELECT_OPTIONS = [
  { value: CATEGORY_OPTIONS.all, label: "전체" },
  { value: CATEGORY_OPTIONS.electronics, label: "전자제품" },
  { value: CATEGORY_OPTIONS.books, label: "도서" },
  { value: CATEGORY_OPTIONS.fashion, label: "패션" },
  {
    value: CATEGORY_OPTIONS.kitchen,
    label: "주방용품",
  },
  { value: CATEGORY_OPTIONS.fitness, label: "운동기구" },
];
