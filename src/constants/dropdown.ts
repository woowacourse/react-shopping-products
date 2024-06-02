export const FILTER = {
  '': '전체',
  fashion: '패션',
  beverage: '음료',
  electronics: '가전',
  kitchen: '주방',
  fitness: '건강',
  books: '도서',
  animal: '동물',
} as const;

export const SORTING = {
  asc: '낮은 가격 순',
  desc: '높은 가격 순',
} as const;
