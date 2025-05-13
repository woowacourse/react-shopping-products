import { ComponentProps, createContext, useContext } from 'react';
import useOverlay from '../../../hook/useOverlay';
import {
  dropdownItemStyle,
  dropdownListStyle,
  dropdownTriggerStyle,
} from './Dropdown.styles';
import { SortOption } from '../../../App';

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('DropdownContext not found');
  }
  return context;
};

interface DropdownProps extends ComponentProps<'div'> {}

type DropdownContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};
export const DropdownContext = createContext<DropdownContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

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
  handleClick: (content: SortOption) => void;
  content: string;
}

const DropdownItem = ({ content, handleClick, ...rest }: DropdownItemProps) => {
  const { close } = useDropdownContext();

  const handleSelect = () => {
    close();
    handleClick?.(content as SortOption);
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
