import { createContext } from 'react';

interface CartButtonContextValue {
  productId: number;
  isPushed: boolean;
}

export const CartButtonContext = createContext<CartButtonContextValue | null>(
  null
);
