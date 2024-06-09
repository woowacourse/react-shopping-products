import { FilterButton } from '@/entities/product';
import { ALL, ALL_KR, Category, CATEGORY_OPTIONS } from '@/shared';

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
