import ITEM_CATEGORIES from '@constants/itemCategories';
import ITEM_SORT_TYPES from '@constants/itemSortTypes';

export type Category = (typeof ITEM_CATEGORIES)[number];

export type SortType = (typeof ITEM_SORT_TYPES)[number];
