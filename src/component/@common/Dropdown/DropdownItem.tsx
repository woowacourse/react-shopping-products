import { ComponentProps } from 'react';

import { useDisclosureContext } from '../../../context/disclosureContext/disclosureContext';
import { dropdownItemStyle } from './Dropdown.styles';

import { CategoryOption } from '../../../types/common';
import { SortOption } from '../../../types/common';

interface DropdownItemProps<T extends CategoryOption | SortOption>
  extends Omit<ComponentProps<'li'>, 'onClick'> {
  content: T;
  onClick: (content: T) => void;
}

const DropdownItem = <T extends CategoryOption | SortOption>({
  content,
  onClick,
  ...rest
}: DropdownItemProps<T>) => {
  const { close } = useDisclosureContext();

  const handleSelect = () => {
    close();
    onClick?.(content);
  };

  return (
    <li onClick={handleSelect} css={dropdownItemStyle} {...rest}>
      {content}
    </li>
  );
};

export default DropdownItem;
