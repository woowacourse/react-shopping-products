import { useMemo } from 'react';
import useDisclosure from '../../hook/useDisclosure';
import ModalContext from './modalContext';

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, open, close } = useDisclosure();

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
    }),
    [isOpen, open, close]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
