import Dropdown from '@components/common/Dropdown/Dropdown';
import { PRODUCT_SORT_MAP } from '@components/product/SortDropdown/SortDropdown.constant';

export interface SortDropdownProps {
  isOpen: boolean;
  sortType: keyof typeof PRODUCT_SORT_MAP;
  onToggleDropdown: () => void;
  onSelectSortTypeOption: (value: keyof typeof PRODUCT_SORT_MAP) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  isOpen,
  sortType,
  onToggleDropdown,
  onSelectSortTypeOption,
}) => {
  const targetSortType = sortType ? PRODUCT_SORT_MAP[sortType] : '';

  const onSelectOption = (sortOption: keyof typeof PRODUCT_SORT_MAP) => {
    onSelectSortTypeOption(sortOption);
    onToggleDropdown();
  };

  return (
    <Dropdown isOpen={isOpen} onToggleDropdown={onToggleDropdown}>
      <Dropdown.Trigger value={targetSortType} placeholder="" />
      <Dropdown.Menu>
        {Object.entries(PRODUCT_SORT_MAP).map(([sortTypeKey, sortTypeValue]) => (
          <Dropdown.Option
            key={sortTypeKey}
            isSelected={sortType === sortTypeKey}
            onSelectOption={() => onSelectOption(sortTypeKey as keyof typeof PRODUCT_SORT_MAP)}
          >
            {sortTypeValue}
          </Dropdown.Option>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;
