import { ComponentProps } from 'react';
import { IconArrowDown } from '../../../asset';
import { arrowIconStyle } from './ArrowIcon.styles';
import { useDropdownContext } from '../Dropdown/context/dropdownContext';

interface ArrowIconProps extends ComponentProps<'img'> {}

const ArrowIcon = ({ ...rest }: ArrowIconProps) => {
  const { isOpen } = useDropdownContext();
  return (
    <img
      src={IconArrowDown}
      alt="arrow-down"
      css={arrowIconStyle(isOpen)}
      {...rest}
    />
  );
};

export default ArrowIcon;
