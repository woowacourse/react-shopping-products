// src/contexts/AppProvider.tsx
import { PropsWithChildren } from "react";
import { APIProvider } from "./APIContext";
import { CartProvider } from "./CartContext";
import { ProductProvider } from "./ProductContext";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <APIProvider>
      <CartProvider>
        <ProductProvider>{children}</ProductProvider>
      </CartProvider>
    </APIProvider>
  );
}
