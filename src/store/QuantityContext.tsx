import { createContext, Dispatch, SetStateAction } from "react";

interface QuantityContextType {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}
export const QuantityContext = createContext<QuantityContextType | null>(null);
