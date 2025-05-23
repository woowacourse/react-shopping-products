import {
  CartAddButton,
  CartButtonImg,
  CartAddButtonText,
} from './Product.styles';
import { addShoppingCart } from "../../../assets";

interface AddButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

function AddButton({ onClick, disabled = false }: AddButtonProps) {
  return (
    <CartAddButton onClick={onClick} disabled={disabled}>
      <CartButtonImg src={addShoppingCart} alt="담기" />
      <CartAddButtonText>담기</CartAddButtonText>
    </CartAddButton>
  );
}

export default AddButton;
