import { ComponentProps } from 'react';

import { useDisclosureContext } from '../../../context/disclosureContext/disclosureContext';
import { dropdownListStyle } from './Dropdown.styles';

interface DropdownListProps extends ComponentProps<'ul'> {}

const DropdownList = ({ children, ...rest }: DropdownListProps) => {
  const { isOpen } = useDisclosureContext();

  return (
    isOpen && (
      <ul css={dropdownListStyle} {...rest}>
        {children}
      </ul>
    )
  );
};

export default DropdownList;
