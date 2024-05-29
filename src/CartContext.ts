import  { createContext } from 'react';
import useFetchAddCart from './hooks/useFetchAddCart';

// interface CartState {
//   cartIdSet: Set<number>;
//   setCartIdSet: React.Dispatch<React.SetStateAction<Set<number>>>;
// }
export const CartContext = createContext<ReturnType<typeof useFetchAddCart>>({
  cartIdSet: new Set(),
  setCartIdSet: () => {},
  patchToAddCart: () => {},
  patchToRemoveCart: () => {},
  fetchCart: async () => [],
});


