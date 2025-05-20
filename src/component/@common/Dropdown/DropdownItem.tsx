import { ComponentProps } from 'react';

import { dropdownItemStyle } from './Dropdown.styles';

interface DropdownItemProps extends ComponentProps<'li'> {
  handleClick: (content: string) => void;
  content: string;
}

const DropdownItem = ({ content, handleClick, ...rest }: DropdownItemProps) => {
  const handleSelect = () => {
    close();
    handleClick?.(content);
  };

  return (
    <li onClick={handleSelect} css={dropdownItemStyle} {...rest}>
      {content}
    </li>
  );
};

export default DropdownItem;
