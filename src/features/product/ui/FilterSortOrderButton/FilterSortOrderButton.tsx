import { FilterButton, SortOrder } from '@/entities/product';
import { SORT_ORDER_OPTIONS } from '../../model/constants';

interface FilterSortOrderButtonProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

export const FilterSortOrderButton = ({ value, onChange }: FilterSortOrderButtonProps) => (
  <FilterButton
    options={SORT_ORDER_OPTIONS}
    value={value}
    onChange={(newValue: string) => onChange(newValue as SortOrder)}
  />
);
