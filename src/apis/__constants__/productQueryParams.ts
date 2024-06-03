export const PRODUCT_QUERY_PARAMS = {
  page: "page",
  pageSize: "size",
  category: "category",
  sort: "sort",
} as const;

export const CATEGORY_OPTIONS = {
  all: "all",
  electronics: "electronics",
  books: "books",
  fashion: "fashion",
  kitchen: "kitchen",
  fitness: "fitness",
} as const;

export const SORT_OPTIONS = {
  asc: "asc",
  desc: "desc",
} as const;

export const PRICE_SORT_OPTIONS = {
  asc: `price,${SORT_OPTIONS.asc}`,
  desc: `price,${SORT_OPTIONS.desc}`,
} as const;
