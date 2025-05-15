import { ERROR_TYPE } from "../../hooks/useError";
import { ButtonContainer, RemoveButton } from "./CartToggleButton.css";
import { addItemToCart, removeItemToCart } from "./cartToggleButton.domain";

interface CartToggleButtonProps {
  isAdded: boolean;
  productId: number;
  cartId?: number;
  cartAmount: number;
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
  setErrorTrue: (type: ERROR_TYPE) => void;
  fetchCartProducts: () => void;
}

function CartToggleButton({
  productId,
  cartId,
  cartAmount,
  isAdded,
  setCartItemIds,
  setErrorTrue,
  fetchCartProducts,
}: CartToggleButtonProps) {
  return (
    <>
      {isAdded && (
        <button
          css={[ButtonContainer, RemoveButton]}
          onClick={() =>
            removeItemToCart({
              cartId,
              setErrorTrue,
              productId,
              setCartItemIds,
            })
          }
        >
          <img src="/removeCart.svg" alt="담기 아이콘" />
          <p>빼기</p>
        </button>
      )}
      {!isAdded && (
        <button
          css={ButtonContainer}
          onClick={() =>
            addItemToCart({
              cartAmount,
              setErrorTrue,
              productId,
              fetchCartProducts,
            })
          }
        >
          <img src="/addCart.svg" alt="담기 아이콘" />
          <p>담기</p>
        </button>
      )}
    </>
  );
}

export default CartToggleButton;
