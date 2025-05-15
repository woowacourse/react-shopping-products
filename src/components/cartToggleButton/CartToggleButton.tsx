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
  const buttonProps = isAdded
    ? {
        label: "빼기",
        icon: "removeCart.svg",
        onClick: () =>
          removeItemToCart({ cartId, productId, setCartItemIds, setErrorTrue }),
        styles: [ButtonContainer, RemoveButton],
      }
    : {
        label: "담기",
        icon: "addCart.svg",
        onClick: () =>
          addItemToCart({
            productId,
            cartAmount,
            fetchCartProducts,
            setErrorTrue,
          }),
        styles: ButtonContainer,
      };

  return (
    <button css={buttonProps.styles} onClick={buttonProps.onClick}>
      <img src={buttonProps.icon} alt={`${buttonProps.label} 아이콘`} />
      <p>{buttonProps.label}</p>
    </button>
  );
}

export default CartToggleButton;
