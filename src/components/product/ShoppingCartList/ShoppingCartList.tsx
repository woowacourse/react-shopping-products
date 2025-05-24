import * as Styled from "./ShoppingCartList.styled";
import { CartItem } from "../../../types/FetchCartItemsResult";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";

interface ShoppingCartListProps {
  cartItems: CartItem[];
  handleCloseModal: () => void;
  handleRemoveProduct: (productId: number) => void;
  handleIncreaseCartItemQuantity: (productId: number) => void;
  handleDecreaseCartItemQuantity: (productId: number) => void;
}

function ShoppingCartList({
  cartItems,
  handleCloseModal,
  handleRemoveProduct,
  handleIncreaseCartItemQuantity,
  handleDecreaseCartItemQuantity,
}: ShoppingCartListProps) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Styled.Container>
      <Styled.UlContainer>
        {cartItems.map((cartItem) => (
          <ShoppingCartItem
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
