import * as S from "../CartItemButton.styles";
import RemoveCart from "/remove-cart.svg";

const RemoveCartIcon = () => (
  <img src={RemoveCart} alt="장바구니에서 상품 삭제" />
);

interface RemoveFromCartButtonProps {
  onRemove: () => void;
}

const RemoveFromCartButton = ({ onRemove }: RemoveFromCartButtonProps) => {
  return (
    <S.CartItemButton $isAdd={true} onClick={onRemove}>
      <RemoveCartIcon />
      <S.CartItemAddText>빼기</S.CartItemAddText>
    </S.CartItemButton>
  );
};

export default RemoveFromCartButton;
