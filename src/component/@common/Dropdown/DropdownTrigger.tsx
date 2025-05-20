import { ComponentProps } from 'react';

import { useDropdownContext } from './context/dropdownContext';
import { dropdownTriggerStyle } from './Dropdown.styles';

interface DropdownTriggerProps extends ComponentProps<'div'> {}

const DropdownTrigger = ({ children, ...rest }: DropdownTriggerProps) => {
  const { toggle } = useDropdownContext();

  return (
    <div onClick={toggle} css={dropdownTriggerStyle} {...rest}>
      {children}
    </div>
  );
};

export default DropdownTrigger;
