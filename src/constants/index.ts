const INITIAL_DATA_LOAD_COUNT = 20;
const SUBSEQUENT_DATA_LOAD_COUNT = 4;
const JUMP_NEXT_PAGE_IN_ZERO = 5;
const MAX_CART_ITEMS_COUNTS = 100;
const CHANGE_CART_ITEM_COUNT = 1;

const CATEGORY = {
  all: '전체',
  fashion: '의류',
  beverage: '음료',
  electronics: '전자기기',
  kitchen: '주방용품',
  fitness: '피트니스',
  books: '도서',
} as const;

const SORT = {
  price_name_asc: '낮은 가격순',
  price_name_desc: '높은 가격순',
} as const;

export {
  INITIAL_DATA_LOAD_COUNT,
  SUBSEQUENT_DATA_LOAD_COUNT,
  JUMP_NEXT_PAGE_IN_ZERO,
  CATEGORY,
  SORT,
  MAX_CART_ITEMS_COUNTS,
  CHANGE_CART_ITEM_COUNT,
};
