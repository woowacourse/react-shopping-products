import {
  CartAddButton,
  CartButtonImg,
  CartAddButtonText,
} from './Product.styles';
import { addShoppingCart } from "../../../assets";

interface AddButtonProps {
  onClick: () => void;
}

function AddButton({ onClick }: AddButtonProps) {
  return (
    <CartAddButton onClick={onClick}>
      <CartButtonImg src={addShoppingCart} alt="담기" />
      <CartAddButtonText>담기</CartAddButtonText>
    </CartAddButton>
  );
}

export default AddButton;
