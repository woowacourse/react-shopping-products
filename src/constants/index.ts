export const categoryOptions = [
  "전체",
  "fashion",
  "beverage",
  "electronics",
  "kitchen",
  "fitness",
  "books",
];

export const sortOptions = ["낮은 가격순", "높은 가격순"];

export const PAGE = {
  FIRST_PAGE: 0,
  FIRST_PAGE_LIMIT: 20,
  SECOND_PAGE_STD: 5,
  NEXT_PAGE_STEP: 1,
  OTHER_PAGE_LIMIT: 4,
  FIRST_PAGE_START: 0,
  OTHER_PAGE_START: 2,
};

export const STYLE_OPTION = {
  HEADER_Z_INDEX: 10,
};

export const COUNTER_BUTTON_TYPES = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
} as const;

export const CART = {
  QUANTITY_CHANGE_STEP: 1,
};

export const QUERY_KEYS = {
  CART: "cart",
  PRODUCTS: "products",
};
