import { Category, SortType } from './Product.types';

import ITEM_CATEGORIES from '@constants/itemCategories';
import ITEM_SORT_TYPES from '@constants/itemSortTypes';

const SORT_TYPE_MATCHER: Record<SortType, string> = {
  '낮은 가격순': 'asc',
  '높은 가격순': 'desc',
};

const CATEGORY_MATCHER: Record<Category, string> = {
  전체: 'all',
  의류: 'fashion',
  음료: 'beverage',
  전자제품: 'electronics',
  주방용품: 'kitchen',
  피트니스: 'fitness',
  도서: 'books',
};

interface ProductEndpoint {
  page: number;
  sortType: (typeof ITEM_SORT_TYPES)[number];
  category: (typeof ITEM_CATEGORIES)[number];
}

export const getProductEndpoint = ({
  category,
  page,
  sortType,
}: ProductEndpoint) =>
  `products?${
    category === '전체' ? '' : `category=${CATEGORY_MATCHER[category]}&`
  }page=${page && page + 4}&size=${page === 0 ? 20 : 4}&sort=price,${
    SORT_TYPE_MATCHER[sortType]
  }`;
