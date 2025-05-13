import { ButtonContainer, RemoveButton } from "./CartToggleButton.css";
import { CartToggleButtonProps } from "./CartToggleButton.types";

function CartToggleButton({ isAdded }: CartToggleButtonProps) {
  return (
    <>
      {isAdded && (
        <button css={[ButtonContainer, RemoveButton]}>
          <img src="/removeCart.svg" alt="담기 아이콘" />
          <p>빼기</p>
        </button>
      )}
      {!isAdded && (
        <button css={ButtonContainer}>
          <img src="/addCart.svg" alt="담기 아이콘" />
          <p>담기</p>
        </button>
      )}
    </>
  );
}

export default CartToggleButton;
