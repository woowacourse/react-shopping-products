// // CartContext.tsx
// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface CartContextType {
//   cartIdSet: Set<number>;
//   setCartIdSet: React.Dispatch<React.SetStateAction<Set<number>>>;
// }

// // const CartContext2 = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error('useCart must be used within a CartProvider');
//   return context;
// };

// // export const CartProvider: React.FC<{children: ReactNode}> = ({ children }) => {
// //   const [cartIdSet, setCartIdSet] = useState<Set<number>>(new Set());

// //   const value = { cartIdSet, setCartIdSet };

// //   return <CartContext2.Provider value={value}>{children}</CartContext2.Provider>;
// // };
