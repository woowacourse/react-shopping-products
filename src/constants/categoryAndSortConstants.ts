export const CATEGORY: Record<string, string> = {
  all: '전체',
  fashion: '의류',
  beverage: '음료',
  electronics: '전자기기',
  kitchen: '주방용품',
  fitness: '피트니스',
  books: '도서',
} as const;

export const SORT: Record<string, string> = {
  asce: '낮은 가격순',
  desc: '높은 가격순',
} as const;
