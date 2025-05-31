import { ComponentProps } from 'react';
import {
  dropdownItemStyle,
  dropdownListStyle,
  dropdownTriggerStyle,
} from './Dropdown.styles';
import { DropdownContext, useDropdownContext } from './context.ts';
import useBoolean from '../../../hook/useBoolean.ts';

interface DropdownProps extends ComponentProps<'div'> {}

const Dropdown = ({ children }: DropdownProps) => {
  const {
    value: isOpen,
    setTrue: open,
    setFalse: close,
    toggle,
  } = useBoolean(false);

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
