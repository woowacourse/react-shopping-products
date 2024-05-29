import { FilterButton } from '@/entities/product';
import { CATEGORY_OPTIONS, ALL, ALL_KR } from '../../model/constants';
import { Category } from '@/entities/product';

const allOption = { value: ALL, label: ALL_KR };

interface FilterCategoryButtonProps {
  value: 'all' | Category;
  onChange: (value: 'all' | Category) => void;
}

export const FilterCategoryButton = ({ value, onChange }: FilterCategoryButtonProps) => (
  <FilterButton
    options={[allOption, ...CATEGORY_OPTIONS]}
    value={value}
    onChange={(newValue: string) => onChange(newValue as 'all' | Category)}
  />
);
