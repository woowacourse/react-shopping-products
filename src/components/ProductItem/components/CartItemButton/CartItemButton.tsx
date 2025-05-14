import * as S from "./CartItemButton.styles";
import AddCart from "/add-cart.svg";
import RemoveCart from "/remove-cart.svg";

const AddCartIcon = () => <img src={AddCart} alt="장바구니에서 상품 추가" />;
const RemoveCartIcon = () => (
  <img src={RemoveCart} alt="장바구니에서 상품 삭제" />
);

interface CartItemButtonProps {
  isAdd: boolean;
  onClick: () => void;
}

const CartItemButton = ({ isAdd, onClick }: CartItemButtonProps) => {
  return (
    <>
      <S.CartItemButton $isAdd={isAdd} onClick={onClick}>
        {isAdd ? <RemoveCartIcon /> : <AddCartIcon />}
        <S.CartItemAddText>{isAdd ? "빼기" : "담기"}</S.CartItemAddText>
      </S.CartItemButton>
    </>
  );
};

export default CartItemButton;
