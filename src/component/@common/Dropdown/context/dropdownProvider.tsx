import { useMemo } from 'react';

import useDisclosure from '../../../../hook/useDisclosure';
import { DropdownContext } from './dropdownContext';

const DropdownProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, open, close, toggle } = useDisclosure();

  const contextValue = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [isOpen, open, close, toggle]
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      {children}
    </DropdownContext.Provider>
  );
};

export default DropdownProvider;
