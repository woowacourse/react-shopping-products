import { ComponentProps } from 'react';

import { useDisclosureContext } from '../../../context/disclosureContext/disclosureContext';
import { dropdownTriggerStyle } from './Dropdown.styles';

interface DropdownTriggerProps extends ComponentProps<'div'> {}

const DropdownTrigger = ({ children, ...rest }: DropdownTriggerProps) => {
  const { toggle } = useDisclosureContext();

  return (
    <div onClick={toggle} css={dropdownTriggerStyle} {...rest}>
      {children}
    </div>
  );
};

export default DropdownTrigger;
