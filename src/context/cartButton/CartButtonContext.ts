import { createContext } from 'react';

interface CartButtonContextValue {
  productId: number;
  isPushed: boolean;
  setIsPushed: (newValue: boolean) => void;
}

export const CartButtonContext = createContext<CartButtonContextValue | null>(
  null
);
