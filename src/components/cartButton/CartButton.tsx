import { useCartProduct } from "../../hooks/useCartProduct";
import { ERROR_TYPE } from "../../hooks/useError";
import { ButtonContainer } from "./CartButton.css";
import { useCartItemActions } from "../../hooks/useCartItemActions";
import ControlButton from "../controlButton/ControlButton";
import { addCartItem } from "../api/addCartItem";

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
  productId,
  cartId,
  productQuantity,
  quantity,
  cartAmount,
  setErrorTrue,
  setToggle,
}: CartButtonProps) {
  const { setCartItemIds, fetchCartProducts } = useCartProduct();
  const { handlePlus, handleMinus } = useCartItemActions({
    cartId,
    productId,
    productQuantity,
    quantity,
    setErrorTrue,
    fetchCartProducts,
    setCartItemIds,
    setToggle,
  });
  const showCountButton = async () => {
    if (productQuantity === 0) {
      return setErrorTrue("CART_ADD");
    }
    try {
      await addCartItem({
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

  if (isToggled) {
    return (
      <ControlButton
        handleMinus={handleMinus}
        handlePlus={handlePlus}
        quantity={quantity}
      />
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
