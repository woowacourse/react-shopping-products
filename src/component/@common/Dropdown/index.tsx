import { ComponentProps } from 'react';
import useOverlay from '../../../hook/useOverlay';
import {
  dropdownItemStyle,
  dropdownListStyle,
  dropdownTriggerStyle,
} from './Dropdown.styles';
import { DropdownContext, useDropdownContext } from './context.ts';

interface DropdownProps extends ComponentProps<'div'> {}

const Dropdown = ({ children }: DropdownProps) => {
  const { isOpen, open, close, toggle } = useOverlay();

  return (
    <DropdownContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </DropdownContext.Provider>
  );
};

interface DropdownTriggerProps extends ComponentProps<'div'> {}

const DropdownTrigger = ({ children, ...rest }: DropdownTriggerProps) => {
  const { toggle } = useDropdownContext();

  return (
    <div onClick={toggle} css={dropdownTriggerStyle} {...rest}>
      {children}
    </div>
  );
};

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

interface DropdownItemProps extends ComponentProps<'li'> {
  handleClick: (content: string) => void;
  content: string;
}

const DropdownItem = ({ content, handleClick, ...rest }: DropdownItemProps) => {
  const { close } = useDropdownContext();

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

Dropdown.Root = Dropdown;
Dropdown.Trigger = DropdownTrigger;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;

export default Dropdown;
