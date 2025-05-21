import { ButtonContainer, RemoveButton } from "./CartToggleButton.css";
import useCartToggleButton from "./useCartToggleButton";

interface CartToggleButtonProps {
  isAdded: boolean;
  productId: number;
  cartId?: number;
  cartAmount: number;
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
  fetchCartProducts: () => void;
}

function CartToggleButton({
  productId,
  cartId,
  cartAmount,
  isAdded,
  setCartItemIds,
  fetchCartProducts,
}: CartToggleButtonProps) {
  const { removeItemToCart, addItemToCart } = useCartToggleButton({
    setCartItemIds,
    fetchCartProducts,
  });

  const buttonProps = isAdded
    ? {
        label: "빼기",
        icon: "removeCart.svg",
        onClick: () => removeItemToCart({ cartId, productId }),
        styles: [ButtonContainer, RemoveButton],
      }
    : {
        label: "담기",
        icon: "addCart.svg",
        onClick: () =>
          addItemToCart({
            productId,
            cartAmount,
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
