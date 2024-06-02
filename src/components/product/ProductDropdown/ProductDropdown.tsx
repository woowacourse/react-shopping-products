import Dropdown from '@components/common/Dropdown/Dropdown';

import { useState } from 'react';

export interface ProductDropdownProps<V extends string> {
  currentOption: string;
  options: Record<string, string>;
  type: 'sort' | 'category';
  onSelect: (type: 'sort' | 'category', option: V) => void;
}

const ProductDropdown = <V extends string>({
  currentOption,
  options,
  type,
  onSelect,
}: ProductDropdownProps<V>) => {
  const targetCategory = currentOption ? options[currentOption] : '';

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => setIsOpen((prev) => !prev);

  const onSelectOption = (type: 'sort' | 'category', option: V) => {
    onSelect(type, option);
    handleToggleDropdown();
  };

  return (
    <Dropdown isOpen={isOpen} onToggleDropdown={handleToggleDropdown}>
      <Dropdown.Trigger value={targetCategory} placeholder="" />
      <Dropdown.Menu>
        {Object.entries(options).map(([optionKey, optionValue]) => (
          <Dropdown.Option
            key={optionKey}
            isSelected={currentOption === optionKey}
            onSelectOption={() => {
              onSelectOption(type, optionKey as V);
            }}
          >
            {optionValue}
          </Dropdown.Option>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProductDropdown;
