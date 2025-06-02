import { ComponentProps } from 'react';
import { IconArrowDown } from '../../../asset';
import { dropdownArrowIconStyle } from './Dropdown.styles';
import { useDisclosureContext } from '../../../context/disclosureContext/disclosureContext';

interface ArrowIconProps extends ComponentProps<'img'> {}

const DropdownArrowIcon = ({ ...rest }: ArrowIconProps) => {
  const { isOpen } = useDisclosureContext();
  return (
    <img
      src={IconArrowDown}
      alt="arrow-down"
      css={dropdownArrowIconStyle(isOpen)}
      {...rest}
    />
  );
};

export default DropdownArrowIcon;
