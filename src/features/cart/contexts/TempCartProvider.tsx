import React, { createContext, useState } from 'react';
import { TempCartProduct } from '../../products/type/product';

interface TempCartContextValue {
  tempCart: TempCartProduct[];
  updateTempCart: (cartProduct: TempCartProduct) => void;
}

export const TempCartContext = createContext<TempCartContextValue | undefined>(undefined);

export const TempCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [tempCart, setTempCart] = useState<TempCartProduct[]>([]);

  const updateTempCart = ({ productId, cartProductId, cartProductQuantity }: TempCartProduct) => {
    setTempCart((prev) => {
      const existingProduct = prev.find((product) => product.cartProductId === cartProductId);
      if (existingProduct) {
        return prev.map((product) =>
          product.cartProductId === cartProductId ? { ...product, cartProductQuantity } : product
        );
      } else {
        return [...prev, { productId, cartProductId, cartProductQuantity }];
      }
    });
  };

  return <TempCartContext.Provider value={{ tempCart, updateTempCart }}>{children}</TempCartContext.Provider>;
};
