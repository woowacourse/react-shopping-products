import { Select, SelectOption } from '@/shared';

import css from './FilterButton.module.css';

interface FilterButtonProps {
  className?: string;
  options: SelectOption[];
  value: string;
  onClick: () => void;
}

export const FilterButton = ({ className, options, value, onClick }: FilterButtonProps) => {
  return <Select className={`${css.filterButton} ${className}`} options={options} value={value} onChange={onClick} />;
};
