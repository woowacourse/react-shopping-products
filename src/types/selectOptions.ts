import { CATEGORY, SORT } from '../constants/selectOption';

export type CategoryKey = (typeof CATEGORY)[number];
export type SortKey = (typeof SORT)[number];

export const categoryQueryMap: Record<CategoryKey, string | undefined> = {
  전체: undefined,
  식료품: '식료품',
  패션잡화: '패션잡화',
};

export const sortQueryMap: Record<SortKey, string | undefined> = {
  '순서 없음': undefined,
  '낮은 가격순': 'price,asc',
  '높은 가격순': 'price,desc',
};
