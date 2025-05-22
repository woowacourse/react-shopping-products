import { ButtonContainer, RemoveButton } from "./CartToggleButton.css";
import { addItemToCart, removeItemToCart } from "./cartToggleButton.domain";
import { useData } from "../../hooks/useData";
import { ERROR_TYPE } from "../../hooks/useError";

interface CartToggleButtonProps {
  isAdded: boolean;
  productId: number;
  cartId?: number;
  cartAmount: number;
  setErrorTrue: (type: ERROR_TYPE) => void;
}

function CartToggleButton({
  isAdded,
  productId,
  cartId,
  cartAmount,
  setErrorTrue,
}: CartToggleButtonProps) {
  const { setCartItemIds, fetchCartProducts } = useData();

  const handleAdd = async () => {
    try {
      await addItemToCart({
        productId,
        cartAmount,
        syncCartWithServer: fetchCartProducts,
        setErrorTrue,
      });
    } catch {
      console.log("추가실패");
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
    <button css={buttonProps.styles} onClick={buttonProps.onClick}>
      <img src={`/${buttonProps.icon}`} alt={`${buttonProps.label} 아이콘`} />
      <p>{buttonProps.label}</p>
    </button>
  );
}

export default CartToggleButton;
