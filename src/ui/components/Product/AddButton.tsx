import {
  CartAddButton,
  CartButtonImg,
  CartAddButtonText,
} from './Product.styles';

interface AddButtonProps {
  isDisable: boolean;
  onClick: () => void;
}

function AddButton({ isDisable, onClick }: AddButtonProps) {
  return (
    <CartAddButton disabled={isDisable} onClick={onClick}>
      <CartButtonImg src="./add_shopping_cart.png" alt="담기" />
      <CartAddButtonText>담기</CartAddButtonText>
    </CartAddButton>
  );
}

export default AddButton;
