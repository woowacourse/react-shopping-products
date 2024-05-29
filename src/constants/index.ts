const INITIAL_DATA_LOAD_COUNT = 20;
const SUBSEQUENT_DATA_LOAD_COUNT = 4;

const CATEGORY = {
  all: '전체',
  fashion: '의류',
  beverage: '음료',
  electronics: '전자기기',
  kitchen: '주방용품',
  fitness: '피트니스',
  books: '도서',
} as const;

export type CategoryType = (typeof CATEGORY)[keyof typeof CATEGORY];

export { INITIAL_DATA_LOAD_COUNT, SUBSEQUENT_DATA_LOAD_COUNT, CATEGORY };
