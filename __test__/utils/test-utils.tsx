import React from 'react';
import { ToastContextProvider } from '../../src/context/ToastContextProvider';
import { CartProvider } from '../../src/context/ShoppingCartCountContext';

export const wrapper = ({ children }) => (
  <ToastContextProvider>
    <CartProvider>{children}</CartProvider>
  </ToastContextProvider>
);
