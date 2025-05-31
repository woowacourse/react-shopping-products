import * as S from "../CartItemButton.styles";
import AddCart from "/add-cart.svg";

const AddCartIcon = () => <img src={AddCart} alt="장바구니에서 상품 추가" />;

interface AddToCartButtonProps {
  onAdd: () => void;
  disabled?: boolean;
}

const AddToCartButton = ({ onAdd, disabled }: AddToCartButtonProps) => {
  return (
    <S.CartItemButton
      $isAdd={false}
      onClick={onAdd}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      <AddCartIcon />
      <S.CartItemAddText>담기</S.CartItemAddText>
    </S.CartItemButton>
  );
};

export default AddToCartButton;
