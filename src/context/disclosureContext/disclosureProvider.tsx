import { useMemo } from 'react';

import useDisclosure from '../../hook/useDisclosure';
import { DisclosureContext } from './disclosureContext';

const DisclosureProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, open, close, toggle } = useDisclosure();

  const contextValue = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [isOpen, open, close, toggle]
  );

  return (
    <DisclosureContext.Provider value={contextValue}>
      {children}
    </DisclosureContext.Provider>
  );
};

export default DisclosureProvider;
