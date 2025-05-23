import { ComponentProps } from 'react';

import { useDropdownContext } from './context/dropdownContext';
import { dropdownListStyle } from './Dropdown.styles';

interface DropdownListProps extends ComponentProps<'ul'> {}

const DropdownList = ({ children, ...rest }: DropdownListProps) => {
  const { isOpen } = useDropdownContext();

  return (
    isOpen && (
      <ul css={dropdownListStyle} {...rest}>
        {children}
      </ul>
    )
  );
};

export default DropdownList;
