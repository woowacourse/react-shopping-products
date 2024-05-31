const INITIAL_DATA_LOAD_COUNT = 20;
const SUBSEQUENT_DATA_LOAD_COUNT = 4;
const MAX_CART_ITEMS_COUNTS = 100;

const CATEGORY: Record<string, string> = {
  all: '전체',
  fashion: '의류',
  beverage: '음료',
  electronics: '전자기기',
  kitchen: '주방용품',
  fitness: '피트니스',
  books: '도서',
} as const;

const SORT: Record<string, string> = {
  priceAsc: '낮은 가격순',
  priceDecs: '높은 가격순',
} as const;

export {
  INITIAL_DATA_LOAD_COUNT,
  SUBSEQUENT_DATA_LOAD_COUNT,
  CATEGORY,
  SORT,
  MAX_CART_ITEMS_COUNTS,
};
