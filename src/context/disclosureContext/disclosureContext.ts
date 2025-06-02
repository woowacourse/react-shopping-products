import { createContext, useContext } from 'react';

type DisclosureContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const DisclosureContext = createContext<DisclosureContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export const useDisclosureContext = () => {
  const context = useContext(DisclosureContext);
  if (!context) {
    throw new Error('DisclosureContext not found');
  }
  return context;
};
