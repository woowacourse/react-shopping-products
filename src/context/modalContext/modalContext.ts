import { createContext } from 'react';

type ModalContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export default ModalContext;
