export const CATEGORY = {
  ALL: '전체',
  FOOD_STUFF: '식료품',
  FASHION: '패션잡화',
} as const;

export const PRICE = [
  {
    name: '낮은 가격순',
    value: 'asc',
  },
  {
    name: '높은 가격순',
    value: 'desc',
  },
] as const;
