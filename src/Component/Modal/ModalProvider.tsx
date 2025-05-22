import React, { createContext, useState, useContext } from 'react';

interface ModalContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('useModal은 <Modal.Root> 내부에서 사용되어야 합니다.');
  return context;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
