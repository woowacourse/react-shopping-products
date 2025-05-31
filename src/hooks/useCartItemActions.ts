import { removeCartItem } from "../components/api/removeCartItem";
import { MinusCartItem, PlusCartItem } from "../components/api/updateCartItem";
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
  setToggle?: (val: boolean) => void;
}

export function useCartItemActions({
  cartId,
  productId,
  productQuantity,
  quantity,
  setErrorTrue,
  fetchCartProducts,
  setCartItemIds,
  setToggle,
}: Params) {
  const handlePlus = async () => {
    try {
      await PlusCartItem({
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
      await MinusCartItem({
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
      await removeCartItem({
        cartId,
        productId,
        setCartItemIds: setCartItemIds ?? (() => {}),
        setErrorTrue,
      });
      setToggle?.(false);
    } catch {
      console.log("삭제실패");
    }
  };

  return { handlePlus, handleMinus, handleRemove };
}
