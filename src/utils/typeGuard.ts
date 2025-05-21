import { Category, SortOption } from '../types/product.type';
import {
  CATEGORY,
  SORT_OPTION,
} from '../components/ProductListToolBar/toolBar.constant';

const isCategory = (value: string): value is Category =>
  CATEGORY.includes(value as Category);

const isSortOption = (value: string): value is SortOption =>
  SORT_OPTION.includes(value as SortOption);

export { isCategory, isSortOption };
