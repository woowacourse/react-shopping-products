import * as S from "./CartItemAddButton.styles";
import AddCartIcon from "/add-cart.svg";

const CartItemAddButton = () => {
  return (
    <>
      <S.CartItemAddButton>
        <img src={AddCartIcon} alt="장바구니 추가" />
        <S.CartItemAddText>담기</S.CartItemAddText>
      </S.CartItemAddButton>
    </>
  );
};

export default CartItemAddButton;
