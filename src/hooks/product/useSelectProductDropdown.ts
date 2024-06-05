import {
  ProductDropdownOptionKeys,
  ProductDropdownOptions,
} from '@components/product/ProductDropdown/ProductDropdown.type';
import { useState } from 'react';

const useSelectProductDropdown = () => {
  const [dropdownOptions, setDropdownOptions] = useState<ProductDropdownOptions>({
    sort: 'asc',
    category: 'all',
  });

  const onSelectOption = <T extends ProductDropdownOptionKeys>(
    type: 'sort' | 'category',
    option: T
  ) => {
    if (dropdownOptions[type] === option) return;

    setDropdownOptions((prevDropdownOptions) => ({ ...prevDropdownOptions, [type]: option }));
  };

  return {
    dropdownOptions,
    onSelectOption,
  };
};

export default useSelectProductDropdown;
