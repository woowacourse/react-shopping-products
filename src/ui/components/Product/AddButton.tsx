import {
  CartAddButton,
  CartButtonImg,
  CartAddButtonText,
} from './Product.styles';
import { SHOP_INFO } from '../../../constants/shopInfoConfig';

interface AddButtonProps {
  isDisable: boolean;
  onClick: () => void;
}

function AddButton({ isDisable, onClick }: AddButtonProps) {
  return (
    <CartAddButton disabled={isDisable} onClick={onClick}>
      <CartButtonImg src="./add_shopping_cart.png" alt="담기" />
      <CartAddButtonText>{SHOP_INFO.ADD_BUTTON_TEXT}</CartAddButtonText>
    </CartAddButton>
  );
}

export default AddButton;
