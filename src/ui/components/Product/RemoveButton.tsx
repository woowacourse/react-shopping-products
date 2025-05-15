import {
  CartRemoveButton,
  CartButtonImg,
  CartRemoveButtonText,
} from './Product.styles';

interface RemoveButtonProps {
  onClick: () => void;
}

export function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <CartRemoveButton onClick={onClick}>
      <CartButtonImg src="./remove_shopping_cart.png" alt="빼기" />
      <CartRemoveButtonText>빼기</CartRemoveButtonText>
    </CartRemoveButton>
  );
}

export default RemoveButton;
