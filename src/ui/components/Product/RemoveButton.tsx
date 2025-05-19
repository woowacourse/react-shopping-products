import {
  CartRemoveButton,
  CartButtonImg,
  CartRemoveButtonText,
} from './Product.styles';
import { removeShoppingCart } from "../../../assets";

interface RemoveButtonProps {
  onClick: () => void;
}

export function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <CartRemoveButton onClick={onClick}>
      <CartButtonImg src={removeShoppingCart} alt="빼기" />
      <CartRemoveButtonText>빼기</CartRemoveButtonText>
    </CartRemoveButton>
  );
}

export default RemoveButton;
