import * as Styled from "./ShoppingCartList.styled";

import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";

import useShoppingCartData from "../../../hooks/shoppingCart/useShoppingCartData";
import useShoppingCartActions from "../../../hooks/shoppingCart/useShoppingCartActions";

interface ShoppingCartListProps {
  handleCloseModal: () => void;
}

function ShoppingCartList({ handleCloseModal }: ShoppingCartListProps) {
  const { cartItems } = useShoppingCartData();

  const {
    handleRemoveProduct,
    handleIncreaseCartItemQuantity,
    handleDecreaseCartItemQuantity,
  } = useShoppingCartActions();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Styled.Container>
      <Styled.UlContainer>
        {cartItems.map((cartItem) => (
          <ShoppingCartItem
            key={cartItem.product.id}
            cartItem={cartItem}
            handleRemoveProduct={handleRemoveProduct}
            handleIncreaseCartItemQuantity={handleIncreaseCartItemQuantity}
            handleDecreaseCartItemQuantity={handleDecreaseCartItemQuantity}
          />
        ))}
      </Styled.UlContainer>
      <Styled.TotalPriceContainer>
        <Styled.TotalPriceTitle>총 결제 금액</Styled.TotalPriceTitle>
        <Styled.TotalPrice>{totalPrice.toLocaleString()}원</Styled.TotalPrice>
      </Styled.TotalPriceContainer>
      <Styled.Button onClick={handleCloseModal}>닫기</Styled.Button>
    </Styled.Container>
  );
}

export default ShoppingCartList;
