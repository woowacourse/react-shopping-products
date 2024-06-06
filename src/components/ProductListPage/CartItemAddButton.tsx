import styled from "styled-components";
import { ReactComponent as AddToCartIcon } from "@assets/addToCart.svg";

interface CartItemAddButtonProps {
  addCartItem: () => void;
}

const CartItemAddButton = ({ addCartItem }: CartItemAddButtonProps) => {
  return (
    <S.Container>
      <S.AddToCartIcon role="button" aria-label="상품 담기" onClick={addCartItem} />
    </S.Container>
  );
};

export default CartItemAddButton;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-top: 0.8rem;
    width: 100%;
    right: 0;
  `,

  AddToCartIcon: styled(AddToCartIcon)`
    cursor: pointer;
  `,
};
