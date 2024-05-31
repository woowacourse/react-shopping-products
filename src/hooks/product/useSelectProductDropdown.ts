import {
  ProductDropdownOptionKeys,
  ProductDropdownOptions,
} from '@components/product/ProductDropdown/ProductDropdown.type';
import { useState } from 'react';

const useSelectProductDropdown = (onResetPage: () => void, onResetProducts: () => void) => {
  const [dropdownOptions, setDropdownOptions] = useState<ProductDropdownOptions>({
    sort: 'asc',
    category: 'all',
  });

  const onSelectOption = <T extends ProductDropdownOptionKeys>(
    type: 'sort' | 'category',
    option: T
  ) => {
    setDropdownOptions((prevDropdownOptions) =>
      prevDropdownOptions[type] === option
        ? prevDropdownOptions
        : { ...prevDropdownOptions, [type]: option }
    );
    onResetPage();
    onResetProducts();
  };

  return {
    dropdownOptions,
    onSelectOption,
  };
};

export default useSelectProductDropdown;
