import { ComponentProps } from 'react';
import { IconArrowDown } from '../../../asset';
import { arrowIconStyle } from './ArrowIcon.styles';
import { useDisclosureContext } from '../../../context/disclosureContext/disclosureContext';

interface ArrowIconProps extends ComponentProps<'img'> {}

const ArrowIcon = ({ ...rest }: ArrowIconProps) => {
  const { isOpen } = useDisclosureContext();
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
