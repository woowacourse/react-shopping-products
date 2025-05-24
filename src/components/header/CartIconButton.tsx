import styled from "@emotion/styled";
import { useAPIData } from "../../contexts/DataContext";
import { CartItem } from "../../types/productType";

const CartIconButton = ({ onClick }: { onClick: () => void }) => {
  const cartItems = useAPIData<{ data: { content: CartItem[] } }>("cartItems");
  const cartItemCount = cartItems?.data.content.length ?? 0;

  return (
    <CartIconButtonContainer onClick={onClick}>
      <img src="./cartIcon.png" alt="cart icon" />
      {cartItemCount !== 0 && <CartItemCount> {cartItemCount}</CartItemCount>}
    </CartIconButtonContainer>
  );
};

export default CartIconButton;

const CartIconButtonContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const CartItemCount = styled.div`
  width: 19px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -5px;
  right: -6px;
  background-color: white;
  color: black;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
`;
