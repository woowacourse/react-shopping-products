import { ButtonContainer } from "./CartToggleButton.css";

function CartToggleButton() {
  return (
    <button css={ButtonContainer}>
      <img src="/addCart.svg" alt="담기 아이콘" />
      <p>담기</p>
    </button>
  );
}

export default CartToggleButton;
