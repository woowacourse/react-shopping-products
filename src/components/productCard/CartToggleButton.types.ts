import { ERROR_TYPE } from "../../hooks/useError";

export interface CartToggleButtonProps {
  isAdded: boolean;
  productId: number;
  cartId?: number;
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
  setErrorTrue: (type: ERROR_TYPE) => void;
}
