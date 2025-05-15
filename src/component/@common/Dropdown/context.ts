import { createContext, useContext } from 'react';

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

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('DropdownContext not found');
  }
  return context;
};
