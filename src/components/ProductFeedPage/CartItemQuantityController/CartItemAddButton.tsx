import styled from "styled-components";
import { ReactComponent as AddToCartIcon } from "@assets/addToCart.svg";

interface CartItemAddButtonProps {
  addCartItem: () => void;
}

const CartItemAddButton = ({ addCartItem }: CartItemAddButtonProps) => {
  return <S.AddToCartIcon role="button" aria-label="상품 담기" onClick={addCartItem} />;
};

export default CartItemAddButton;

const S = {
  AddToCartIcon: styled(AddToCartIcon)`
    cursor: pointer;
  `,
};
