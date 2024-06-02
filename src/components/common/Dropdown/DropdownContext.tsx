import { createContext } from 'react';

interface DropdownContextProps {
  isOpen: boolean;
  selectedOption: string;
  handleOptionClick: (value: string, option: string) => void;
  handleToggleIsOpen: () => void;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(undefined);

export default DropdownContext;
