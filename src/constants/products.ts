import { CategoryType, SortType } from '../types/product';

export const CATEGORY: CategoryType[] = ['전체', '식료품', '패션잡화'];
export const SORT: { [key: string]: SortType } = {
  '낮은 가격 순': 'asc',
  '높은 가격 순': 'desc',
};

export const DEFAULT_IMAGE_URL = './images/default-image.png';
