import { Select, SelectOption } from '@/shared';

import css from './FilterButton.module.css';

interface FilterButtonProps {
  className?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export const FilterButton = ({ className, options, value, onChange }: FilterButtonProps) => {
  return <Select className={`${css.filterButton} ${className}`} options={options} value={value} onChange={onChange} />;
};
