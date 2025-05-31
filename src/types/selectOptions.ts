export const CATEGORIES = {
  all: {
    key: 'all',
    label: '전체',
    apiValue: undefined,
  },
  grocery: {
    key: 'grocery',
    label: '식료품',
    apiValue: '식료품',
  },
  fashion: {
    key: 'fashion',
    label: '패션잡화',
    apiValue: '패션잡화',
  },
} as const;

export const SORTS = {
  none: {
    key: 'none',
    label: '순서 없음',
    apiValue: undefined,
  },
  priceAsc: {
    key: 'priceAsc',
    label: '낮은 가격순',
    apiValue: 'price,asc',
  },
  priceDesc: {
    key: 'priceDesc',
    label: '높은 가격순',
    apiValue: 'price,desc',
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
export type SortKey = keyof typeof SORTS;

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];
export const SORT_KEYS = Object.keys(SORTS) as SortKey[];

export const CATEGORY_LABELS = Object.values(CATEGORIES).map((cat) => cat.label);
export const SORT_LABELS = Object.values(SORTS).map((sort) => sort.label);

export const getCategoryByKey = (key: CategoryKey) => CATEGORIES[key];
export const getSortByKey = (key: SortKey) => SORTS[key];

export const getCategoryKeyByLabel = (label: string): CategoryKey | undefined => {
  return Object.keys(CATEGORIES).find((key) => CATEGORIES[key as CategoryKey].label === label) as
    | CategoryKey
    | undefined;
};

export const getSortKeyByLabel = (label: string): SortKey | undefined => {
  return Object.keys(SORTS).find((key) => SORTS[key as SortKey].label === label) as
    | SortKey
    | undefined;
};
