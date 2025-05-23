import { ComponentProps } from 'react';

import DropdownProvider from './context/dropdownProvider';
import DropdownTrigger from './DropdownTrigger';
import DropdownList from './DropdownList';
import DropdownItem from './DropdownItem';

interface DropdownProps extends ComponentProps<'div'> {}

const Dropdown = ({ children }: DropdownProps) => {
  return <DropdownProvider>{children}</DropdownProvider>;
};

Dropdown.Root = Dropdown;
Dropdown.Trigger = DropdownTrigger;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;

export default Dropdown;
