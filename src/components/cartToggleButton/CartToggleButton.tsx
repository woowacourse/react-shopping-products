import { ERROR_TYPE } from "../../hooks/useError";
import { ButtonContainer, RemoveButton } from "./CartToggleButton.css";
import { addItemToCart, removeItemToCart } from "./cartToggleButton.domain";
import { useState } from "react";

interface CartToggleButtonProps {
  isAdded: boolean;
  productId: number;
  cartId?: number;
  cartAmount: number;
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
  setErrorTrue: (type: ERROR_TYPE) => void;
  syncCartWithServer: () => void;
}

function CartToggleButton({
  productId,
  cartId,
  cartAmount,
  isAdded,
  setCartItemIds,
  setErrorTrue,
  syncCartWithServer,
}: CartToggleButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await addItemToCart({
        productId,
        cartAmount,
        syncCartWithServer,
        setErrorTrue,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await removeItemToCart({
        cartId,
        productId,
        setCartItemIds,
        setErrorTrue,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buttonProps = isAdded
    ? {
        label: "빼기",
        icon: "removeCart.svg",
        onClick: handleRemove,
        styles: [ButtonContainer, RemoveButton],
      }
    : {
        label: "담기",
        icon: "addCart.svg",
        onClick: handleAdd,
        styles: ButtonContainer,
      };

  return (
    <button
      css={buttonProps.styles}
      onClick={buttonProps.onClick}
      disabled={isLoading}
    >
      <img src={buttonProps.icon} alt={`${buttonProps.label} 아이콘`} />
      <p>{buttonProps.label}</p>
    </button>
  );
}

export default CartToggleButton;
