import {
  CartRemoveButton,
  CartButtonImg,
  CartRemoveButtonText,
} from './Product.styles';
import { SHOP_INFO } from '../../../constants/shopInfoConfig';

interface RemoveButtonProps {
  onClick: () => void;
}

export function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <CartRemoveButton onClick={onClick}>
      <CartButtonImg src="./remove_shopping_cart.png" alt="빼기" />
      <CartRemoveButtonText>
        {SHOP_INFO.REMOVE_BUTTON_TEXT}
      </CartRemoveButtonText>
    </CartRemoveButton>
  );
}

export default RemoveButton;
