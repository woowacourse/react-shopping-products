import {
  MinusItem,
  PlusItem,
  removeItemToCart,
} from "../components/cartButton/cartButton.domain";
import { ERROR_TYPE } from "./useError";

interface Params {
  cartId?: number;
  productId: number;
  productQuantity: number;
  quantity?: number;
  setErrorTrue: (value: ERROR_TYPE) => void;
  fetchCartProducts: () => void;
  setCartItemIds?: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId" | "quantity", number>[]>
  >;
  onRemoveCallback?: () => void;
}

export function useCartItemActions({
  cartId,
  productId,
  productQuantity,
  quantity,
  setErrorTrue,
  fetchCartProducts,
  setCartItemIds,
  onRemoveCallback,
}: Params) {
  const handlePlus = async () => {
    try {
      await PlusItem({
        cartId,
        productQuantity,
        quantity,
        setErrorTrue,
        syncCartWithServer: fetchCartProducts,
      });
    } catch {
      console.log("추가 실패");
    }
  };

  const handleMinus = async () => {
    if (quantity === 1) return handleRemove();
    try {
      await MinusItem({
        cartId,
        quantity,
        syncCartWithServer: fetchCartProducts,
      });
    } catch {
      console.log("빼기 실패");
    }
  };

  const handleRemove = async () => {
    try {
      await removeItemToCart({
        cartId,
        productId,
        setCartItemIds: setCartItemIds ?? (() => {}),
        setErrorTrue,
      });
      onRemoveCallback?.();
    } catch {
      console.log("삭제실패");
    }
  };

  return { handlePlus, handleMinus, handleRemove };
}
