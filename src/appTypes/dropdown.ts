import { Category, Sort } from './product';

export interface DropdownOption {
  label: string;
  value: Sort | Category;
}
