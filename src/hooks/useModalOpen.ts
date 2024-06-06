import { useState } from "react";

type UseModalOpenReturn = [isOpen: boolean, open: () => void, close: () => void];

export const useModalOpen = (): UseModalOpenReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return [isOpen, open, close];
};
