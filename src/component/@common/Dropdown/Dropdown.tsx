import { ComponentProps } from 'react';

import DisclosureProvider from '../../../context/disclosureContext/disclosureProvider';
import DropdownTrigger from './DropdownTrigger';
import DropdownList from './DropdownList';
import DropdownItem from './DropdownItem';
import DropdownArrowIcon from './DropdownArrowIcon';

interface DropdownProps extends ComponentProps<'div'> {}

const Dropdown = ({ children }: DropdownProps) => {
  return <DisclosureProvider>{children}</DisclosureProvider>;
};

Dropdown.Root = Dropdown;
Dropdown.Trigger = DropdownTrigger;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;
Dropdown.ArrowIcon = DropdownArrowIcon;

export default Dropdown;
