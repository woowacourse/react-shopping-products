import * as S from "./CartItemButton.styles";
import AddCart from "/add-cart.svg";
import RemoveCart from "/remove-cart.svg";

const AddCartIcon = () => <img src={AddCart} alt="장바구니에서 상품 추가" />;
const RemoveCartIcon = () => (
  <img src={RemoveCart} alt="장바구니에서 상품 삭제" />
);

interface Props {
  isAdded: boolean;
  onToggleCartItem: () => void;
}

const CartItemButton = ({ isAdded, onToggleCartItem }: Props) => {
  return (
    <>
      <S.CartItemButton $isAdded={isAdded} onClick={onToggleCartItem}>
        {isAdded ? <RemoveCartIcon /> : <AddCartIcon />}
        <S.CartItemAddText>{isAdded ? "빼기" : "담기"}</S.CartItemAddText>
      </S.CartItemButton>
    </>
  );
};

export default CartItemButton;
