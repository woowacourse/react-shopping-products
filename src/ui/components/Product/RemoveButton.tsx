import { CartRemoveButton, CartButtonImg, CartRemoveButtonText } from './Product.styles';
import { removeShoppingCart } from '../../../assets';

interface RemoveButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function RemoveButton({ onClick, disabled }: RemoveButtonProps) {
  return (
    <CartRemoveButton onClick={onClick} disabled={disabled}>
      <CartButtonImg src={removeShoppingCart} alt="빼기" />
      <CartRemoveButtonText>빼기</CartRemoveButtonText>
    </CartRemoveButton>
  );
}

export default RemoveButton;
