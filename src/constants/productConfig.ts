export const CATEGORY = ['전체', '식료품', '패션잡화'] as const;

export const SORT_PRICE = ['낮은 가격 순', '높은 가격 순'] as const;

export const SORT_PRICE_MAP = {
  '낮은 가격 순': 'asc',
  '높은 가격 순': 'desc',
} as const;
