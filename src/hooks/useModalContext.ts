import { createContext, useContext } from 'react';

import type { ModalProps } from '../components/common/Modal';

export const ModalContext = createContext<ModalProps | undefined>(undefined);

export const useModalContext = () => {
  const props = useContext(ModalContext);

  if (!props) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return props;
};
