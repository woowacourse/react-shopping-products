import { useState } from 'react';

export default function useToast(initialState: boolean) {
  const [isToastOpen, setIsToastOpen] = useState<boolean>(initialState);

  const closeToast = () => setIsToastOpen(false);

  return {
    isToastOpen,
    closeToast,
  };
}
