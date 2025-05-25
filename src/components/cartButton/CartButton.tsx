import {
  addItemToCart,
  MinusItem,
  PlusItem,
  removeItemToCart,
} from "./cartButton.domain";
import { useData } from "../../hooks/useData";
import { ERROR_TYPE } from "../../hooks/useError";
import { ButtonContainer } from "./CartButton.css";

interface CartButtonProps {
  isToggled: boolean;
  setToggle: (val: boolean) => void;
  productId: number;
  cartId?: number;
  cartAmount: number;
  productQuantity: number;
  quantity?: number;
  setErrorTrue: (type: ERROR_TYPE) => void;
}

function CartButton({
  isToggled,
  setToggle,
  productId,
  cartId,
  productQuantity,
  quantity,
  cartAmount,
  setErrorTrue,
}: CartButtonProps) {
  const { setCartItemIds, fetchCartProducts } = useData();

  const showCountButton = async () => {
    try {
      await addItemToCart({
        productId,
        cartAmount,
        syncCartWithServer: fetchCartProducts,
        setErrorTrue,
      });
      setToggle(!isToggled);
    } catch {
      console.log("추가 실패");
    }
  };

  const handlePlusButton = async () => {
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

  const handleMinusButton = async () => {
    if (quantity === 1) {
      setToggle(!isToggled);
      return handleRemove();
    }
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
        setCartItemIds,
        setErrorTrue,
      });
    } catch {
      console.log("삭제실패");
    }
  };

  if (isToggled) {
    return (
      <>
        <button onClick={handleMinusButton}>-</button>
        <p>{quantity}</p>
        <button onClick={handlePlusButton}>+</button>
      </>
    );
  }

  return (
    <button css={ButtonContainer} onClick={showCountButton}>
      <img src="/addCart.svg" alt="담기 아이콘" />
      <p>담기</p>
    </button>
  );
}

export default CartButton;
