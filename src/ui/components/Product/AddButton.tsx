import {
  CartAddButton,
  CartButtonImg,
  CartAddButtonText,
} from './Product.styles';

interface AddButtonProps {
  onClick: () => void;
}

function AddButton({ onClick }: AddButtonProps) {
  return (
    <CartAddButton onClick={onClick}>
      <CartButtonImg src="./add_shopping_cart.png" alt="담기" />
      <CartAddButtonText>담기</CartAddButtonText>
    </CartAddButton>
  );
}

export default AddButton;
