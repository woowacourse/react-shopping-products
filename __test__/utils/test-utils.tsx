import React from 'react';
import { ToastContextProvider } from '../../src/contexts/ToastContextProvider';
import { CartProvider } from '../../src/contexts/ShoppingCartCountContext';

export const wrapper = ({ children }) => (
  <ToastContextProvider>
    <CartProvider>{children}</CartProvider>
  </ToastContextProvider>
);
