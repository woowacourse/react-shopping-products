import { useState } from "react";
import CartManageButton from "../cartAddButton/CartManageButton";
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
  const [quantity, setQuantity] = useState(1);

  function increase() {
    setQuantity((prev) => prev + 1);
  }

  function decrease() {
    if (quantity === 1) {
      removeItemToCart({ cartId, productId });
      setQuantity(1);
      return;
    }
    setQuantity((prev) => prev - 1);
  }

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

  return isAdded ? (
    <CartManageButton
      quantity={quantity}
      increase={increase}
      decrease={decrease}
    />
  ) : (
    <button css={buttonProps.styles} onClick={buttonProps.onClick}>
      <img src={buttonProps.icon} alt={`${buttonProps.label} 아이콘`} />
      <p>{buttonProps.label}</p>
    </button>
  );
}

export default CartToggleButton;
